import React, { useState } from 'react';
import { Row, Col, Card, Button, Alert, Form, InputGroup } from 'react-bootstrap';
import { Plus, Search } from 'lucide-react';


import TransactionFormModal from '../../components/admin/TransactionManagement/TransactionForm';
import TransactionList from '../../components/admin/TransactionManagement/TransactionList';
import { Transaction } from '../../types';
import { useTransactions } from '../../hooks/useTransaction';
import { QueryType } from './AccountHolders';
import { useParams } from 'react-router-dom';


const Transactions: React.FC = () => {
   const { accountId } = useParams<{ accountId: string }>()
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
   const [params,setParams] =useState<QueryType>({ page: 1, limit: 10})
  
  const { 
    data: transactionsResponse, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useTransactions(params
);

  const handleCreateTransaction = () => {
    setEditingTransaction(null);
    setShowFormModal(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditingTransaction(null);
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
          <h1>Transaction Management</h1>
          <p>Manage all financial transactions</p>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Button variant="primary" onClick={handleCreateTransaction}>
            <Plus size={18} className="me-2" />
            Create Transaction
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
                    placeholder="Search by description, account number, or second party..."
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
          Error loading transactions: {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
      )}

      <Card>
        <Card.Body>
          <TransactionList
                      transactions={transactionsResponse?.data?.data || []}
                      pagination={transactionsResponse?.pagination}
                      isLoading={isLoading}
                      onEdit={handleEditTransaction}
                      onRefetch={refetch} onView={function (transaction: Transaction): void {
                          throw new Error('Function not implemented.');
                      } }          />
        </Card.Body>
      </Card>

      <TransactionFormModal
        show={showFormModal}
        transaction={editingTransaction}
        onClose={handleCloseFormModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Transactions;