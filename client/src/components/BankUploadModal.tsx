import React, { useState } from "react";
import { Form, Button, Modal, Tab, Tabs, Alert } from "react-bootstrap";

interface Bank {
  name: string;
  logo: File | null;
}

interface BankUploadModalProps {
  show: boolean;
  onHide: () => void;
}

const BankUploadModal: React.FC<BankUploadModalProps> = ({ show, onHide }) => {
  const [selectedTab, setSelectedTab] = useState<string>("single");
  const [singleBank, setSingleBank] = useState<Bank>({ name: "", logo: null });
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleSingleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "logo" && files) {
      setSingleBank((prev) => ({ ...prev, logo: files[0] }));
    } else {
      setSingleBank((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBulkFile(e.target.files[0]);
    }
  };

  const handleSingleUpload = () => {
    // Add your API call logic here to upload a single bank
    console.log("Uploading single bank:", singleBank);
    setShowSuccess(true);
  };

  const handleBulkUpload = () => {
    // Add your API call logic here to upload bulk banks from the Excel file
    console.log("Uploading bulk banks from file:", bulkFile);
    setShowSuccess(true);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload Banks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccess && (
          <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
            Upload successful!
          </Alert>
        )}
        <Tabs
          activeKey={selectedTab}
          onSelect={(tabKey) => setSelectedTab(tabKey || "single")}
          className="mb-3"
        >
          <Tab eventKey="single" title="Single Upload">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter bank name"
                  value={singleBank.name}
                  onChange={handleSingleBankChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bank Logo</Form.Label>
                <Form.Control
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleSingleBankChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleSingleUpload}
                disabled={!singleBank.name || !singleBank.logo}
              >
                Upload Bank
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="bulk" title="Bulk Upload">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Excel File</Form.Label>
                <Form.Control
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleBulkFileChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                onClick={handleBulkUpload}
                disabled={!bulkFile}
              >
                Upload Bulk
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BankUploadModal;
