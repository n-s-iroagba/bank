import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { FixedTermDeposit, CreateFixedDepositRequest, UpdateFixedDepositRequest } from '../../../types';
import { useAccountHolders } from '../../../hooks/useAccountHolder';
import { useCreateFixedDeposit, useUpdateFixedDeposit } from '../../../hooks/useFixedDeposit';


interface FixedDepositFormModalProps {
  show: boolean;
  deposit: FixedTermDeposit | null;
  onClose: () => void;
  onSuccess: () => void;
}

const FixedDepositFormModal: React.FC<FixedDepositFormModalProps> = ({
  show,
  deposit,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    accountHolderId: '',
    balance: '',
    term: '',
    interestRate: '',
    isActive: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createDepositMutation = useCreateFixedDeposit();
  const updateDepositMutation = useUpdateFixedDeposit();
  const { data: accountHoldersResponse } = useAccountHolders({ page: 1, limit: 100 });

  useEffect(() => {
    if (deposit) {
      setFormData({
        accountHolderId: deposit.accountHolderId.toString(),
        balance: deposit.balance.toString(),
        term: deposit.term.toString(),
        interestRate: deposit.interestRate.toString(),
        isActive: deposit.isActive
      });
    } else {
      setFormData({
        accountHolderId: '',
        balance: '',
        term: '',
        interestRate: '',
        isActive: true
      });
    }
    setErrors({});
  }, [deposit, show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: val
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

    if (!formData.accountHolderId) {
      newErrors.accountHolderId = 'Account holder selection is required';
    }

    if (!formData.balance) {
      newErrors.balance = 'Initial deposit is required';
    } else if (parseFloat(formData.balance) < 0) {
      newErrors.balance = 'Deposit cannot be negative';
    } else if (parseFloat(formData.balance) < 100) {
      newErrors.balance = 'Minimum deposit is $100';
    }

    if (!formData.term) {
      newErrors.term = 'Term is required';
    } else if (parseInt(formData.term) < 1) {
      newErrors.term = 'Term must be at least 1 month';
    }

    if (!formData.interestRate) {
      newErrors.interestRate = 'Interest rate is required';
    } else if (parseFloat(formData.interestRate) <= 0) {
      newErrors.interestRate = 'Interest rate must be positive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateMaturityDate = (term: number): Date => {
    const maturityDate = new Date();
    maturityDate.setMonth(maturityDate.getMonth() + term);
    return maturityDate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (deposit) {
        const updateData: UpdateFixedDepositRequest = {
          accountHolderId: parseInt(formData.accountHolderId),
          balance: parseFloat(formData.balance),
          term: parseInt(formData.term),
          interestRate: parseFloat(formData.interestRate),
          isActive: formData.isActive
        };
        await updateDepositMutation.mutateAsync({ id: deposit.id, data: updateData });
      } else {
        const createData: CreateFixedDepositRequest = {
          accountHolderId: parseInt(formData.accountHolderId),
          balance: parseFloat(formData.balance),
          term: parseInt(formData.term),
          interestRate: parseFloat(formData.interestRate)
        };
        await createDepositMutation.mutateAsync(createData);
      }

      onSuccess();
    } catch (error) {
      // Error handling is done in the mutation
      console.error('Error saving fixed deposit:', error);
    }
  };

  const isLoading = createDepositMutation.isPending
 || updateDepositMutation.isPending
;
  const maturityDate = formData.term ? calculateMaturityDate(parseInt(formData.term)) : null;

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {deposit ? 'Edit Fixed Term Deposit' : 'Create New Fixed Term Deposit'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {(createDepositMutation.isError || updateDepositMutation.isError) && (
            <Alert variant="danger">
              {createDepositMutation.error instanceof Error 
                ? createDepositMutation.error.message 
                : updateDepositMutation.error instanceof Error
                ? updateDepositMutation.error.message
                : 'An error occurred while saving the fixed deposit'
              }
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Account Holder *</Form.Label>
            <Form.Select
              name="accountHolderId"
              value={formData.accountHolderId}
              onChange={handleChange}
              isInvalid={!!errors.accountHolderId}
              disabled={!!deposit} // Can't change account holder after creation
            >
              <option value="">Select an account holder</option>
              {accountHoldersResponse?.data?.data.map((holder) => (
                <option key={holder.id} value={holder.id}>
                  {holder.firstName} {holder.lastName} ({holder.user?.email})
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.accountHolderId}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Initial Deposit *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="100"
                  name="balance"
                  value={formData.balance}
                //   onChange={handleChange}
                  isInvalid={!!errors.balance}
                  placeholder="Enter initial deposit"
                  disabled={!!deposit} // Can't change deposit amount after creation
                />
                <Form.Control.Feedback type="invalid">
                  {errors.balance}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Minimum deposit: $100
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Term (months) *</Form.Label>
                <Form.Select
                  name="term"
                  value={formData.term}
                  onChange={handleChange}
                  isInvalid={!!errors.term}
                  disabled={!!deposit} // Can't change term after creation
                >
                  <option value="">Select term</option>
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="60">60 months</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.term}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Interest Rate (%) *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0.01"
                  name="interestRate"
                  value={formData.interestRate}
                //   onChange={handleChange}
                  isInvalid={!!errors.interestRate}
                  placeholder="Enter interest rate"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.interestRate}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Estimated Maturity Date</Form.Label>
                <Form.Control
                  type="text"
                  value={maturityDate ? maturityDate.toLocaleDateString() : 'N/A'}
                  disabled
                  readOnly
                />
                <Form.Text className="text-muted">
                  Calculated based on term
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          {deposit && (
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isActive"
                label="Account is active"
                checked={formData.isActive}
                onChange={handleChange}
              />
            </Form.Group>
          )}
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
            {deposit ? 'Update Deposit' : 'Create Deposit'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FixedDepositFormModal;