import React, { useState } from 'react';
import { Row, Col, Card, Button, Alert, Form, InputGroup } from 'react-bootstrap';
import { Plus, Search } from 'lucide-react';

import FixedDepositList from '../../components/admin/FixedDepositManagement/FixedDepositList';
import FixedDepositFormModal from '../../components/admin/FixedDepositManagement/FixedDepositForm';

import { FixedTermDeposit } from '../../types';
import { useFixedDeposits } from '../../hooks/useFixedDeposit';
import { QueryType } from './AccountHolders';
import { useParams } from 'react-router-dom';

const FixedDeposits: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingDeposit, setEditingDeposit] = useState<FixedTermDeposit | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
   const [params,setParams] =useState<QueryType>({ page: 1, limit: 10})
  
  const { 
    data: fixedDepositsResponse, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useFixedDeposits(params
);

  const handleCreateDeposit = () => {
    setEditingDeposit(null);
    setShowFormModal(true);
  };

  const handleEditDeposit = (deposit: FixedTermDeposit) => {
    setEditingDeposit(deposit);
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditingDeposit(null);
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
          <h1>Fixed Term Deposit Management</h1>
          <p>Manage fixed term deposit accounts for account holders</p>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <Button variant="primary" onClick={handleCreateDeposit}>
            <Plus size={18} className="me-2" />
            Add Fixed Deposit
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
          Error loading fixed deposits: {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
      )}

      <Card>
        <Card.Body>
          <FixedDepositList
          setParams={setParams}
            deposits={fixedDepositsResponse?.data || []}
            pagination={fixedDepositsResponse?.pagination}
            isLoading={isLoading}
            onEdit={handleEditDeposit}
            onRefetch={refetch}
          />
        </Card.Body>
      </Card>

      <FixedDepositFormModal
        show={showFormModal}
        deposit={editingDeposit}
        onClose={handleCloseFormModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default FixedDeposits;