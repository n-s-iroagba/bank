import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Upload, Download } from 'lucide-react';
import { useBulkCreateBanks } from '../../../hooks/useBank';

interface BankBulkUploadModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const BankBulkUploadModal: React.FC<BankBulkUploadModalProps> = ({
  show,
  onClose,
  onSuccess
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const bulkCreateMutation = useBulkCreateBanks();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrors(['Please select a file to upload.']);
      return;
    }
    try {
      await bulkCreateMutation.mutateAsync(file);
      onSuccess();
    } catch (error) {
      console.error('Error uploading banks:', error);
    }
  };

  const handleClose = () => {
    setFile(null);
    setErrors([]);
    onClose();
  };

  // Example template data for download
  const templateData = [
    { name: 'Bank of America', logo: 'https://example.com/boa-logo.png' },
    { name: 'Chase Bank', logo: 'https://example.com/chase-logo.png' },
    { name: 'Wells Fargo', logo: 'https://example.com/wells-logo.png' }
  ];

  const downloadTemplate = () => {
    const csvContent = [
      'name,logo',
      ...templateData.map(row => `"${row.name}","${row.logo}"`)
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'bank-upload-template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isLoading = bulkCreateMutation.isPending;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
      <Modal.Header closeButton className="bg-light border-bottom">
        <Modal.Title className="fw-bold text-slate-700">
          Bulk Upload Banks
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Alert variant="info" className="mb-4">
            <strong>Instructions:</strong> Upload an Excel/CSV file with bank
            data. The file should include <code>name</code> and <code>logo</code>{' '}
            columns.
          </Alert>

          {bulkCreateMutation.isError && (
            <Alert variant="danger" className="mb-3">
              Error uploading banks:{' '}
              {bulkCreateMutation.error instanceof Error
                ? bulkCreateMutation.error.message
                : 'Unknown error'}
            </Alert>
          )}

          {errors.length > 0 && (
            <Alert variant="danger" className="mb-3">
              <ul className="mb-0">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-slate-700">
              Excel/CSV File
            </Form.Label>
            <Form.Control
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              required
              isInvalid={errors.length > 0}
            />
            <Form.Control.Feedback type="invalid">
              Please select a valid file.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Supported formats: .xlsx, .xls, .csv
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <Button
              variant="outline-secondary"
              onClick={downloadTemplate}
              className="d-flex align-items-center"
            >
              <Download size={16} className="me-2" />
              Download Template
            </Button>
          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            type="submit"
            disabled={!file || isLoading}
            className="d-flex align-items-center"
          >
            {isLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                className="me-2"
              />
            )}
            <Upload size={16} className="me-2" />
            Upload Banks
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BankBulkUploadModal;
