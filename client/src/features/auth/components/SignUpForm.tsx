// /components/SignUp.tsx
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext} from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { AuthContext } from '../context/AuthContext';


const SignUpForm: React.FC = () => {
   const navigate = useNavigate();
const{superAdminData,handleChange,showPassword,passwordValidityMessage,passwordType,handleSubmit,setSuperAdminData,handleChangeForConfirmPassword} = useContext(AuthContext)


  return (
    <Form onSubmit={(e)=>handleSubmit(e,navigate)}>
      <Form.Group controlId="username">
        <Form.Label>Firstname</Form.Label>
        <Form.Control
          type="text"
          value={superAdminData.firstname}
          onChange={(e) =>handleChange(e,setSuperAdminData)}
          required
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Surname</Form.Label>
        <Form.Control
          type="text"
          value={superAdminData.surname}
          onChange={(e) =>handleChange(e,setSuperAdminData)}
          required
        />
      </Form.Group>

      <Form.Group controlId="confirmPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={superAdminData.password}
          onChange={(e) =>handleChange(e,setSuperAdminData)}
          required
        />
        <InputGroup>

               <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
          <PasswordStrengthMeter password={superAdminData.password} />
          <div className='d-flex flex-column'>
            {
              Array.isArray(passwordValidityMessage) && passwordValidityMessage.length > 0 && (
                passwordValidityMessage.map((message, index) => (
                  <Form.Text className='text-danger' key={index}>*{message}</Form.Text>
                ))
              )
            }
          </div>
      </Form.Group>

      <Form.Group controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type={passwordType}
          value={superAdminData.confirmPassword}
          onChange={(e) => handleChangeForConfirmPassword(e,superAdminData,setSuperAdminData)}
          required
        /><InputGroup>
               <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
          <div className='d-flex flex-column'>
            {
              Array.isArray(passwordValidityMessage) && passwordValidityMessage.length > 0 && (
                passwordValidityMessage.map((message, index) => (
                  <Form.Text className='text-danger' key={index}>*{message}</Form.Text>
                ))
              )
            }
          </div>
      </Form.Group>
      <Form.Group controlId="secretCode">
        <Form.Label>Secret Code</Form.Label>
        <Form.Control
          type="text"
          value={superAdminData.secretCode}
          
          onChange={(e) =>handleChange(e,setSuperAdminData)}
          required
        />
      </Form.Group>
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignUpForm;
