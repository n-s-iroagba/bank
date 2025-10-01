import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { Transaction, CreateTransactionRequest, UpdateTransactionRequest, SecondParty, SecondPartyWithBank, CheckingAccountWithDetails } from '../../../types';
import { useCheckingAccounts } from '../../../hooks/useCheckingAccount';
import { useSecondParties } from '../../../hooks/useSecondParty';
import { useCreateTransaction, useUpdateTransaction } from '../../../hooks/useTransaction';


interface TransactionFormModalProps {
  show: boolean;
  transaction: Transaction | null;
  onClose: () => void;
  onSuccess: () => void;
}

const TransactionFormModal: React.FC<TransactionFormModalProps> = ({
  show,
  transaction,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    type: 'debit' as 'debit' | 'credit',
    amount: '',
    description: '',
    checkingAccountId: '',
    secondPartyId: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createTransactionMutation = useCreateTransaction();
  const updateTransactionMutation = useUpdateTransaction();
  const { data: checkingAccountsResponse } = useCheckingAccounts({ page: 1, limit: 100 });
  const { data: secondPartiesResponse } = useSecondParties({ page: 1, limit: 100 });

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount.toString(),
        description: transaction.description,
        checkingAccountId: transaction.checkingAccountId.toString(),
        secondPartyId: transaction.secondPartyId.toString()
      });
    } else {
      setFormData({
        type: 'debit',
        amount: '',
        description: '',
        checkingAccountId: '',
        secondPartyId: ''
      });
    }
    setErrors({});
  }, [transaction, show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.type) {
      newErrors.type = 'Transaction type is required';
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.checkingAccountId) {
      newErrors.checkingAccountId = 'Checking account is required';
    }

    if (!formData.secondPartyId) {
      newErrors.secondPartyId = 'Second party is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (transaction) {
        const updateData: UpdateTransactionRequest = {
          type: formData.type,
          amount: parseFloat(formData.amount),
          description: formData.description,
          checkingAccountId: parseInt(formData.checkingAccountId),
          secondPartyId: parseInt(formData.secondPartyId)
        };
        await updateTransactionMutation.mutateAsync({ id: transaction.id, data: updateData });
      } else {
        const createData: CreateTransactionRequest = {
          type: formData.type,
          amount: parseFloat(formData.amount),
          description: formData.description,
          checkingAccountId: parseInt(formData.checkingAccountId),
          secondPartyId: parseInt(formData.secondPartyId)
        };
        await createTransactionMutation.mutateAsync(createData);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const isLoading = createTransactionMutation.isPending || updateTransactionMutation.isPending;

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {transaction ? 'Edit Transaction' : 'Create New Transaction'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {(createTransactionMutation.isError || updateTransactionMutation.isError) && (
            <Alert variant="danger">
              {createTransactionMutation.error instanceof Error 
                ? createTransactionMutation.error.message 
                : updateTransactionMutation.error instanceof Error
                ? updateTransactionMutation.error.message
                : 'An error occurred while saving the transaction'
              }
            </Alert>
          )}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Transaction Type *</Form.Label>
                <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  isInvalid={!!errors.type}
                >
                  <option value="debit">Debit (Withdrawal)</option>
                  <option value="credit">Credit (Deposit)</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.type}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Amount *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0.01"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  isInvalid={!!errors.amount}
                  placeholder="Enter amount"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              placeholder="Enter transaction description"
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Checking Account *</Form.Label>
                <Form.Select
                  name="checkingAccountId"
                  value={formData.checkingAccountId}
                  onChange={handleChange}
                  isInvalid={!!errors.checkingAccountId}
                >
                  <option value="">Select a checking account</option>
                  {checkingAccountsResponse?.data?.data?.map((account:CheckingAccountWithDetails) => (
                    <option key={account.id} value={account.id}>
                      {account.accountNumber} - {account.accountHolder?.firstName} {account.accountHolder?.lastName}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.checkingAccountId}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Second Party *</Form.Label>
                <Form.Select
                  name="secondPartyId"
                  value={formData.secondPartyId}
                  onChange={handleChange}
                  isInvalid={!!errors.secondPartyId}
                >
                  <option value="">Select a second party</option>
                  {secondPartiesResponse?.data?.data.map((party:SecondPartyWithBank) => (
                    <option key={party.id} value={party.id}>
                      {party.name} - {party.bank?.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.secondPartyId}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
            )}
            {transaction ? 'Update Transaction' : 'Create Transaction'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TransactionFormModal;