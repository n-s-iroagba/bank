import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { CheckingAccount, CreateCheckingAccountRequest, UpdateCheckingAccountRequest } from '../../../types';
import { useAccountHolders } from '../../../hooks/useAccountHolder';
import { useCreateCheckingAccount, useUpdateCheckingAccount } from '../../../hooks/useCheckingAccount';


interface CheckingAccountFormModalProps {
  show: boolean;
  account: CheckingAccount | null;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckingAccountFormModal: React.FC<CheckingAccountFormModalProps> = ({
  show,
  account,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    accountHolderId: '',
    balance: '',
    isActive: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createAccountMutation = useCreateCheckingAccount();
  const updateAccountMutation = useUpdateCheckingAccount();
  const { data: accountHoldersResponse } = useAccountHolders({ page: 1, limit: 100 });

  useEffect(() => {
    if (account) {
      setFormData({
        accountHolderId: account.accountHolderId.toString(),
        balance: account.balance.toString(),
        isActive: account.isActive
      });
    } else {
      setFormData({
        accountHolderId: '',
        balance: '',
        isActive: true
      });
    }
    setErrors({});
  }, [account, show]);

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
      newErrors.balance = 'Initial balance is required';
    } else if (parseFloat(formData.balance) < 0) {
      newErrors.balance = 'Balance cannot be negative';
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
      if (account) {
        const updateData: UpdateCheckingAccountRequest = {
          accountHolderId: parseInt(formData.accountHolderId),
          balance: parseFloat(formData.balance),
          isActive: formData.isActive
        };
        await updateAccountMutation.mutateAsync({ id: account.id, data: updateData });
      } else {
        const createData: CreateCheckingAccountRequest = {
          accountHolderId: parseInt(formData.accountHolderId),
          balance: parseFloat(formData.balance)
        };
        await createAccountMutation.mutateAsync(createData);
      }

      onSuccess();
    } catch (error) {
      // Error handling is done in the mutation
      console.error('Error saving checking account:', error);
    }
  };

  const isLoading = createAccountMutation.isPending
 || updateAccountMutation.isPending
;

  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {account ? 'Edit Checking Account' : 'Create New Checking Account'}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {(createAccountMutation.isError || updateAccountMutation.isError) && (
            <Alert variant="danger">
              {createAccountMutation.error instanceof Error 
                ? createAccountMutation.error.message 
                : updateAccountMutation.error instanceof Error
                ? updateAccountMutation.error.message
                : 'An error occurred while saving the checking account'
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
              disabled={!!account} // Can't change account holder after creation
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

          <Form.Group className="mb-3">
            <Form.Label>Initial Balance *</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              name="balance"
              value={formData.balance}
            //   onChange={handleChange}
              isInvalid={!!errors.balance}
              placeholder="Enter initial balance"
              disabled={!!account} // Can't change balance after creation
            />
            <Form.Control.Feedback type="invalid">
              {errors.balance}
            </Form.Control.Feedback>
          </Form.Group>

          {account && (
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
            {account ? 'Update Account' : 'Create Account'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CheckingAccountFormModal;