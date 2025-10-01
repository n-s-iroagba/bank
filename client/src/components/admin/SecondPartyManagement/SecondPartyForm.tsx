import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Users, Building, FileText, UserCheck } from 'lucide-react';
import { SecondParty, CreateSecondPartyRequest, UpdateSecondPartyRequest, Bank } from '../../../types';
import { useBanks } from '../../../hooks/useBank';
import { useCreateSecondParty, useUpdateSecondParty } from '../../../hooks/useSecondParty';
import '../../../styles/SecondPartyForm.css';

interface SecondPartyFormModalProps {
  show: boolean;
  secondParty: SecondParty | null;
  onClose: () => void;
  onSuccess: () => void;
}

const SecondPartyFormModal: React.FC<SecondPartyFormModalProps> = ({
  show,
  secondParty,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    details: '',
    bankId: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createSecondPartyMutation = useCreateSecondParty();
  const updateSecondPartyMutation = useUpdateSecondParty();
  const { data: banksResponse } = useBanks();
  const banks = banksResponse?.data || [];

  useEffect(() => {
    if (secondParty) {
      setFormData({
        name: secondParty.name,
        details: secondParty.details,
        bankId: secondParty.bankId.toString()
      });
    } else {
      setFormData({
        name: '',
        details: '',
        bankId: ''
      });
    }
    setErrors({});
  }, [secondParty, show]);

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

    if (!formData.name.trim()) {
      newErrors.name = 'Second party name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.details.trim()) {
      newErrors.details = 'Details are required';
    } else if (formData.details.trim().length < 10) {
      newErrors.details = 'Details must be at least 10 characters long';
    }

    if (!formData.bankId) {
      newErrors.bankId = 'Bank selection is required';
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
      if (secondParty) {
        const updateData: UpdateSecondPartyRequest = {
          name: formData.name,
          details: formData.details,
          bankId: parseInt(formData.bankId)
        };
        await updateSecondPartyMutation.mutateAsync({ id: secondParty.id, data: updateData });
      } else {
        const createData: CreateSecondPartyRequest = {
          name: formData.name,
          details: formData.details,
          bankId: parseInt(formData.bankId)
        };
        await createSecondPartyMutation.mutateAsync(createData);
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving second party:', error);
    }
  };

  const isLoading = createSecondPartyMutation.isPending || updateSecondPartyMutation.isPending;

  return (
    <Modal 
      show={show} 
      onHide={onClose} 
      size="lg" 
      backdrop="static"
      className="second-party-form-modal second-party-modal"
    >
      <Modal.Header closeButton className="second-party-modal-header  text-light">
        <Modal.Title className="second-party-modal-title">
          {secondParty ? (
            <>
              <UserCheck size={24} />
              Edit Second Party
            </>
          ) : (
            <>
              <Users size={24} />
              Create New Second Party
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="second-party-modal-body">
          {/* Error Alert */}
          {(createSecondPartyMutation.isError || updateSecondPartyMutation.isError) && (
            <Alert variant="danger" className="alert-second-party">
              <div className="alert-heading-second-party">
                ❌ {secondParty ? 'Update Failed' : 'Creation Failed'}
              </div>
              {createSecondPartyMutation.error instanceof Error 
                ? createSecondPartyMutation.error.message 
                : updateSecondPartyMutation.error instanceof Error
                ? updateSecondPartyMutation.error.message
                : 'An error occurred while saving the second party'
              }
            </Alert>
          )}

          {/* Second Party Name Field */}
          <Form.Group className="form-group-second-party">
            <Form.Label className="form-label-second-party">
              Second Party Name
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              placeholder="Enter second party name (e.g., John Doe Enterprises)"
              className="form-control-second-party"
            />
            <Form.Control.Feedback type="invalid" className="invalid-feedback-second-party">
              {errors.name}
            </Form.Control.Feedback>
            <div className="char-count">
              {formData.name.length}/50 characters
            </div>
          </Form.Group>

          {/* Details Field */}
          <Form.Group className="form-group-second-party">
            <Form.Label className="form-label-second-party">
              <FileText size={16} className="me-2" />
              Details
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="details"
              value={formData.details}
              onChange={handleChange}
              isInvalid={!!errors.details}
              placeholder="Enter detailed information about the second party (address, contact info, etc.)"
              className="form-control-second-party textarea-second-party"
            />
            <Form.Control.Feedback type="invalid" className="invalid-feedback-second-party">
              {errors.details}
            </Form.Control.Feedback>
            <div className={`char-count ${formData.details.length > 200 ? 'warning' : ''}`}>
              {formData.details.length}/500 characters
            </div>
          </Form.Group>

          {/* Bank Selection Field */}
          <Form.Group className="form-group-second-party">
            <Form.Label className="form-label-second-party">
              <Building size={16} className="me-2" />
              Associated Bank
            </Form.Label>
            <Form.Select
              name="bankId"
              value={formData.bankId}
              onChange={handleChange}
              isInvalid={!!errors.bankId}
              className="form-control-second-party select-second-party"
            >
              <option value="">Select a bank</option>
              {banks.map((bank: Bank) => (
                <option key={bank.id} value={bank.id} className="bank-option">
                  {bank.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid" className="invalid-feedback-second-party">
              {errors.bankId}
            </Form.Control.Feedback>
            {banks.length === 0 && (
              <div className="text-muted mt-1" style={{ fontSize: '0.875rem' }}>
                No banks available. Please create a bank first.
              </div>
            )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="second-party-modal-footer">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="btn-cancel-second-party"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className="btn-submit-second-party"
          >
            {isLoading ? (
              <>
                <Spinner animation="border" size="sm" className="loading-spinner-second-party me-2" />
                {secondParty ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                {secondParty ? 'Update Second Party' : 'Create Second Party'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SecondPartyFormModal;