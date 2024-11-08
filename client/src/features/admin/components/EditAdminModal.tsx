import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BaseAdmin } from '../../../types/Admin';


interface EditAdminModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (adminData: BaseAdmin) => void;
  adminToEdit: BaseAdmin; // Admin data to populate the form for editing
}

const EditAdminModal: React.FC<EditAdminModalProps> = ({ show, onClose, onSubmit, adminToEdit }) => {
  const [admin, setAdmin] = useState<BaseAdmin>(adminToEdit);

  useEffect(() => {
    setAdmin(adminToEdit); // Reset form if the admin data changes
  }, [adminToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(admin);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
      

          <Form.Group className="mb-3" controlId="formSurname">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={admin.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={admin.username}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={admin.password}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAdminModal;
