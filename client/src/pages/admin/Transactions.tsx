import React, { useState } from 'react';
import { Row, Col, Card, Button, Alert} from 'react-bootstrap';
import { Plus, ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, Filter } from 'lucide-react';

import TransactionFormModal from '../../components/admin/TransactionManagement/TransactionForm';
import TransactionList from '../../components/admin/TransactionManagement/TransactionList';


import { useParams, useNavigate } from 'react-router-dom';
import { QueryType } from '../../components/admin/FixedDepositManagement/FixedDepositList';
import '../../styles/Transaction.css';
import { useTransactions } from '../../hooks/useTransaction';
import { Transaction } from '../../types';

const Transactions: React.FC = () => {
  const { accountId } = useParams<{ accountId: string }>()
  const navigate = useNavigate();
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [params, setParams] = useState<QueryType>({ page: 1, limit: 10 })

  
  const { 
    data: transactionsResponse, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useTransactions(Number(accountId),params);

  const handleCreateTransaction = () => {
    setEditingTransaction(null);
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

  const clearSearch = () => {
    setSearchTerm('');
    refetch();
  };

  // Calculate statistics
  const transactions = transactionsResponse?.data?.data || [];
  const totalTransactions = transactionsResponse?.data.pagination?.total || 0;
  const creditTransactions = transactions.filter((t:Transaction) => t.type ==='credit').length;
  const debitTransactions = transactions.filter((t:Transaction) => t.type === 'debit').length;
  
  const totalCreditAmount = transactions
    .filter((t:Transaction) => t.type === 'credit')
    .reduce((sum:number, t:Transaction) => sum + t.amount, 0);
  
  const totalDebitAmount = transactions
    .filter((t:Transaction) => t.type === 'debit')
    .reduce((sum:number, t:Transaction) => sum + t.amount, 0);

  const netFlow = totalCreditAmount - totalDebitAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="transactions-page">
      {/* Stats Grid */}
      {totalTransactions > 0 && (
        <div className="stats-grid-transactions">
          <div className="stat-card-transactions">
            <div className="stat-value-transactions">{totalTransactions}</div>
            <div className="stat-label-transactions">Total Transactions</div>
            <Calendar size={24} className="stat-icon-transactions" />
          </div>
          <div className="stat-card-transactions">
            <div className="stat-value-transactions credit">{creditTransactions}</div>
            <div className="stat-label-transactions">Credit Transactions</div>
            <TrendingUp size={24} className="stat-icon-transactions" />
          </div>
          <div className="stat-card-transactions">
            <div className="stat-value-transactions debit">{debitTransactions}</div>
            <div className="stat-label-transactions">Debit Transactions</div>
            <TrendingDown size={24} className="stat-icon-transactions" />
          </div>
          <div className="stat-card-transactions">
            <div className="stat-value-transactions" style={{ 
              color: netFlow >= 0 ? '#059669' : '#dc2626' 
            }}>
              {formatCurrency(Math.abs(netFlow))}
            </div>
            <div className="stat-label-transactions">
              Net {netFlow >= 0 ? 'Inflow' : 'Outflow'}
            </div>
            <DollarSign size={24} className="stat-icon-transactions" />
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header-transactions">
        <Row className="align-items-center">
          <Col lg={6}>
            <h1 className="page-title-transactions">
              <div className="page-title-icon">
                <DollarSign size={24} className="text-white" />
              </div>
              Transaction Management
            </h1>
            <p className="page-subtitle-transactions">
              Monitor and manage all financial transactions across accounts
            </p>
          </Col>
          <Col lg={6}>
            <div className="action-buttons-transactions">
              {accountId && (
                <Button 
                  onClick={() => navigate(-1)}
                  className="btn-outline-secondary-transactions"
                >
                  <ArrowLeft size={16} className="me-2" />
                  Back to Account
                </Button>
              )}
              <Button 
                className="btn-primary-transactions"
                onClick={handleCreateTransaction}
              >
                <Plus size={18} className="btn-icon-transactions" />
                Create Transaction
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-transactions">
        <div className="quick-actions-title">
          <Filter size={18} />
          Quick Actions
        </div>
        <div className="quick-actions-buttons">
          <Button 
            variant="outline" 
            size="sm" 
            className="btn-outline-primary-transactions"
            onClick={handleCreateTransaction}
          >
            <Plus size={14} className="me-1" />
            New Transaction
          </Button>
  
        </div>
      </div>



      {/* Error State */}
      {isError && (
        <Alert variant="danger" className="alert-custom-transactions alert-danger-transactions">
          <Alert.Heading className="h6 fw-bold mb-2">
            ⚠️ Loading Error
          </Alert.Heading>
          Error loading transactions: {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
      )}

      {/* Transaction List */}
      <Card className="main-content-card-transactions">
        <Card.Body className="card-body-transactions">
          <TransactionList
           checkingAccountId={accountId as unknown as number}
          />
        </Card.Body>
      </Card>

      {/* Modals */}
      <TransactionFormModal
        accountId={accountId as string}
        show={showFormModal}
        transaction={editingTransaction}
        onClose={handleCloseFormModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Transactions;