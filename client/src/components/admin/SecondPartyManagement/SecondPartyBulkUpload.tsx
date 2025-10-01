import React, { useState } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Upload, Download } from 'lucide-react';
import { useBulkCreateSecondParties } from '../../../hooks/useSecondParty';


interface SecondPartyBulkUploadModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SecondPartyBulkUploadModal: React.FC<SecondPartyBulkUploadModalProps> = ({
  show,
  onClose,
  onSuccess
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  
  const bulkCreateMutation = useBulkCreateSecondParties();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setErrors(['Please select a file to UploadModal']);
      return;
    }

    try {
      await bulkCreateMutation.mutateAsync(file);
      onSuccess();
    } catch (error) {
      console.error('Error uploading second parties:', error);
    }
  };

  const handleClose = () => {
    setFile(null);
    setErrors([]);
    onClose();
  };

  // Example template data for download
  const templateData = [
    { name: 'Vendor A', details: 'Hardware supplier', bank_id: 1 },
    { name: 'Service Provider B', details: 'IT consulting services', bank_id: 2 },
    { name: 'Retailer C', details: 'Office supplies', bank_id: 1 }
  ];

  const downloadTemplate = () => {
    const csvContent = [
      'name,details,bank_id',
      ...templateData.map(row => `"${row.name}","${row.details}",${row.bank_id}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'second-party-upload-template.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Bulk Upload Second Parties</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Alert variant="info">
            <strong>Instructions:</strong> Upload an Excel file with second party data. The file should have columns for "name", "details", and "bank_id".
          </Alert>

          {bulkCreateMutation.isError && (
            <Alert variant="danger">
              Error uploading second parties: {bulkCreateMutation.error instanceof Error 
                ? bulkCreateMutation.error.message 
                : 'Unknown error'
              }
            </Alert>
          )}

          {errors.length > 0 && (
            <Alert variant="danger">
              <ul className="mb-0">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Excel File</Form.Label>
            <Form.Control
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              required
            />
            <Form.Text className="text-muted">
              Supported formats: .xlsx, .xls, .csv
            </Form.Text>
          </Form.Group>

          <div className="mt-4">
            <Button variant="outline-primary" onClick={downloadTemplate}>
              <Download size={16} className="me-2" />
              Download Template
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={bulkCreateMutation.isPending
}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={!file || bulkCreateMutation.isPending
}>
            {bulkCreateMutation.isPending
 && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
            )}
            <Upload size={16} className="me-2" />
            Upload Second Parties
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SecondPartyBulkUploadModal;