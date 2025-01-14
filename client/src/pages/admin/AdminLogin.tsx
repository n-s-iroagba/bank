
import React, { useContext, useState } from 'react';
import { Form, Button, Alert, Modal, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../context/AuthContext';
import Logo from '../../components/Logo';





const AdminLogin: React.FC = () => {

  const {setLoginData,handleChange,handleLoginAdmin,showPassword,passwordType,submitting,errorMessage} = useContext(AuthContext)

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  return (
    <>
      <div className="py-3 px-3">
        <Logo/>
        <h5>Admin Login</h5>
      </div>
      <Form className="bg-light form py-3" onSubmit={(e)=>handleLoginAdmin(e,navigate)}>
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
        <a href="#!" onClick={handleShowModal}>Forgot User Name</a>
        <a href="#!" onClick={handleShowModal}>Forgot Password</a>
      </div>
      {errorMessage&& <Alert className="w-100" variant="danger">
        {errorMessage}</Alert>}
      </Form>
    
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assistance Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            Kindly contact the Texas Credit Union for assistance.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCloseModal} className="btn btn-secondary">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default AdminLogin;
