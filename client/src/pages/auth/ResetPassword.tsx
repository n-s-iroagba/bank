import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import '../../styles/slate-red-theme.css';

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    token: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Password reset attempt:', formData);
    // Add your password reset API call here
  };

  return (
    <div className="slate-red-theme">
      <Container fluid className="auth-container">
        <Card className="auth-card">
          <div className="auth-header">
            <h3 className="auth-title">Set New Password</h3>
            <p className="auth-subtitle">Enter your new password below</p>
          </div>
          
          <div className="auth-body">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Reset Token</Form.Label>
                <Form.Control
                  type="text"
                  name="token"
                  placeholder="Enter reset token from email"
                  value={formData.token}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button type="submit" className="w-100 mb-3">
                Reset Password
              </Button>
            </Form>
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

export default ResetPasswordForm;