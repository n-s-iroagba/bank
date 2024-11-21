import React, { useContext } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { AuthContext } from "../../../context/AuthContext";

import "../styles/AuthForm.css";

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
    <div className="form-wrapper" data-testid="sign-up-form">
      <h1 className="text-center fs-5 my-3">Bank Site Owner Registration</h1>

      <Form
        className="mx-auto w-100 w-lg-25"
        onSubmit={(e) => handleSubmit(e, navigate)}
      >
        {/* Username */}
        <Form.Group>
          <Form.Label className="fs-6">Pick a Username</Form.Label>
          <Form.Control
            type="text"
            className="form-input"
            name="username"
            value={superAdminData.username}
            onChange={(e) => handleChange(e, setSuperAdminData)}
            data-testid="username-input"
            required
          />
        </Form.Group>

        {/* Firstname */}
        <Form.Group className="mt-3">
          <Form.Label className="fs-6">Firstname</Form.Label>
          <Form.Control
            type="text"
            className="form-input"
            name="firstname"
            value={superAdminData.firstname}
            onChange={(e) => handleChange(e, setSuperAdminData)}
            data-testid="firstname-input"
            required
          />
        </Form.Group>

        {/* Surname */}
        <Form.Group className="mt-3">
          <Form.Label className="fs-6">Surname</Form.Label>
          <Form.Control
            type="text"
            className="form-input"
            name="surname"
            value={superAdminData.surname}
            onChange={(e) => handleChange(e, setSuperAdminData)}
            data-testid="surname-input"
            required
          />
        </Form.Group>

        {/* Email */}
        <Form.Group className="mt-3">
          <Form.Label className="fs-6">Email</Form.Label>
          <Form.Control
            type="email"
            className="form-input"
            name="email"
            value={superAdminData.email}
            onChange={(e) => handleChange(e, setSuperAdminData)}
            data-testid="email-input"
            required
          />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mt-3">
          <Form.Label className="fs-6">Password</Form.Label>
          <div className="form-input d-flex align-items-center">
            <Form.Control
              type={passwordType}
              className="form-input"
              name="password"
              value={superAdminData.password}
              onChange={(e) => handleChange(e, setSuperAdminData)}
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
          <PasswordStrengthMeter password={superAdminData.password} />
          {passwordValidityMessage.map((message, index) => (
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

        {/* Secret Code */}
        <Form.Group className="mt-3">
          <Form.Label className="fs-6">Secret Code</Form.Label>
          <div className="form-input d-flex align-items-center">
            <Form.Control
              type={passwordType}
              value={superAdminData.secretCode}
              className="form-input"
              name="secretCode"
              onChange={(e) => handleChange(e, setSuperAdminData)}
              data-testid="secret-code-input"
              required
            />
            <FontAwesomeIcon
              className="px-3"
              onClick={showPassword}
              icon={passwordType === "text" ? faEye : faEyeSlash}
            />
          </div>
          <p className="fs-6 text-center">
            *** The code provided to you by the developer.
          </p>
        </Form.Group>

        {/* Submit Button */}
        <Button
          className="w-100 mt-4 button-radius bg-blue"
          type="submit"
          disabled={submitting}
          data-testid="submit-button"
        >
          {submitting ? <Spinner size="sm" /> : "Sign Up"}
        </Button>
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
  );
};

export default SignUpForm;
