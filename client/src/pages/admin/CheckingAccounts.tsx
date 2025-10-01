import React, { useState } from 'react';
import { Row, Col, Card, Button, Alert, Form, InputGroup } from 'react-bootstrap';
import { Plus, Search } from 'lucide-react';

import CheckingAccountList from '../../components/admin/CheckingAccountManagement/CheckingAccountList';
import CheckingAccountFormModal from '../../components/admin/CheckingAccountManagement/CheckingAccountForm';

import { CheckingAccount } from '../../types';
import { useCheckingAccounts } from '../../hooks/useCheckingAccount';
import { QueryType } from './AccountHolders';
import { useParams } from 'react-router-dom';

const CheckingAccounts: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState<CheckingAccount | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
   const [params,setParams] =useState<QueryType>({ page: 1, limit: 10})
  
  const { 
    data: checkingAccountsResponse, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useCheckingAccounts(params 
);

  const handleCreateAccount = () => {
    setEditingAccount(null);
    setShowFormModal(true);
  };

  const handleEditAccount = (account: CheckingAccount) => {
    setEditingAccount(account);
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditingAccount(null);
  };

  const handleSuccess = () => {
    refetch();
    handleCloseFormModal();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h1>Checking Account Management</h1>
          <p>Manage checking accounts for account holders</p>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Button variant="primary" onClick={handleCreateAccount}>
            <Plus size={18} className="me-2" />
            Add Checking Account
          </Button>
        </Col>
      </Row>

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row>
              <Col md={6}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search by account number or account holder..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline-secondary" type="submit">
                    <Search size={18} />
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {isError && (
        <Alert variant="danger" className="mb-4">
          Error loading checking accounts: {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
      )}

      <Card>
        <Card.Body>
          <CheckingAccountList
            setParams={setParams}
            accounts={checkingAccountsResponse?.data?.data || []}
            pagination={checkingAccountsResponse?.pagination}
            isLoading={isLoading}
            onEdit={handleEditAccount}
            onRefetch={refetch}
          />
        </Card.Body>
      </Card>

      <CheckingAccountFormModal
        show={showFormModal}
        account={editingAccount}
        onClose={handleCloseFormModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default CheckingAccounts;