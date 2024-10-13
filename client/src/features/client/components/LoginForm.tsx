// src/components/LoginForm.tsx
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/LoginForm.css'
import '../styles/GeneralStyles.css'
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
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
      <Button onClick={()=>navigate('/dashboard')} className='button-radius bg-red w-100' type="submit">
        Login
      </Button>
      <div className="line-container">
  <hr className="gray-line"/>
</div>

<div className="link-container">
  <a href="/home">Enroll</a>
  <p>|</p>
  <a href="/home">Forgot User Name</a>
  <a href="/home">Forgot Password</a>
</div>

    </Form>
  );
};

export default LoginForm;
