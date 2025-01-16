
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import image from '../../assets/images/greater-texas-cu-icon.svg'
import '../../styles/AuthForm.css'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');


  return (
    <div className="form-wrapper d-flex flex-column align-items-center">
      <img style={{height:'2cm'}} src={image} alt='icon'/>
    <Form>
      <Form.Group controlId="email">
        <Form.Label>Enter your email to reset your password</Form.Label>
        <Form.Control
          type="email"
          value={email}
          className='form-input'
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <br />
      <Button   className="button-radius bg-red w-100" type="submit">Submit</Button>
    </Form>
    </div>
  );
};

export default ForgotPassword;
