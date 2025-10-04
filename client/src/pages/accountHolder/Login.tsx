import React, { useState } from "react";
import { Form, Button, Spinner, Modal, Alert } from "react-bootstrap";
import "../../styles/AuthForm.css";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authService } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../../components/ui/Logo";


interface LoginData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: ""
  });
  const [passwordType, setPasswordType] = useState("password");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

const {setUser} = useAuth()
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showPassword = () => {
    setPasswordType(prev => prev === "password" ? "text" : "password");
  };

  const handleLoginAccountHolder = async (e: React.FormEvent, navigate: any) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
const response = await authService.loginAcountHolder(loginData)
setUser(response.user)
      navigate("/account-holder/dashboard");
    } catch (error: any) {
      setErrorMessage(error.message || "Login failed. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='px-md-5 py-sm-3 py-lg-0 h-100 px-lg-0 bg-light'>
      <Logo shouldNotDisplay/>
      <div className="py-3 px-5 bg-red text-light">
        <h5>Your Feedback Matters</h5>
        <p className="small-font">Questions? Comments?</p>
        <p className="small-font">Complaints? We're here to help.</p>
        <p className="small-font pt-3">
          <span className="underline">Feedback</span> |{" "}
          <span className="underline">Complaints</span>
        </p>
      </div>
      
      <Form className="bg-light py-3 px-5" onSubmit={(e) => handleLoginAccountHolder(e, navigate)}>
        {errorMessage && (
          <Alert variant="danger" className="mb-3">
            {errorMessage}
          </Alert>
        )}
        
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            onChange={handleChange}
            className="form-input"
            type="text"
            name="username"
            value={loginData.username}
            placeholder="Enter username"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a username.
          </Form.Control.Feedback>
        </Form.Group>
        
        <br />
        
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div className="position-relative">
            <Form.Control
              required
              onChange={handleChange}
              className="form-input"
              name="password"
              type={passwordType}
              value={loginData.password}
              placeholder="Password"
            />
            <div 
              className="position-absolute" 
              style={{
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer'
              }}
            >
              <FontAwesomeIcon 
                onClick={showPassword} 
                icon={passwordType === 'password' ? faEyeSlash : faEye}
              />
            </div>
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
                className="me-2"
              />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
        
        <div className="line-container mt-4">
          <hr className="gray-line" />
        </div>
        
        <div className="link-container">
          <a href="/">Enroll</a>
          <p>|</p>
          <a href="#!" onClick={handleShowModal}>Forgot Username</a>
          <p>|</p>
          <a href="#!" onClick={handleShowModal}>Forgot Password</a>
        </div>
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
    </div>
  );
};

export default Login;