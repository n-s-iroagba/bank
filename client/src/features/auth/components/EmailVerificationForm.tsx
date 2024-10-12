// /components/EmailVerification.tsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EmailVerification: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.length !== 6) {
      alert('Please enter a valid 6-digit code');
      return;
    }
    // Send request to verify code (skip for now)
    // On success:
    navigate('/login'); // Navigate to login page
  };

  return (
    <Form onSubmit={handleVerify}>
      <Form.Group controlId="verificationCode">
        <Form.Label>Enter the 6-digit code sent to your email</Form.Label>
        <Form.Control
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Verify Email</Button>
    </Form>
  );
};

export default EmailVerification;
