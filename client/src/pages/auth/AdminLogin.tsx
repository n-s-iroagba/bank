import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';
import '../../styles/slate-red-theme.css';
import { authService } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

const AdminLoginForm: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authService.login(formData)
    navigate('/admin/dashboard')
  };

  return (
    <div className="slate-red-theme">
      <Container fluid className="auth-container">
        <Card className="auth-card">
          <div className="auth-header">
            <h3 className="auth-title">Welcome Back</h3>
            <p className="auth-subtitle">Sign in to your account</p>
          </div>
          
          <div className="auth-body">
            <Form onSubmit={handleSubmit}>
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

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button type="submit" className="w-100 mb-3">
                Sign In
              </Button>
            </Form>
          </div>

          <div className="auth-footer">
            <p className="text-muted mb-2">
              Don't have an account?{' '}
              <span className="auth-link">
                Sign up
              </span>
            </p>
            <span 
              className="auth-link" 
              
            >
              Forgot your password?
            </span>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default AdminLoginForm;