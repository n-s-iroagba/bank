
import React from 'react';
import { Button } from 'react-bootstrap';
import { startSpyingOnAdmin, stopSpyingOnAdmin } from '../services/spyService';

interface SpyControlProps {
  superAdminId: number;
  adminId: number;
  isSpying: boolean;
  onSpyChange: (isSpying: boolean) => void;
}

const SpyControl: React.FC<SpyControlProps> = ({ superAdminId, adminId, isSpying, onSpyChange }) => {
  const handleSpyToggle = async () => {
    try {
      if (isSpying) {
        await stopSpyingOnAdmin(superAdminId);
      } else {
        await startSpyingOnAdmin(superAdminId, adminId);
      }
      onSpyChange(!isSpying);
    } catch (error) {
      console.error('Error toggling spy mode:', error);
    }
  };

  return (
    <Button 
      variant={isSpying ? "danger" : "primary"}
      onClick={handleSpyToggle}
      className="mt-2"
    >
      {isSpying ? "Stop Monitoring" : "Start Monitoring"}
    </Button>
  );
};

export default SpyControl;
