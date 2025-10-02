import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { CreditCard, User, DollarSign, Shield, Edit, Plus } from 'lucide-react';
import { AccountHolder, CheckingAccount, CreateCheckingAccountRequest, UpdateCheckingAccountRequest } from '../../../types';
import { useAccountHolders } from '../../../hooks/useAccountHolder';
import { useCreateCheckingAccount, useUpdateCheckingAccount } from '../../../hooks/useCheckingAccount';
import '../../../styles/CheckingAccountForm.css';

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
const handleChange: React.ChangeEventHandler<FormControlElement> = (e) => {
  const { name, value, type } = e.target;
  const val = type === 'checkbox'
    ? (e.target as HTMLInputElement).checked
    : value;

  setFormData(prev => ({
    ...prev,
    [name]: val,
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

  type FormControlElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;


  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.accountHolderId) {
      newErrors.accountHolderId = 'Account holder selection is required';
    }

    if (!formData.balance) {
      newErrors.balance = 'Initial balance is required';
    } else if (parseFloat(formData.balance) < 0) {
      newErrors.balance = 'Balance cannot be negative';
    } else if (parseFloat(formData.balance) > 1000000) {
      newErrors.balance = 'Balance cannot exceed $1,000,000';
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
      console.error('Error saving checking account:', error);
    }
  };

  const isLoading = createAccountMutation.isPending || updateAccountMutation.isPending;
  const isEditMode = !!account;
  const accountHolders = accountHoldersResponse?.data || [];

  return (
    <Modal 
      show={show} 
      onHide={onClose} 
      size="lg" 
      backdrop="static"
      className="checking-account-form-modal checking-account-modal"
    >
      <Modal.Header closeButton className="checking-account-modal-header">
        <Modal.Title className="checking-account-modal-title">
          {isEditMode ? (
            <>
              <Edit size={24} />
              Edit Checking Account
            </>
          ) : (
            <>
              <Plus size={24} />
              Create New Checking Account
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="checking-account-modal-body">
          {/* Error Alert */}
          {(createAccountMutation.isError || updateAccountMutation.isError) && (
            <Alert variant="danger" className="alert-checking-account">
              <div className="alert-heading-checking-account">
                ❌ {isEditMode ? 'Update Failed' : 'Creation Failed'}
              </div>
              {createAccountMutation.error instanceof Error 
                ? createAccountMutation.error.message 
                : updateAccountMutation.error instanceof Error
                ? updateAccountMutation.error.message
                : 'An error occurred while saving the checking account'
              }
            </Alert>
          )}

          {/* Account Holder Field */}
          <Form.Group className="form-group-checking-account">
            <Form.Label className="form-label-checking-account">
              <User size={16} className="me-2" />
              Account Holder
            </Form.Label>
            <Form.Select
              name="accountHolderId"
              value={formData.accountHolderId}
              onChange={handleChange}
              isInvalid={!!errors.accountHolderId}
              disabled={isEditMode}
              className="form-control-checking-account select-checking-account"
            >
              <option value="">Select an account holder</option>
              {accountHolders.map((holder:AccountHolder) => (
                <option key={holder.id} value={holder.id} className="account-holder-option">
                  {holder.firstName} {holder.lastName} ({holder.email})
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid" className="invalid-feedback-checking-account">
              {errors.accountHolderId}
            </Form.Control.Feedback>
            {isEditMode && (
              <div className="disabled-field-info">
                <Shield size={12} />
                Account holder cannot be changed after creation
              </div>
            )}
            {accountHolders.length === 0 && (
              <div className="text-muted mt-1" style={{ fontSize: '0.875rem' }}>
                No account holders available. Please create an account holder first.
              </div>
            )}
          </Form.Group>

          {/* Balance Field */}
          <Form.Group className="form-group-checking-account">
            <Form.Label className="form-label-checking-account">
              <DollarSign size={16} className="me-2" />
              {isEditMode ? 'Current Balance' : 'Initial Balance'}
            </Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0"
              max="1000000"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              isInvalid={!!errors.balance}
              placeholder="0.00"
              disabled={isEditMode}
              className="form-control-checking-account number-input-checking-account"
            />
            <Form.Control.Feedback type="invalid" className="invalid-feedback-checking-account">
              {errors.balance}
            </Form.Control.Feedback>
            {isEditMode ? (
              <div className="disabled-field-info">
                <Shield size={12} />
                Balance cannot be manually changed after creation
              </div>
            ) : (
              <div className="text-muted mt-1" style={{ fontSize: '0.875rem' }}>
                Enter the initial deposit amount (minimum $0.00)
              </div>
            )}
          </Form.Group>

          {/* Active Status Field (Edit Mode Only) */}
          {isEditMode && (
            <Form.Group className="form-group-checking-account">
              <div className="form-check-checking-account">
                <Form.Check
                  type="checkbox"
                  name="isActive"
                  label="Account is active"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="form-check-input-checking-account"
                />
              </div>
              <div className="text-muted mt-1" style={{ fontSize: '0.875rem' }}>
                {formData.isActive 
                  ? '✓ Account is active and can process transactions'
                  : '✗ Account is inactive and cannot process transactions'
                }
              </div>
            </Form.Group>
          )}
        </Modal.Body>

        <Modal.Footer className="checking-account-modal-footer">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="btn-cancel-checking-account"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className="btn-submit-checking-account"
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="loading-spinner-checking-account me-2" />
                {isEditMode ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <CreditCard size={16} className="me-2" />
                {isEditMode ? 'Update Account' : 'Create Account'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CheckingAccountFormModal;