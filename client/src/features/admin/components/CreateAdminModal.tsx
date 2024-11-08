import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateAdmin } from '../../../types/Admin';


interface CreateAdminModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (adminData: CreateAdmin) => void;
}

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({ show, onClose, onSubmit }) => {
  const [admin, setAdmin] = useState<CreateAdmin>({
 
    email: '',
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(admin);
    setAdmin({
     
      email: '',
      username: '',
      password: ''
    });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
    

      

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={admin.username}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFirstname">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              value={admin.email}
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
          Save Admin
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateAdminModal;
