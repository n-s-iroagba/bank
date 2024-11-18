// /components/SignUp.tsx
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

import "../styles/AuthForm.css";
import { AuthContext } from "../../../context/AuthContext";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    superAdminData,
    errorMessage,
    handleChange,
    showPassword,
    passwordValidityMessage,
    passwordType,
    handleSubmit,
    setSuperAdminData,
    handleChangeForConfirmPassword,
    isMatchingPassword,
    submitting,
  } = useContext(AuthContext);

  return (
    <div className="form-wrapper">
      <h1 className="text-center fs-5 my-3">Bank Site Owner Registration.</h1>

      <Form
        className="mx-auto w-100 w-lg-25"
        onSubmit={(e) => handleSubmit(e, navigate)}
      >
        <Form.Group>
          <Form.Label className="fs-6">pick a username</Form.Label>
          <Form.Control
            type="text"
            className="form-input"
            name="username"
            value={superAdminData.username}
            onChange={(e) => handleChange(e, setSuperAdminData)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label className="fs-6">firstname</Form.Label>
          <Form.Control
            type="text"
            className="form-input"
            name="firstname"
            value={superAdminData.firstname}
            onChange={(e) => handleChange(e, setSuperAdminData)}
            required
          />
        </Form.Group>

        <br />
        <Form.Group>
          <Form.Label className="fs-6">Surname</Form.Label>
          <Form.Control
            type="text"
            name="surname"
            className="form-input"
            value={superAdminData.surname}
            onChange={(e) => handleChange(e, setSuperAdminData)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label className="fs-6">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            className="form-input"
            value={superAdminData.email}
            onChange={(e) => handleChange(e, setSuperAdminData)}
            required
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label className="fs-6">Password</Form.Label>
          <div className="form-input d-flex align-items-center">
            <Form.Control
              type={passwordType}
              className="form-input"
              name="password"
              value={superAdminData.password}
              onChange={(e) => handleChange(e, setSuperAdminData)}
              required
            />

            <FontAwesomeIcon
              className="px-3"
              onClick={() => showPassword()}
              icon={passwordType === "text" ? faEye : faEyeSlash}
            />
          </div>
          <div className="d-flex flex-column">
            {Array.isArray(passwordValidityMessage) &&
              passwordValidityMessage.length > 0 &&
              passwordValidityMessage.map((message, index) => (
                <Form.Text className="text-danger" key={index}>
                  *{message}
                </Form.Text>
              ))}
          </div>
          <PasswordStrengthMeter password={superAdminData.password} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label className="fs-6">Confirm Password</Form.Label>
          <div className="form-input d-flex align-items-center">
            <Form.Control
              type={passwordType}
              value={superAdminData.confirmPassword}
              className="form-input"
              name="confirmPassword"
              onChange={(e) =>
                handleChangeForConfirmPassword(
                  e,
                  superAdminData,
                  setSuperAdminData
                )
              }
              required
            />

            <FontAwesomeIcon
              className="px-3"
              onClick={() => showPassword()}
              icon={passwordType === "text" ? faEye : faEyeSlash}
            />
          </div>
          <br />
          {superAdminData.confirmPassword && !isMatchingPassword && (
            <p className=" mb-0 text-danger">***passwords do not match.</p>
          )}
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label className="fs-6">Secret Code</Form.Label>
          <div className="form-input d-flex align-items-center">
            <Form.Control
              value={superAdminData.secretCode}
              className="form-input"
              name="secretCode"
              type={passwordType}
              onChange={(e) => handleChange(e, setSuperAdminData)}
              required
            />

            <FontAwesomeIcon
              className="px-3"
              onClick={() => showPassword()}
              icon={passwordType === "text" ? faEye : faEyeSlash}
            />
          </div>
          <p className="fs-6 text-center">
            ***The code provided to you by the developer.
          </p>
        </Form.Group>

        <Button
          className="w-100 button-radius bg-blue"
          disabled={submitting}
          type="submit"
        >
          {submitting ? <Spinner size="sm" /> : "Sign Up"}
        </Button>
      </Form>

      <br />
      {errorMessage && (
        <Alert variant="danger" className="min-width-100 text-center">
          {errorMessage}
        </Alert>
      )}
    </div>
  );
};

export default SignUpForm;
