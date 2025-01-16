
import React, { useContext, } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../context/AuthContext';
import image from '../../assets/images/greater-texas-cu-icon.svg'
import { AuthOption } from '../../components/AuthOption';
import '../../styles/AuthForm.css'





const AdminLogin: React.FC<{isSuperAdmin?:boolean}> = ({isSuperAdmin}) => {

  const {setLoginData,handleChange,handleLoginAdmin,showPassword,passwordType,submitting,errorMessage} = useContext(AuthContext)



  const navigate = useNavigate();


  


  return (
    <>
    
      <div className="form-wrapper d-flex flex-column align-items-center">
      <img style={{height:'2cm'}} src={image} alt='icon'/>
        <h5>Admin Login</h5>
    
      <Form className=" " onSubmit={(e)=>handleLoginAdmin(e,navigate)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            onChange={(e)=>handleChange(e,setLoginData)}
            className="form-input"
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a username.
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            onChange={(e)=>handleChange(e,setLoginData)}
            className="form-input"
            name="password"
            type="password"
            placeholder="Password"
          />
           <div className="d-flex justify-content-center">
              <FontAwesomeIcon onClick={() => showPassword()} icon={passwordType === 'text' ? faEye : faEyeSlash}/>
          </div>
      
          <Form.Control.Feedback type="invalid">
            Please enter password.
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Button
          className="button-radius bg-red w-100"
          type="submit"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              login in...
            </>
          ) : (
            "Login"
          )}
        </Button>
        <div className="line-container mt-4">
          <hr className="gray-line" />
        </div>

        <div className="link-container">
     
        <a href="/forgot-password" >Forgot Password</a>
      </div>
      {errorMessage&& <Alert className="w-100" variant="danger">
        {errorMessage}</Alert>}
      </Form>
      <AuthOption dontShowLogo route={'/super-admin/signup'} title={'Do have a super admin account'} buttonText={'Signup'}/>
      </div>
    
   
    </>
  )
};

export default AdminLogin;
