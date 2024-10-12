import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { ClientAccount } from '../types/ClientAccount';
import { getClientAccounts } from '../services/clientService';
import ClientAccountForm from './ClientAccountForm';
import ClientAccountList from './ClientAccountList';


const AdminDashboard: React.FC = () => {
  const [accounts, setAccounts] = useState<ClientAccount[]>([]);

  useEffect(() => {
    setAccounts(getClientAccounts());
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Admin Dashboard</h2>
          <ClientAccountForm onAccountCreated={() => setAccounts(getClientAccounts())} />
          <ClientAccountList accounts={accounts} onAccountsUpdated={() => setAccounts(getClientAccounts())} />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
