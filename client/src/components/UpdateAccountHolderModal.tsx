import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { updateAccountHolder } from "../services/accountHolderService";
import { BaseAccountHolder } from "../types/AccountHolder";

interface UpdateAccountHolderModalProps {
  show: boolean;
  accountHolder: BaseAccountHolder;
  onClose: () => void;
}

const UpdateAccountHolderModal: React.FC<UpdateAccountHolderModalProps> = ({
  show,
  accountHolder,
  onClose,
}) => {
  const [formData, setFormData] = useState<BaseAccountHolder>(accountHolder);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateAccountHolder(accountHolder.id, formData);
      onClose();
      window.location.reload();
    } catch (err: any) {
      setError(err.message || "Failed to update account holder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Update Account Holder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              type="text"
              name="middlename"
              value={formData.middlename || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateAccountHolderModal;