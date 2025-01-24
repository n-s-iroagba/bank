import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // If using React-Bootstrap
import { API_ENDPOINTS } from "../api/urls";

interface Bank {
  name: string;
  logo: File | null;
}

const BankUploadModal: React.FC<{ show: boolean; onClose: () => void,
  listerId:number }> = ({
  show,
  onClose,
  listerId
}) => {
  const [banks, setBanks] = useState<Bank[]>([{ name: "", logo: null }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleInputChange = (index: number, field: keyof Bank, value: any) => {
    const updatedBanks = [...banks];
    updatedBanks[index][field] = value;
    setBanks(updatedBanks);
  };

  const handleAddBank = () => {
    setBanks([...banks, { name: "", logo: null }]);
  };

  const handleRemoveBank = (index: number) => {
    const updatedBanks = banks.filter((_, i) => i !== index);
    setBanks(updatedBanks);
  };

  const handleFileChange = (index: number, event: any) => {
    const file = event.target.files ? event.target.files[0] : null;
    const updatedBanks = [...banks];
    updatedBanks[index].logo = file;
    setBanks(updatedBanks);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const formData = new FormData();

    let tempBanks: string[] = [];
    banks.forEach((bank: any) => {
      formData.append("logos", bank.logo);
      tempBanks.push(bank.name);
    });

    formData.append("banks", JSON.stringify(tempBanks));

    try {
      const response = await fetch(`${API_ENDPOINTS.bank.create}/${listerId}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Banks uploaded successfully!");
        window.location.reload();
        onClose();
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
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                placeholder="Enter bank name"
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Bank Logo</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => handleFileChange(index, e)}
                accept="image/*"
              />
            </Form.Group>
            <div className="d-flex gap-3 mt-3">
              <Button variant="primary" onClick={handleAddBank}>
                New Entry
              </Button>
              {index > 0 && (
                <Button
                  variant="danger"
                  onClick={() => handleRemoveBank(index)}
                >
                  <small>Remove Entry</small>
                </Button>
              )}
            </div>
          </div>
        ))}

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
