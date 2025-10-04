import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import '../../styles/slate-red-theme.css';

const ForgotPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [emailSent, setEmailSent] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailSent(true);
    console.log('Password reset requested for:', formData.email);
    // Add your forgot password API call here
  };

  return (
    <div className="slate-red-theme">
      <Container fluid className="auth-container">
        <Card className="auth-card">
          <div className="auth-header">
            <h3 className="auth-title">Reset Password</h3>
            <p className="auth-subtitle">Enter your email to receive reset instructions</p>
          </div>
          
          <div className="auth-body">
            {emailSent ? (
              <Alert variant="info" className="text-center">
                <Alert.Heading>Check Your Email</Alert.Heading>
                <p>We've sent password reset instructions to your email address.</p>
                <Button 
                  variant="primary" 
                  onClick={() => window.location.href = '/login'}
                  className="mt-2"
                >
                  Return to Login
                </Button>
              </Alert>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="w-100 mb-3">
                  Send Reset Instructions
                </Button>
              </Form>
            )}
          </div>

          <div className="auth-footer">
            <span 
              className="auth-link" 
              onClick={() => window.location.href = '/login'}
            >
              Back to Login
            </span>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default ForgotPasswordForm;