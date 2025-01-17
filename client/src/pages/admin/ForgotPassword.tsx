
import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import image from '../../assets/images/greater-texas-cu-icon.svg'
import '../../styles/AuthForm.css'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
const {handleForgotPassword,handleChange,setForgotPasswordInput,forgotPasswordInput} = useContext(AuthContext)
const navigate = useNavigate()


  return (
    <div className="form-wrapper d-flex flex-column align-items-center">
      <img style={{height:'2cm'}} src={image} alt='icon'/>
    <Form  onSubmit={(e)=>handleForgotPassword(e,navigate)}>
      <Form.Group controlId="email">
        <Form.Label>Enter your email to reset your password</Form.Label>
        <Form.Control
          type="email"
          name='email'
          value={forgotPasswordInput.email}
          className='form-input'
          onChange={(e) => handleChange(e,setForgotPasswordInput)}
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
