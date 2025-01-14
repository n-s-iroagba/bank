import React, { useContext, useState } from "react";
import { Form, Button, Spinner, Modal, Alert} from "react-bootstrap";
import "../../styles/AuthForm.css";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../context/AuthContext";



const Login: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const {setLoginData,handleChange,handleLoginAccountHolder,showPassword,passwordType,submitting,errorMessage} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
 
  return (
    <div className=' px-md-5 py-sm-3 py-lg-0 h-100 px-lg-0   bg-light'>
      <div className="py-3 px-5 bg-red text-light">
        <h5>Your Feedback Matters</h5>
        <p className="small-font">Questions? Comments?</p>
        <p className="small-font">Complaints? We're here to help.</p>
        <p className="small-font pt-3">
          <span className="underline">Feedback</span> |{" "}
          <span className="underline">Complaints</span>
        </p>
      </div>
      <Form className="bg-light py-3 px-5" onSubmit={(e)=>handleLoginAccountHolder(e,navigate)}>
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
            type={passwordType}
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
              />
            </>
          ) : (
            "Login"
          )}
        </Button>
        <div className="line-container mt-4">
          <hr className="gray-line" />
        </div>

        <div className="link-container">
        <a href="/home">Enroll</a>
        <p>|</p>
        <a href="#!" onClick={handleShowModal}>Forgot Username</a>
        <a href="#!" onClick={handleShowModal}>Forgot Password</a>
      </div>
  
      </Form>
      {errorMessage.length>0 && alert(errorMessage)}
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
    </div>
  );
};

export default Login;
