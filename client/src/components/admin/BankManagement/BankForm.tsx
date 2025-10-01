import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import { Bank, CreateBankRequest, UpdateBankRequest } from '../../../types';
import { useCreateBank, useUpdateBank } from '../../../hooks/useBank';
import { uploadFile } from '../../../utils/uploadFile';
import { Upload, Building, Image } from 'lucide-react';
import '../../../styles/BankForm.css';

interface BankFormModalProps {
  show: boolean;
  bank: Bank | null;
  onClose: () => void;
  onSuccess: () => void;
}

const BankFormModal: React.FC<BankFormModalProps> = ({
  show,
  bank,
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    logo: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const createBankMutation = useCreateBank();
  const updateBankMutation = useUpdateBank();

  useEffect(() => {
    if (bank) {
      setFormData({ name: bank.name, logo: bank.logo });
    } else {
      setFormData({ name: '', logo: '' });
    }
    setErrors({});
  }, [bank, show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length === 0) return;
    
    await handleFileUpload(files[0]);
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const url = await uploadFile(file);
      setFormData(prev => ({ ...prev, logo: url }));
      if (errors.logo) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.logo;
          return newErrors;
        });
      }
    } catch (err) {
      console.error('Cloudinary upload failed:', err);
      setErrors(prev => ({ ...prev, logo: 'Failed to upload logo' }));
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    await handleFileUpload(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Bank name is required';
    if (!formData.logo.trim()) newErrors.logo = 'Logo is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (bank) {
        const updateData: UpdateBankRequest = { ...formData };
        await updateBankMutation.mutateAsync({ id: bank.id, data: updateData });
      } else {
        const createData: CreateBankRequest = { ...formData };
        await createBankMutation.mutateAsync(createData);
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving bank:', error);
    }
  };

  const isLoading =
    createBankMutation.isPending ||
    updateBankMutation.isPending ||
    uploading;

  return (
    <Modal 
      show={show} 
      onHide={onClose} 
      centered 
      size="lg" 
      backdrop="static"
      className="bank-form-modal modal-overlay-custom"
    >
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title className="modal-title-custom">
          <Building size={20} className="me-2" />
          {bank ? 'Edit Bank' : 'Create New Bank'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className="modal-body-custom">
          {(createBankMutation.isError || updateBankMutation.isError) && (
            <Alert variant="danger" className="alert-custom">
              <div className="alert-heading-custom">
                ❌ Action Failed
              </div>
              {createBankMutation.error instanceof Error 
                ? createBankMutation.error.message 
                : updateBankMutation.error instanceof Error
                ? updateBankMutation.error.message
                : 'An error occurred while saving the bank'}
            </Alert>
          )}

          {/* Bank Name Field */}
          <Form.Group className="form-group-custom">
            <Form.Label className="form-label-custom">
              Bank Name
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              placeholder="Enter bank name (e.g., Commercial Bank of Ceylon)"
              className="form-control-custom"
            />
            <Form.Control.Feedback type="invalid" className="invalid-feedback-custom">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Logo Upload Field */}
          <Form.Group className="form-group-custom">
            <Form.Label className="form-label-custom">
              Bank Logo
            </Form.Label>
            
            {/* File Upload Area */}
            <div 
              className={`file-upload-area ${isDragging ? 'dragover' : ''} ${formData.logo ? 'has-logo' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input-custom"
              />
              <div className="upload-placeholder">
                <Upload size={24} className="mb-2" />
                <div>
                  <strong>Click to upload</strong> or drag and drop
                </div>
                <small className="text-muted">PNG, JPG, SVG up to 5MB</small>
              </div>
            </div>

            <Form.Control.Feedback type="invalid" className="invalid-feedback-custom">
              {errors.logo}
            </Form.Control.Feedback>

            {/* Uploading State */}
            {uploading && (
              <div className="upload-loading">
                <Spinner animation="border" size="sm" className="loading-spinner me-2" />
                Uploading logo...
              </div>
            )}

            {/* Logo Preview */}
            {formData.logo && !uploading && (
              <Card className="logo-preview-card">
                <Card.Img
                  variant="top"
                  src={formData.logo}
                  alt="Logo preview"
                  className="logo-preview-img"
                />
                <Card.Body className="p-0">
                  <div className="logo-preview-text">
                    <Image size={12} className="me-1" />
                    Preview
                  </div>
                </Card.Body>
              </Card>
            )}
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className="modal-footer-custom">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={isLoading}
            className="btn-cancel-custom"
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit" 
            disabled={isLoading}
            className="btn-submit-custom"
          >
            {isLoading ? (
              <>
                <Spinner as="span" animation="border" size="sm" />
                {bank ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                {bank ? 'Update Bank' : 'Create Bank'}
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BankFormModal;