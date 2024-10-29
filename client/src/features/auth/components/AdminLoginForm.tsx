// src/components/LoginForm.tsx
import React from 'react';
import { Form, Button } from 'react-bootstrap';


const AdminLoginForm: React.FC = () => {
  return (
    <Form className='bg-light form py-3
    '>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control className='form-input' type="email" placeholder="Enter email" />
      </Form.Group>
      <br/>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control className='form-input' type="password" placeholder="Password" />
      </Form.Group>
      <br/>
      <Button className='button-radius bg-red w-100' type="submit">
        Login
      </Button>
      <div className="line-container">
  <hr className="gray-line"/>
</div>



    </Form>
  );
};

export default AdminLoginForm;
