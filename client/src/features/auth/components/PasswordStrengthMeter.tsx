
import React, { useEffect, useState} from 'react';

export type PasswordStrengthType = 'weak' | 'fairly-strong' | 'strong' | '';
 interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password}) => {
  const [strength, setStrength] = useState('')
  useEffect(() => {
    const calculateStrength = () => {
      if (!password) {
        setStrength('');
        return;
      }

      const hasNumber = /\d/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const length = password.length;

      if (length < 4 && length > 1) {
        setStrength('weak');
      } else if (length > 4 && length < 8) {
        setStrength('fairly-strong');
      } else if (length >= 8 && hasUppercase && hasNumber) {
        setStrength('strong');
      }
    };

    calculateStrength();
  }, [password, setStrength]);

  return (
    <div className='d-flex justify-content-between'>
      <div className="meter-label">
        {strength === 'weak' && <p className='text-danger mb-0'>Weak password</p>}
        {strength === 'fairly-strong' && <p className='text-warning mb-0'>Fairly strong password</p>}
        {strength === 'strong' && <p className='text-light mb-0'>Strong password</p>}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
