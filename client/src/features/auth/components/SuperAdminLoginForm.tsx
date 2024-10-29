// src/components/LoginForm.tsx
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../../client/styles/LoginForm.css'
import'../../client/styles/GeneralStyles.css'

const SuperAdminLoginForm: React.FC = () => {
  return (
    <Form className='bg-light form py-3
    '>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
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

<div className="link-container">
  <a href="/home">Forgot Password</a>
</div>

    </Form>
  );
};

export default SuperAdminLoginForm;
