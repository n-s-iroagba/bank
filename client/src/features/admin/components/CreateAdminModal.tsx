import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface CreateAdminModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (name: string, password: string) => void;
}

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({ show, onClose, onCreate }) => {
  const [adminName, setAdminName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleCreate = () => {
    onCreate(adminName, adminPassword);
    setAdminName('');
    setAdminPassword('');
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="adminName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="adminPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateAdminModal;
