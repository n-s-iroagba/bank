import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import '../../styles/slate-red-theme.css';
import { authService, RegisterData } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authService.register(formData)
    navigate(`/admin/dashboard`)
  };

  return (
    <div className="slate-red-theme">
      <Container fluid className="auth-container">
        <Card className="auth-card">
          <div className="auth-header">
            <h3 className="auth-title">Create Account</h3>
            <p className="auth-subtitle">Join us today</p>
          </div>
          
          <div className="auth-body">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
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

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button type="submit" className="w-100 mb-3">
                Create Account
              </Button>
            </Form>
          </div>

          <div className="auth-footer">
            <p className="text-muted mb-0">
              Already have an account?{' '}
              <span className="auth-link" onClick={() => window.location.href = '/login'}>
                Sign in
              </span>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default SignupForm;