import React, { useState, useRef, useEffect } from 'react';
import { Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { requestNewVerificationCode, verifySuperAdminEmail } from '../../services/authService';
import { JWTService } from '../../services/JWTService';
import '../../styles/EmailVerification.css'


const EmailVerification = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0); 
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
    if (e.target.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    if (index === 5 && newCode.every((digit) => digit)) {
      handleVerifyEmail(Number(newCode.join('')));
    }
  };

  const handleVerifyEmail = async (code: number) => {
    setIsSubmitting(true);
    setError('');
    try {
      const token = JWTService.getEmailVerificationToken();
      const id = JWTService.decodeToken<any>(token).id;
      const loginToken = await verifySuperAdminEmail(id, {code});
      JWTService.saveLoginToken(loginToken);
      JWTService.removeEmailVerificationToken();
      alert('Verification successful');
      navigate(`/admin/account-holders/${id}`);
    } catch (error) {
      console.error(error);
      setError('Sorry, an error occurred. Contact the developer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendCode = async () => {
    if (!canResend) {
      alert(`Please wait ${timeLeft} seconds before requesting a new code.`);
      return;
    }
    setIsSubmitting(true);
    try {
      const emailToken = JWTService.getEmailVerificationToken();
      const id = JWTService.decodeToken<any>(emailToken).id;
      const token = await requestNewVerificationCode(id);
      JWTService.saveEmailVerificationToken(token);
      alert('Kindly check your email for a new code.');
    } catch (error) {
      console.error(error);
      alert('Error while requesting a new code');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startCooldown = () => {
    const cooldownTime = 5 * 60;
    setTimeLeft(cooldownTime);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setCanResend(true); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); 
  };

  useEffect(() => {
    try {
      JWTService.getEmailVerificationToken();
    } catch (error) {
      alert("You are unauthorized to view this page");
      navigate('/');
    }
    startCooldown();
  }, [navigate]);

  return (
    <div className="email-verification-container" data-cy="email-verification">
      <h3>Email Verification</h3>
      <div className="code-inputs" data-cy="code-inputs">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="code-box"
            disabled={isSubmitting}
            data-cy={`code-input-${index}`}
          />
        ))}
      </div>

      {isSubmitting ? (
        <div data-cy="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <Alert variant="info" data-cy="submitting-message">Submitting...</Alert>
        </div>
      ) : error ? (
        <Alert className="mt-5" variant="danger" data-cy="error-message">{error}</Alert>
      ) : (
        <div data-cy="resend-button-container">
          <Button onClick={resendCode} disabled={!canResend} data-cy="resend-button">
            {canResend ? 'Resend Code' : `Wait ${timeLeft}s`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
