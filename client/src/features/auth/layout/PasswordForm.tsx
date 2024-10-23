import React, { useContext, useEffect } from 'react';
import { useNavigate} from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { InputGroup, Spinner } from 'react-bootstrap';
import { required } from '../components/required';
import '../../../common/styles/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../../../common/components/ErrorMessage';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { AuthContext } from '../context/AuthContext';

const PasswordForm: React.FC = ()=>{
  const navigate = useNavigate()
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token')
    if (token) {
      localStorage.setItem("cassockChangePasswordToken", token);
    }else{
      alert('You are not authorised to view this page')
      navigate('/login')
    }
},[navigate])
 const { newPasswordData,
  setNewPasswordData,
  submitting,
  validated,
  handleConfirmPasswordsChange,
  handleSubmitForChangePassword,
  passwordType,
  showPassword,
  isMatchingPassword,
  errorMessage,
  handleChange,
  passwordValidityMessage
} = useContext<any>(AuthContext)

  return (
    <div className="d-flex justify-content-center align-items-center flex-column my-3">
      <Form className="form py-5 " noValidate validated={validated} onSubmit={(e) => handleSubmitForChangePassword(newPasswordData, e, navigate)}>
      <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Password{required}</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={passwordType}
              name='password'
              value={newPasswordData.password}
              onChange={(e) => handleChange(newPasswordData, e, setNewPasswordData)}
              className=" custom-input bg-transparent form-control text-light"

            />
            <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
          <PasswordStrengthMeter password={newPasswordData.password} />
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
        <br />

        <Form.Group as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Confirm password{required}</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={passwordType}
              name="confirmPassword"
              value={newPasswordData.confirmPassword}
              onChange={(e) => handleConfirmPasswordsChange(newPasswordData, e, setNewPasswordData)}
              className=" custom-input  bg-transparent form-control text-light "
            />
            <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
          <div>
            {
              !isMatchingPassword && <Form.Text className='text-danger'>*passwords do not match</Form.Text>
            }
          </div>
        </Form.Group>
         <br/>
        <Form.Group>
        <div className='d-flex justify-content-evenly w-100 pb-5'>
          <button className='button-styles w-50 text-light' type={submitting ==='submitting' ? 'button' : 'submit'}>
            {submitting  ==='submitting'? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='button-styles text-light w-50' onClick={() => navigate('/login')}> Back to Login</button>
        </div>
        </Form.Group>
      </Form>
      <br/>

      <ErrorMessage message={errorMessage} />
    </div>

  );
};

export default PasswordForm;