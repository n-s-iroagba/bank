import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

interface Client {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

interface EditClientFormProps {
  client: Client;
  onSubmit: (clientId: number, updatedData: { firstName: string, lastName: string, username: string }) => void;
  onCancel: () => void;
}

const EditClientForm: React.FC<EditClientFormProps> = ({ client, onSubmit, onCancel }) => {
  const [firstName, setFirstName] = useState(client.firstName);
  const [lastName, setLastName] = useState(client.lastName);
  const [username, setUsername] = useState(client.username);
  const [password, setPassword] = useState(client.password);

  // Update form state if the client prop changes
  useEffect(() => {
    setFirstName(client.firstName);
    setLastName(client.lastName);
    setUsername(client.username);
  }, [client]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(client.id, { firstName, lastName, username });
  };

  return (
    <Modal>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client Details (ID: {client.id})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="clientFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
          required
        />
      </Form.Group>

      <Form.Group controlId="clientLastName" className="mt-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
          required
        />
      </Form.Group>

      <Form.Group controlId="clientUsername" className="mt-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />
      </Form.Group>
      <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
      <div className="d-flex justify-content-end mt-4">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </div>
    </Form>
  </Modal.Body>
  </Modal>
  );
};

export default EditClientForm;
