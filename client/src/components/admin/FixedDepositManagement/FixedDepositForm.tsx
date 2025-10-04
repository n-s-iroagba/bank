import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { Calendar, Clock, Percent, DollarSign, User, Shield, Plus, Edit, TrendingUp } from 'lucide-react';
import { FixedTermDeposit, CreateFixedDepositRequest, UpdateFixedDepositRequest, AccountHolder } from '../../../types';
import { useAccountHolders } from '../../../hooks/useAccountHolder';
import { useCreateFixedDeposit, useUpdateFixedDeposit } from '../../../hooks/useFixedDeposit';
import '../../../styles/FixedDepositForm.css';
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
  type FormControlElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

  const handleChange = (e: React.ChangeEvent<FormControlElement>) => {
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
    } else if (parseFloat(formData.balance) > 1000000) {
      newErrors.balance = 'Maximum deposit is $1,000,000';
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
    } else if (parseFloat(formData.interestRate) > 25) {
      newErrors.interestRate = 'Interest rate cannot exceed 25%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateMaturityDate = (term: number): Date => {
    const maturityDate = new Date();
    maturityDate.setMonth(maturityDate.getMonth() + term);
    return maturityDate;
  };

  const calculateInterestEarned = () => {
    if (!formData.balance || !formData.term || !formData.interestRate) return 0;
    
    const principal = parseFloat(formData.balance);
    const termMonths = parseInt(formData.term);
    const annualRate = parseFloat(formData.interestRate) / 100;
    
    // Simple interest calculation for the term
    return principal * annualRate * (termMonths / 12);
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
      console.error('Error saving fixed deposit:', error);
    }
  };

  const isLoading = createDepositMutation.isPending || updateDepositMutation.isPending;
  const isEditMode = !!deposit;
  const maturityDate = formData.term ? calculateMaturityDate(parseInt(formData.term)) : null;
  const interestEarned = calculateInterestEarned();
  const totalValue = formData.balance ? parseFloat(formData.balance) + interestEarned : 0;
  const accountHolders = accountHoldersResponse?.data || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Modal 
      show={show} 
      onHide={onClose} 
      size="lg" 
      backdrop="static"
      className="fixed-deposit-form-modal fixed-deposit-modal"
    >
      <Modal.Header closeButton className="fixed-deposit-modal-header">
        <Modal.Title className="fixed-deposit-modal-title">
          {isEditMode ? (
            <>
              <Edit size={24} />
              Edit Fixed Term Deposit
            </>
          ) : (
            <>
              <Plus size={24} />
              Create New Fixed Term Deposit
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="fixed-deposit-modal-body">
          {/* Error Alert */}
          {(createDepositMutation.isError || updateDepositMutation.isError) && (
            <Alert variant="danger" className="alert-fixed-deposit">
              <div className="alert-heading-fixed-deposit">
                ❌ {isEditMode ? 'Update Failed' : 'Creation Failed'}
              </div>
              {createDepositMutation.error instanceof Error 
                ? createDepositMutation.error.message 
                : updateDepositMutation.error instanceof Error
                ? updateDepositMutation.error.message
                : 'An error occurred while saving the fixed deposit'
              }
            </Alert>
          )}

          {/* Account Holder Field */}
          <Form.Group className="form-group-fixed-deposit">
            <Form.Label className="form-label-fixed-deposit">
              <User size={16} className="me-2" />
              Account Holder
            </Form.Label>
            <Form.Select
              name="accountHolderId"
              value={formData.accountHolderId}
              onChange={handleChange}
              isInvalid={!!errors.accountHolderId}
              disabled={isEditMode}
              className="form-control-fixed-deposit select-fixed-deposit"
            >
              <option value="">Select an account holder</option>
              {accountHolders.map((holder:AccountHolder) => (
                <option key={holder.id} value={holder.id} className="account-holder-option-fixed">
                  {holder.firstName} {holder.lastName} ({holder.email})
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid" className="invalid-feedback-fixed-deposit">
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

          <Row>
            <Col md={6}>
              {/* Initial Deposit Field */}
              <Form.Group className="form-group-fixed-deposit">
                <Form.Label className="form-label-fixed-deposit">
                  <DollarSign size={16} className="me-2" />
                  Initial Deposit
                </Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="100"
                  max="1000000"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  isInvalid={!!errors.balance}
                  placeholder="100.00"
                  disabled={isEditMode}
                  className="form-control-fixed-deposit number-input-fixed-deposit"
                />
                <Form.Control.Feedback type="invalid" className="invalid-feedback-fixed-deposit">
                  {errors.balance}
                </Form.Control.Feedback>
                <div className="text-muted mt-1" style={{ fontSize: '0.875rem' }}>
                  Minimum: $100.00 • Maximum: $1,000,000.00
                </div>
                {isEditMode && (
                  <div className="disabled-field-info">
                    <Shield size={12} />
                    Deposit amount cannot be changed after creation
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              {/* Term Field */}
              <Form.Group className="form-group-fixed-deposit">
                <Form.Label className="form-label-fixed-deposit">
                  <Clock size={16} className="me-2" />
                  Term Duration
                </Form.Label>
                <Form.Select
                  name="term"
                  value={formData.term}
                  onChange={handleChange}
                  isInvalid={!!errors.term}
                  disabled={isEditMode}
                  className="form-control-fixed-deposit select-fixed-deposit"
                >
                  <option value="">Select term</option>
                  <option value="3" className="term-option">3 months</option>
                  <option value="6" className="term-option">6 months</option>
                  <option value="12" className="term-option">12 months (1 year)</option>
                  <option value="24" className="term-option">24 months (2 years)</option>
                  <option value="36" className="term-option">36 months (3 years)</option>
                  <option value="60" className="term-option">60 months (5 years)</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid" className="invalid-feedback-fixed-deposit">
                  {errors.term}
                </Form.Control.Feedback>
                {isEditMode && (
                  <div className="disabled-field-info">
                    <Shield size={12} />
                    Term cannot be changed after creation
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              {/* Interest Rate Field */}
              <Form.Group className="form-group-fixed-deposit">
                <Form.Label className="form-label-fixed-deposit">
                  <Percent size={16} className="me-2" />
                  Annual Interest Rate
                </Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="25"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleChange}
                  isInvalid={!!errors.interestRate}
                  placeholder="5.00"
                  className="form-control-fixed-deposit number-input-fixed-deposit"
                />
                <Form.Control.Feedback type="invalid" className="invalid-feedback-fixed-deposit">
                  {errors.interestRate}
                </Form.Control.Feedback>
                <div className="text-muted mt-1" style={{ fontSize: '0.875rem' }}>
                  Enter annual percentage rate (0.01% - 25%)
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              {/* Maturity Date Display */}
              <Form.Group className="form-group-fixed-deposit">
                <Form.Label className="form-label-fixed-deposit">
                  <Calendar size={16} className="me-2" />
                  Estimated Maturity Date
                </Form.Label>
                <div className="maturity-date-display">
                  {maturityDate ? maturityDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Select term to calculate'}
                </div>
                <div className="text-muted mt-1" style={{ fontSize: '0.875rem' }}>
                  Calculated automatically based on selected term
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Interest Calculation Preview */}
          {formData.balance && formData.term && formData.interestRate && (
            <div className="calculation-preview">
              <div className="calculation-title">
                <TrendingUp size={14} className="me-2" />
                Projected Returns
              </div>
              <Row>
                <Col md={4}>
                  <div className="text-center">
                    <div className="calculation-value" style={{ color: '#059669' }}>
                      {formatCurrency(interestEarned)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Interest Earned
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center">
                    <div className="calculation-value">
                      {formatCurrency(totalValue)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Total Value at Maturity
                    </div>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center">
                    <div className="calculation-value" style={{ color: '#dc2626' }}>
                      {formData.interestRate}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Annual Rate
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}

          {/* Active Status Field (Edit Mode Only) */}
          {isEditMode && (
            <Form.Group className="form-group-fixed-deposit">
              <div className="form-check-fixed-deposit">
                <Form.Check
                  type="checkbox"
                  name="isActive"
                  label="Fixed deposit account is active"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="form-check-input-fixed-deposit"
                  
                />
              </div>
              <div className="text-muted mt-1" style={{ fontSize: '0.875rem' }}>
                {formData.isActive 
                  ? '✓ Account is active and earning interest'
                  : '✗ Account is closed and not earning interest'
                }
              </div>
            </Form.Group>
          )}
        </Modal.Body>

        <Modal.Footer className="fixed-deposit-modal-footer">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="btn-cancel-fixed-deposit"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className="btn-submit-fixed-deposit"
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="loading-spinner-fixed-deposit me-2" />
                {isEditMode ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                {isEditMode ? 'Update Deposit' : 'Create Deposit'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FixedDepositFormModal;