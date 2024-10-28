import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface CreateAdminModalProps {
  show: boolean;
  onClose: () => void;
  onCreate: (name: string, password: string) => void;
}

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({ show, onClose, onCreate }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreate = () => {
    onCreate(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="adminName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
