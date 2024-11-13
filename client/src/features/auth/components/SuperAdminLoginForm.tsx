// src/components/LoginForm.tsx
import React, { useContext } from "react";
import { Form, Button, Alert, Spinner, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Logo from "../../common/components/Logo";
import { AuthContext } from "../context/AuthContext";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const SuperAdminLoginForm: React.FC = () => {
  const {
    superAdminLoginData,
    setSuperAdminData,
    handleChange,
    handleLoginSuperAdmin,
    showPassword,
    passwordType,
    submitting,
    errorMessage,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  return (
    <>
      <div className="py-3 px-3">
        <Logo />
        <h5>Site Owner Login</h5>
      </div>
      <Form
        className="bg-light form py-3"
        onSubmit={(e) => handleLoginSuperAdmin(e, navigate)}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            onChange={(e) => handleChange(e, setSuperAdminData)}
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
            onChange={(e) => handleChange(e, setSuperAdminData)}
            className="form-input"
            name="password"
            type={passwordType}
            placeholder="Password"
          />
          <InputGroup>
            <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon
                icon={passwordType === "text" ? faEye : faEyeSlash}
              />
            </InputGroup.Text>
          </InputGroup>
          <PasswordStrengthMeter password={superAdminLoginData.password} />
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
          <a href="#!" onClick={() => navigate("/forgot-password")}>
            Forgot Password
          </a>
          <a href="#!" onClick={() => navigate("/superadmin/signup")}>
            Create Account
          </a>
        </div>
        {errorMessage && (
          <Alert className="w-100" variant="danger">
            {errorMessage}
          </Alert>
        )}
      </Form>
    </>
  );
};

export default SuperAdminLoginForm;
