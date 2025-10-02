import React, { useState } from 'react';
import { Row, Col, Card, Button, Alert, Form, InputGroup } from 'react-bootstrap';
import { Plus, Search, Calendar, DollarSign, TrendingUp, Users, PieChart } from 'lucide-react';

import FixedDepositList from '../../components/admin/FixedDepositManagement/FixedDepositList';
import FixedDepositFormModal from '../../components/admin/FixedDepositManagement/FixedDepositForm';
import '../../styles/FixedDeposit.css'

import { useParams } from 'react-router-dom';
<s></s>
import { useFixedDeposits } from '../../hooks/useFixedDeposit';
import { FixedTermDeposit } from '../../types';

const FixedDeposits: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingDeposit, setEditingDeposit] = useState<FixedTermDeposit | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [params, setParams] = useState({ page: 1, limit: 10 })
  
  const { 
    data: fixedDepositsResponse, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useFixedDeposits(params);

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

  const clearSearch = () => {
    setSearchTerm('');
    refetch();
  };

  // Calculate statistics
  const totalDeposits = fixedDepositsResponse?.pagination?.totalItems || 0;
  const activeDeposits = fixedDepositsResponse?.data?.filter(deposit => deposit.isActive).length || 0;
  const maturedDeposits = fixedDepositsResponse?.data?.filter(deposit => {
    if (!deposit.isActive) return false;
    const maturityDate = new Date(deposit.maturityDate);
    return maturityDate < new Date();
  }).length || 0;
  
  const totalBalance = fixedDepositsResponse?.data?.reduce((sum, deposit) => sum + deposit.balance, 0) || 0;

  return (
    <div className="fixed-deposits-page">
      {/* Stats Grid */}
      {totalDeposits > 0 && (
        <div className="stats-grid-fixed-deposits">
          <div className="stat-card-fixed-deposits">
            <div className="stat-value-fixed-deposits">{totalDeposits}</div>
            <div className="stat-label-fixed-deposits">Total Fixed Deposits</div>
            <PieChart size={24} className="stat-icon-fixed-deposits" />
          </div>
          <div className="stat-card-fixed-deposits">
            <div className="stat-value-fixed-deposits">{activeDeposits}</div>
            <div className="stat-label-fixed-deposits">Active Deposits</div>
            <TrendingUp size={24} className="stat-icon-fixed-deposits" />
          </div>
          <div className="stat-card-fixed-deposits">
            <div className="stat-value-fixed-deposits">{maturedDeposits}</div>
            <div className="stat-label-fixed-deposits">Matured Deposits</div>
            <Calendar size={24} className="stat-icon-fixed-deposits" />
          </div>
          <div className="stat-card-fixed-deposits">
            <div className="stat-value-fixed-deposits">
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="stat-label-fixed-deposits">Total Balance</div>
            <DollarSign size={24} className="stat-icon-fixed-deposits" />
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header-fixed-deposits">
        <Row className="align-items-center">
          <Col lg={6}>
            <h1 className="page-title-fixed-deposits">
              <div className="page-title-icon">
                <Calendar size={24} className="text-white" />
              </div>
              Fixed Term Deposit Management
            </h1>
            <p className="page-subtitle-fixed-deposits">
              Manage fixed term deposit accounts and monitor investment performance
            </p>
          </Col>
          <Col lg={6}>
            <div className="action-buttons-fixed-deposits">
              <Button 
                className="btn-primary-fixed-deposits"
                onClick={handleCreateDeposit}
              >
                <Plus size={18} className="btn-icon-fixed-deposits" />
                Add Fixed Deposit
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-fixed-deposits">
        <div className="quick-actions-title">
          <TrendingUp size={18} />
          Quick Actions
        </div>
        <div className="quick-actions-buttons">
          <Button 
            variant="outline" 
            size="sm" 
            className="btn-outline-primary-fixed-deposits"
            onClick={handleCreateDeposit}
          >
            <Plus size={14} className="me-1" />
            New Fixed Deposit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="btn-outline-secondary-fixed-deposits"
            onClick={clearSearch}
          >
            <Users size={14} className="me-1" />
            Show All Deposits
          </Button>
        </div>
      </div>

      {/* Search Card */}
      <Card className="search-card-fixed-deposits">
        <Card.Header className="search-card-header">
          <Search size={18} />
          Search Fixed Deposits
        </Card.Header>
        <Card.Body className="search-card-body">
          <Form onSubmit={handleSearch} className="search-form-fixed-deposits">
            <Row className="align-items-center">
              <Col md={8} lg={6}>
                <InputGroup className="search-input-group-fixed-deposits">
                  <Search size={18} className="search-icon-fixed-deposits" />
                  <Form.Control
                    type="text"
                    placeholder="Search by account number, holder name, or account holder ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control-search-fixed-deposits"
                  />
                </InputGroup>
              </Col>
              <Col md={4} lg={3}>
                <Button 
                  type="submit" 
                  className="btn-search-fixed-deposits"
                >
                  <Search size={16} className="me-1" />
                  Search
                </Button>
              </Col>
              <Col md={12} lg={3}>
                <div className="text-md-end mt-2 mt-lg-0">
                  <span className="text-muted" style={{ fontSize: '0.875rem' }}>
                    {totalDeposits} deposit(s) found
                  </span>
                </div>
              </Col>
            </Row>
            {searchTerm && (
              <div className="mt-2">
                <small className="text-muted">
                  Searching for: "<strong>{searchTerm}</strong>"
                  <Button 
                    variant="link" 
                    className="p-0 ms-2 text-danger" 
                    onClick={clearSearch}
                    style={{ fontSize: '0.75rem' }}
                  >
                    Clear
                  </Button>
                </small>
              </div>
            )}
          </Form>
        </Card.Body>
      </Card>

      {/* Error State */}
      {isError && (
        <Alert variant="danger" className="alert-custom-fixed-deposits alert-danger-fixed-deposits">
          <Alert.Heading className="h6 fw-bold mb-2">
            ⚠️ Loading Error
          </Alert.Heading>
          Error loading fixed deposits: {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
      )}

      {/* Fixed Deposit List */}
      <Card className="main-content-card-fixed-deposits">
        <Card.Body className="card-body-fixed-deposits">
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

      {/* Modals */}
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