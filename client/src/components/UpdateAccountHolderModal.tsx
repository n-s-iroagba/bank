import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateAccountHolder } from "../services/accountHolderService";
import { BaseAccountHolder } from "../types/AccountHolder";

interface AccountHolder {
  id:number
  firstName: string;
  surname: string;
  username: string;
  password: string;
}

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
  const [formData, setFormData] = useState<AccountHolder>(accountHolder);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
         updateAccountHolder(accountHolder.id,accountHolder)
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Account Holder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="surname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateAccountHolderModal;
