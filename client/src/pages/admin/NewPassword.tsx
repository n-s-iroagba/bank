
import React, { useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import image from '../../assets/images/greater-texas-cu-icon.svg'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PasswordStrengthMeter from '../../components/PasswordStrengthMeter';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { JWTService } from '../../services/JWTService';

const NewPassword = () => {
  const navigate = useNavigate()
  const { token } = useParams<{ token: string }>();

  const {handleChangeForConfirmPassword,handleChange, handleResetPassword, newPasswordInput, setNewPasswordInput,errorMessage,passwordType,showPassword,passwordValidityMessage,isMatchingPassword} = useContext(AuthContext)

  const id = JWTService.decodeToken<{ id: number }>(token as string).id;
  if (!token || !id) {
    return (
      <Alert variant="danger" className="text-center mt-3">
        Unauthorized access. Please log in again.
      </Alert>
    );
  }
  return (
    <div className="form-wrapper d-flex flex-column align-items-center">
  
    <img style={{height:'2cm'}} src={image} alt='icon'/>
    <h3 className='text-center'>Enter Your New Password</h3>
  <Form onSubmit={(e)=>handleResetPassword(e,navigate,id)}>
  <Form.Group className="mt-3">
          <Form.Label className="fs-6">Password</Form.Label>
          <div className="form-input d-flex align-items-center">
            <Form.Control
              type={passwordType}
              className="form-input"
              name="password"
              value={newPasswordInput.password}
              onChange={(e) => handleChange(e, setNewPasswordInput)}
              data-testid="password-input"
              required
            />
            <FontAwesomeIcon
              className="px-3"
              name="toggle-password-visibility"
              onClick={showPassword}
              icon={passwordType === "text" ? faEye : faEyeSlash}
              data-testid="toggle-password-visibility"
            />
          </div>
          <PasswordStrengthMeter password={newPasswordInput.password} />
          {passwordValidityMessage.map((message:string, index:number) => (
            <Form.Text className="text-danger" key={index} data-testid={`password-error-${index}`}>
              * {message}
            </Form.Text>
          ))}
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="mt-3">
          <Form.Label className="fs-6">Confirm Password</Form.Label>
          <div className="form-input d-flex align-items-center">
            <Form.Control
              type={passwordType}
              value={newPasswordInput.confirmPassword}
              className="form-input"
              name="confirmPassword"
              onChange={(e) =>
                handleChangeForConfirmPassword(
                  e,
                  newPasswordInput,
                  setNewPasswordInput
                )
              }
              data-testid="confirm-password-input"
              required
            />
            <FontAwesomeIcon
              className="px-3"
              onClick={showPassword}
              icon={passwordType === "text" ? faEye : faEyeSlash}
            />
          </div>
          {!isMatchingPassword && (
            <p className="text-danger" data-testid="password-mismatch-error">
              *** Passwords do not match
            </p>
          )}
        </Form.Group>
    <br />
    <Button   className="button-radius bg-red w-100" type="submit">Submit</Button>
  </Form>
  {/* Error Message */}
  {errorMessage && (
        <Alert
          variant="danger"
          className="mt-3 min-width-100 text-center"
          data-testid="error-message"
        >
          {errorMessage}
        </Alert>
      )}
  </div>
  )
}
export default NewPassword