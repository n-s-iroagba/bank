// src/components/AccountBalance.tsx
import React from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import useAccountBalance from '../hooks/useAccountBalance';

interface AccountBalanceProps {
  token: string; // Accept token as a prop for authentication
  accountId: number; // Account ID for which to fetch the balance
}

const AccountBalance: React.FC<AccountBalanceProps> = ({ token, accountId }) => {
  const { balance, loading, error } = useAccountBalance(token, accountId);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h5>Account Balance:</h5>
      <strong>${balance}</strong>
    </div>
  );
};

export default AccountBalance;
