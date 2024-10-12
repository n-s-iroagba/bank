import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ClientAccountForm from '../../features/admin/components/ClientAccountForm';
import ClientAccountList from '../../features/admin/components/ClientAccountList';
import { getClientAccounts } from '../../features/admin/services/clientService';
import { ClientAccount } from '../../features/admin/types/ClientAccount';


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
