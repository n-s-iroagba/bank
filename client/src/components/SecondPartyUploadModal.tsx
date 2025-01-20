import React, { useState} from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import useBanks from "../hooks/useBanks";

interface SecondPartyUploadModalProps {
  show: boolean;
  onHide: () => void;
}

const SecondPartyUploadModal: React.FC<SecondPartyUploadModalProps> = ({ show, onHide }) => {
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const {banks} = useBanks();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedBank, setSelectedBank] = useState<number | null>(null);
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");


  const handleSingleSubmit = async () => {
    if (!firstName || !lastName || !selectedBank) {
      alert("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("/api/second-parties", { firstName, lastName, bankId: selectedBank });
      setSuccessMessage("Second party successfully created!");
      clearForm();
    } catch (error) {
      console.error("Error creating second party:", error);
      alert("Failed to create second party.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkUpload = async () => {
    if (!bulkFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", bulkFile);

    setIsLoading(true);
    try {
      await axios.post("/api/second-parties/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage("Bulk upload successfully completed!");
      clearForm();
    } catch (error) {
      console.error("Error uploading bulk second parties:", error);
      alert("Bulk upload failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setSelectedBank(null);
    setBulkFile(null);
    setMode("single");
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create or Upload Second Party</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Select Mode</Form.Label>
            <Form.Select value={mode} onChange={(e) => setMode(e.target.value as "single" | "bulk")}>
              <option value="single">Single</option>
              <option value="bulk">Bulk</option>
            </Form.Select>
          </Form.Group>
          {mode === "single" ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bank</Form.Label>
                <Form.Select
                  value={selectedBank || ""}
                  onChange={(e) => setSelectedBank(parseInt(e.target.value))}
                >
                  <option value="">Select a bank</option>
                  {banks.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button variant="primary" onClick={handleSingleSubmit} disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
              </Button>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Excel File</Form.Label>
                <Form.Control
  type="file"
  accept=".xlsx,.xls"
  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBulkFile(e.target.files?.[0] || null)}
/>

              </Form.Group>
              <Button variant="primary" onClick={handleBulkUpload} disabled={isLoading}>
                {isLoading ? <Spinner animation="border" size="sm" /> : "Upload"}
              </Button>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SecondPartyUploadModal;
