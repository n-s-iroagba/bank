import React, { useState} from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import useBanks from "../hooks/useBanks";
import * as xlsx  from 'xlsx';
import { API_ENDPOINTS } from "../api/urls";
import { apiPost } from "../api/api";


interface SecondPartyUploadModalProps {
  show: boolean;
  onHide: () => void;
}

const SecondPartyUploadModal: React.FC<SecondPartyUploadModalProps> = ({ show, onHide }) => {
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const { banks } = useBanks();
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [selectedBank, setSelectedBank] = useState<number | null>(null);
  const [bulkData, setBulkData] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSingleSubmit = async () => {
    if (!firstName || !surname || !selectedBank) {
      alert("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      await apiPost(
        `${API_ENDPOINTS.secondParty.create}/${1}`,
        { firstName, surname, bankId: selectedBank },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage("Second party successfully created!");
      clearForm();
    } catch (error) {
      console.error("Error creating second party:", error);
      alert("Failed to create second party.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      const workbook = xlsx.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const parsedData = xlsx.utils.sheet_to_json(worksheet);
      setBulkData(parsedData); // Set parsed data to state
    };
    reader.readAsArrayBuffer(file);
  };

  const handleBulkUpload = async () => {
    if (bulkData.length === 0) {
      alert("Please upload a valid file.");
      return;
    }


    setIsLoading(true);
    try {
      await axios.post(`${API_ENDPOINTS.secondParty.bulkCreate}/${2}`, {data:bulkData}, {
        headers: {
          "Content-Type": "application/json",
        },
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
    setSurname("");
    setSelectedBank(null);
    setMode("single");
    setBulkData([]);
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
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
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
                <Form.Control type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
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
