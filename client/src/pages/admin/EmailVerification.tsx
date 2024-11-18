import React, { useState, useRef, useEffect } from 'react';
import { Spinner, Alert, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';
import '../styles/EmailVerification.css'
import { verifySuperAdminEmail } from '../../services/authService';

const EmailVerification = () => {
  // State for holding the code entered in each box
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0); 
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const [id,setId] = useState(0)

  // Function to handle code change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newCode = [...code];
    newCode[index] = e.target.value;

    // Update the code array state
    setCode(newCode);

    // If the box is filled and it's not the last box, move to the next one
    if (e.target.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If the last box is filled, call handleVerifyEmail
    if (index === 5 && newCode.every((digit) => digit)) {
      handleVerifyEmail(Number(newCode.join('')));
    }
  };

  // Handle email verification
  const handleVerifyEmail = async (code: number) => {
    setIsVerifying(true);
    setError(''); // reset error before each attempt

  

    if (id) {
      alert('You are unauthorised to view this page');
      navigate('/login');
      return;
    }

    try {
      const response = await verifySuperAdminEmail(id, {code:code});

      alert('Verification successful');
    } catch (error) {
      console.error(error);
      setError('Sorry an error occurred, contact developer');
    } finally {
      setIsVerifying(false);
    }
  };

  // Function to request a new verification co}de with cooldown logic
  const resendCode = async () => {
    if (!canResend) {
      alert(`Please wait ${timeLeft} seconds before requesting a new code.`);
      return;
    }

    try {
      // Call the service to request a new code
      const response = await requestNewCode(id);
     
    } catch (error) {
      alert('Error while requesting a new code');
    }
  };

  // Start the cooldown timer
  const startCooldown = () => {
    const cooldownTime = 5 * 60; // 5 minutes in seconds
    setTimeLeft(cooldownTime);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setCanResend(true); // Allow resend after cooldown
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Update every second
  };

  useEffect(() => {
    const idString = localStorage.getItem('EmailVerificationId');
    if (!idString) {
      alert('You are unauthorised to view this page');
      navigate('/login');
      return
    }
    setId(Number(idString));
  }, [navigate]);

  return (
    <div className="email-verification-container">
      <h3>Email Verification</h3>
      <div className="code-inputs">
        {code.map((digit, index) => (
          <input
            key={index}
            type="number"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="code-box"
            disabled={isVerifying} // Disable input fields while verifying
          />
        ))}
      </div>

      {isVerifying ? (
        <div>
          <Spinner animation="border" variant="primary" />
          <Alert variant="info">Verifying...</Alert>
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div>
          <Button onClick={resendCode} disabled={!canResend}>
            {canResend ? 'Resend Code' : `Wait ${timeLeft}s`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
function requestNewCode(id: number) {
  throw new Error('Function not implemented.');
}

