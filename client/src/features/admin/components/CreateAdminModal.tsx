import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { CreateAdmin } from '../../../types/Admin';
import { createAdmin } from '../../../services/adminService';


interface CreateAdminModalProps {
  show: boolean;
  onClose: () => void;
  id:number

}

const CreateAdminModal: React.FC<CreateAdminModalProps> = ({ show, onClose,id }) => {
  const [admin, setAdmin] = useState<CreateAdmin>({
    email: '',
   username: '',
    password: ''
  });
 const [errorMessage,setErrorMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try{
      await createAdmin(id,admin)
      alert('Admin created successfully.')
      onClose();
    }catch(e){
      console.error(e);
      setErrorMessage('Error creating admin, contact developer.')
    }
    
 
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
              name="email"
              value={admin.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
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
      {errorMessage&&<Alert variant='danger' className='text-center'>{errorMessage}</Alert>}
    </Modal>
  );
};

export default CreateAdminModal;
