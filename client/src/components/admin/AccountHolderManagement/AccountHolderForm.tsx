import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { User, Mail, Lock, MapPin, Phone, Shield, UserCircle, Calendar } from 'lucide-react';
import { AccountHolder, CreateAccountHolderRequest, UpdateAccountHolderRequest } from '../../../types';
import { useCreateAccountHolder, useUpdateAccountHolder } from '../../../hooks/useAccountHolder';
import '../../../styles/AccountHolderForm.css';

interface AccountHolderFormModalProps {
  show: boolean;
  accountHolder: AccountHolder | null;
  onClose: () => void;
  onSuccess: () => void;
}

const AccountHolderFormModal: React.FC<AccountHolderFormModalProps> = ({
  show,
  accountHolder,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState<CreateAccountHolderRequest | UpdateAccountHolderRequest>({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    address: '',
    phoneNumber: '',
    email: '',
    ssn: '',
    dateOfBirth: new Date().toISOString().split('T')[0], // default today
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createAccountHolderMutation = useCreateAccountHolder();
  const updateAccountHolderMutation = useUpdateAccountHolder(accountHolder?.id || 0);

  useEffect(() => {
    if (accountHolder) {
      setFormData({
        firstName: accountHolder.firstName,
        lastName: accountHolder.lastName,
        username: accountHolder.username,
        password: '',
        address: accountHolder.address,
        phoneNumber: accountHolder.phoneNumber,
        ssn: accountHolder.ssn,
        email: accountHolder.email,
        dateOfBirth: accountHolder.dateOfBirth
          ? new Date(accountHolder.dateOfBirth).toISOString().split('T')[0]
          : '',
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        address: '',
        phoneNumber: '',
        ssn: '',
        email: '',
        dateOfBirth: '',
      });
    }
    setErrors({});
  }, [accountHolder, show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

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

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';

    if (!accountHolder && !formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.ssn.trim()) {
      newErrors.ssn = 'SSN is required';
    } else if (!/^\d{9}$/.test(formData.ssn.replace(/-/g, ''))) {
      newErrors.ssn = 'SSN must be 9 digits';
    }
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email must be valid';

    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (accountHolder) {
        const updateData: UpdateAccountHolderRequest = { ...formData };
        await updateAccountHolderMutation.mutateAsync({ id: accountHolder.id, data: updateData });
      } else {
        const createData: CreateAccountHolderRequest = { ...formData };
        await createAccountHolderMutation.mutateAsync(createData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving account holder:', error);
    }
  };

  const isLoading = createAccountHolderMutation.isPending || updateAccountHolderMutation.isPending;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered className="account-holder-modal">
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="modal-title-custom">
          <div className="d-flex align-items-center">
            <div className="modal-icon-wrapper">
              <UserCircle size={28} />
            </div>
            <div>
              <h4 className="mb-0">
                {accountHolder ? 'Edit Account Holder' : 'Create New Account Holder'}
              </h4>
              <small className="modal-subtitle">
                {accountHolder
                  ? 'Update account holder information'
                  : 'Fill in the details below to create a new account'}
              </small>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="modal-body-custom">
         {(createAccountHolderMutation.isError || updateAccountHolderMutation.isError) && (
            <Alert variant="danger" className="custom-alert-danger">
              <div className="d-flex align-items-center">
                <Shield size={20} className="me-2" />
                <div>
                  {createAccountHolderMutation.error instanceof Error
                    ? createAccountHolderMutation.error.message
                    : updateAccountHolderMutation.error instanceof Error
                    ? updateAccountHolderMutation.error.message
                    : 'An error occurred while saving the account holder'}
                </div>
              </div>
            </Alert>
          )}

          {/* Personal Information Section */}
          <div className="form-section">
            <div className="section-header">
              <User size={20} className="section-icon" />
              <h5 className="section-title">Personal Information</h5>
            </div>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4 custom-form-group">
                  <Form.Label className="custom-label">
                    First Name <span className="required-asterisk">*</span>
                  </Form.Label>
                  <div className="input-icon-wrapper">
                    <User size={18} className="input-icon" />
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      isInvalid={!!errors.firstName}
                      placeholder="Enter first name"
                      className="custom-input"
                    />
                    <Form.Control.Feedback type="invalid" className="custom-feedback">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 custom-form-group">
                  <Form.Label className="custom-label">
                    Last Name <span className="required-asterisk">*</span>
                  </Form.Label>
                  <div className="input-icon-wrapper">
                    <User size={18} className="input-icon" />
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      isInvalid={!!errors.lastName}
                      placeholder="Enter last name"
                      className="custom-input"
                    />
                    <Form.Control.Feedback type="invalid" className="custom-feedback">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Account Credentials Section */}
          <div className="form-section">
            <div className="section-header">
              <Lock size={20} className="section-icon" />
              <h5 className="section-title">Account Credentials</h5>
            </div>
            <Form.Group className="mb-4 custom-form-group">
              <Form.Label className="custom-label">
                Username <span className="required-asterisk">*</span>
              </Form.Label>
              <div className="input-icon-wrapper">
                <Mail size={18} className="input-icon" />
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                  placeholder="Enter username"
                  disabled={!!accountHolder}
                  className="custom-input"
                />
                <Form.Control.Feedback type="invalid" className="custom-feedback">
                  {errors.username}
                </Form.Control.Feedback>
              </div>
          
            </Form.Group>

                <Form.Group className="mb-4 custom-form-group">
              <Form.Label className="custom-label">
                Account Holder Email <span className="required-asterisk">*</span>
              </Form.Label>
              <div className="input-icon-wrapper">
                <Mail size={18} className="input-icon" />
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                  placeholder="Enter email address"
                  disabled={!!accountHolder}
                  className="custom-input"
                />
                <Form.Control.Feedback type="invalid" className="custom-feedback">
                  {errors.username}
                </Form.Control.Feedback>
              </div>
          
            </Form.Group>

            {!accountHolder && (
              <Form.Group className="mb-4 custom-form-group">
                <Form.Label className="custom-label">
                  Password <span className="required-asterisk">*</span>
                </Form.Label>
                <div className="input-icon-wrapper">
                  <Lock size={18} className="input-icon" />
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    placeholder="Enter password (min. 6 characters)"
                    className="custom-input"
                  />
                  <Form.Control.Feedback type="invalid" className="custom-feedback">
                    {errors.password}
                  </Form.Control.Feedback>
                </div>
              </Form.Group>
            )}
          </div>

          {/* Contact Information Section */}
          <div className="form-section">
            <div className="section-header">
              <Phone size={20} className="section-icon" />
              <h5 className="section-title">Contact Information</h5>
            </div>
            <Form.Group className="mb-4 custom-form-group">
              <Form.Label className="custom-label">
                Address <span className="required-asterisk">*</span>
              </Form.Label>
              <div className="input-icon-wrapper">
                <MapPin size={18} className="input-icon textarea-icon" />
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                  placeholder="Enter full address"
                  className="custom-input custom-textarea"
                />
                <Form.Control.Feedback type="invalid" className="custom-feedback">
                  {errors.address}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-4 custom-form-group">
                  <Form.Label className="custom-label">
                    Phone Number <span className="required-asterisk">*</span>
                  </Form.Label>
                  <div className="input-icon-wrapper">
                    <Phone size={18} className="input-icon" />
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      isInvalid={!!errors.phoneNumber}
                      placeholder="Enter phone number"
                      className="custom-input"
                    />
                    <Form.Control.Feedback type="invalid" className="custom-feedback">
                      {errors.phoneNumber}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4 custom-form-group">
                  <Form.Label className="custom-label">
                    SSN <span className="required-asterisk">*</span>
                  </Form.Label>
                  <div className="input-icon-wrapper">
                    <Shield size={18} className="input-icon" />
                    <Form.Control
                      type="text"
                      name="ssn"
                      value={formData.ssn}
                      onChange={handleChange}
                      isInvalid={!!errors.ssn}
                      placeholder="Enter SSN (9 digits)"
                      maxLength={9}
                      className="custom-input"
                    />
                    <Form.Control.Feedback type="invalid" className="custom-feedback">
                      {errors.ssn}
                    </Form.Control.Feedback>
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Date of Birth Field */}
          <div className="form-section">
            <div className="section-header">
              <Calendar size={20} className="section-icon" />
              <h5 className="section-title">Date of Birth</h5>
            </div>
            <Form.Group className="mb-4 custom-form-group">
              <Form.Label className="custom-label">
                Date of Birth <span className="required-asterisk">*</span>
              </Form.Label>
              <div className="input-icon-wrapper">
                <Calendar size={18} className="input-icon" />
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  isInvalid={!!errors.dateOfBirth}
                  className="custom-input"
                />
                <Form.Control.Feedback type="invalid" className="custom-feedback">
                  {errors.dateOfBirth}
                </Form.Control.Feedback>
              </div>
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer className="modal-footer-custom">
          <Button variant="secondary" onClick={onClose} disabled={isLoading} className="btn-cancel-custom">
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading} className="btn-submit-custom">
            {isLoading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />}
            {accountHolder ? 'Update Account Holder' : 'Create Account Holder'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AccountHolderFormModal;
