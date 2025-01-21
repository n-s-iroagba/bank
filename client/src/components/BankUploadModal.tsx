import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // If using React-Bootstrap
import { API_ENDPOINTS } from "../api/urls";

interface Bank {
  name: string;
  logo: File | null;
}

const BankUploadModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
  const [banks, setBanks] = useState<Bank[]>([{ name: "", logo: null }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Function to handle form field changes
  const handleInputChange = (index: number, field: keyof Bank, value: any) => {
    const updatedBanks = [...banks];
    updatedBanks[index][field] = value;
    setBanks(updatedBanks);
  };

  // Add a new empty bank form
  const handleAddBank = () => {
    setBanks([...banks, { name: "", logo: null }]);
  };

  // Remove a bank form at a specific index
  const handleRemoveBank = (index: number) => {
    const updatedBanks = banks.filter((_, i) => i !== index);
    setBanks(updatedBanks);
  };

  // Handle file input change
  const handleFileChange = (index: number, event: any) => {
    const file = event.target.files ? event.target.files[0] : null;
    const updatedBanks = [...banks];
    updatedBanks[index].logo = file;
    setBanks(updatedBanks);
  };

  // Submit the form to the backend
  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const formData = new FormData();
    
    let bankY: string[] = []
    banks.forEach((bank:any) => {
      formData.append('logos', bank.logo)
        bankY.push(bank.name)
      
    });
    
   
    console.log(bankY)
    formData.append('banks',JSON.stringify(bankY))
console.log('form',formData.values)
    try {
      const response = await fetch(`${API_ENDPOINTS.bank.create}/${1}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Banks uploaded successfully!");
        onClose(); // Close the modal on successful upload
      } else {
        setError("Failed to upload banks.");
      }
    } catch (err) {
      setError("Failed to upload banks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Banks</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {banks.map((bank, index) => (
          <div key={index} className="mb-3">
            <Form.Group>
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                value={bank.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                placeholder="Enter bank name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Bank Logo</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(index, e)}
                accept="image/*"
              />
            </Form.Group>
            {index > 0 && (
              <Button variant="danger" onClick={() => handleRemoveBank(index)}>
                Remove Bank
              </Button>
            )}
          </div>
        ))}
        <Button variant="primary" onClick={handleAddBank}>
          Add Bank
        </Button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading || banks.some((bank) => !bank.name || !bank.logo)}
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BankUploadModal;
