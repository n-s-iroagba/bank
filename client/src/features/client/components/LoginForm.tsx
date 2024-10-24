import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/LoginForm.css";
import "../styles/GeneralStyles.css";
import "../styles/GeneralButtonStyles.css";
import "../styles/CarouselHeader.css";

import { useNavigate } from "react-router-dom";
import { postWithNoAuth } from "../../../utils/helpers";
import { clientLoginRoute } from "../../../data/routes";

const LoginForm: React.FC = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await postWithNoAuth(clientLoginRoute, loginDetails);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage("Sorry an error occured, try again later.");
    }
  };
  return (
    <>
      <div className="py-3 px-3 bg-red text-light">
        <h5>Your Feedback Matters</h5>
        <p className="small-font ">Questions? Comments?</p>
        <p className="small-font ">Complaints? We're here to help. </p>
        <p className="small-font pt-3">
          <span className="underline">Feedback</span> |{" "}
          <span className="underline">Complaints</span>
        </p>
      </div>
      <Form className="bg-light form py-3" onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            required
            onChange={(e) => handleChange(e)}
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
            onChange={(e) => handleChange(e)}
            className="form-input"
            name="password"
            type="password"
            placeholder="Password"
          />
          <Form.Control.Feedback type="invalid">
            Please enter password.
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Button className="button-radius bg-red w-100" type="submit">
          Login
        </Button>
        <div className="line-container mt-4">
          <hr className="gray-line" />
        </div>

        <div className="link-container ">
          <a href="/home">Enroll</a>
          <p>|</p>
          <a href="/home">Forgot User Name</a>
          <a href="/home">Forgot Password</a>
        </div>
      </Form>
      <p className="w-100 text-center text-danger fs-6">{errorMessage}</p>
    </>
  );
};

export default LoginForm;
