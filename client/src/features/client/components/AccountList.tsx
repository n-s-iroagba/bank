// src/types/Account.ts
// src/App.tsx or any other component
import React from 'react';
import { Container } from 'react-bootstrap'
import AccountBalance from './AccountItem';

const App: React.FC = () => {
  const token = 'your-auth-token'; // Replace with the actual token logic
  const accountId = 1; // Replace with the actual account ID

  return (
    <Container>
      <h1>Account Information</h1>
      <AccountBalance token={token} accountId={accountId} />
    </Container>
  );
};

export default App;

  