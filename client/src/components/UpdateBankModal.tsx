import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { apiPatch } from "../api/api";
import { API_ENDPOINTS } from "../api/urls";

interface UpdateBankModalProps {
  bankName: string;
  existingLogoUrl: string;
  show: boolean;
  handleClose: () => void;
}

const UpdateBankModal: React.FC<UpdateBankModalProps> = ({
  bankName,
  existingLogoUrl,
  show,
  handleClose,
}) => {
  const [name, setName] = useState(bankName);
  const [logo, setLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(existingLogoUrl);
  const [isLogoChanged, setIsLogoChanged] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setLogo(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsLogoChanged(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (isLogoChanged && logo) {
      formData.append("logo", logo);
    }

    try {
      await apiPatch(`${API_ENDPOINTS.bank.update}/${1}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Bank updated successfully!");
      window.location.reload()
      handleClose();
    } catch (error) {
      console.error("Error updating bank:", error);
      alert("Failed to update bank.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Bank</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="bankName">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Logo</Form.Label>
            <div className="mb-3">
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Bank Logo"
                  style={{ width: "150px", height: "150px" }}
                />
              )}
            </div>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateBankModal;
