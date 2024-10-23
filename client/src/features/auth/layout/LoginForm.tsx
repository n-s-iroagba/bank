import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputGroup, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../../../common/components/ErrorMessage';

import { LoginOption } from '../components/AuthOption';
import '../../../common/styles/styles.css'
import { AuthContext } from '../context/AuthContext';
const LoginForm: React.FC = () => {
  const { 
    submitting,
    handleSubmitForLogin,
    handleChangeForLogin,
    passwordType,
    showPassword,
    errorMessage,
    loginData,
    validated
  } = useContext<any>(AuthContext)
   
  const navigate = useNavigate()


  return (
    <div className="d-flex justify-content-center align-items-center flex-column mt-2">
      <Form className="form py-2" noValidate validated={validated} onSubmit={(e) => handleSubmitForLogin(e,navigate)}>
        <Row>
          <Form.Group as={Col} lg="12" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              name="email"
              value={loginData.email}
              onChange={handleChangeForLogin}
              className="custom-input bg-transparent form-control text-light"
            />
            <Form.Control.Feedback type="invalid">Please enter a valid email.</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} lg="12" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={passwordType}
                required
                name="password"
                value={loginData.password}
                onChange={handleChangeForLogin}
                className="custom-input bg-transparent form-control text-light"
              />
              <InputGroup.Text onClick={showPassword}>
                <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
              </InputGroup.Text>
            </InputGroup>
            <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <div className='d-flex justify-content-evenly w-100 pt-3'>
          <button className='button-styles w-50 text-light' type={submitting ? 'button' : 'submit'}>
            {submitting ? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='button-styles text-light w-50' onClick={() => navigate('/')}> Home</button>
        </div>
        <LoginOption
            title='Forgot password?'
            buttonText='New password'
             route='forgot-password'
             dontShowLogo={true} />
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default LoginForm;
