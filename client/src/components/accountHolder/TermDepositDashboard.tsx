import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  ProgressBar, 
  Badge,
  Button
} from 'react-bootstrap';
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Shield,
  Download,
  Eye,
  PlusCircle
} from 'lucide-react';
import '../../styles/FixedTermDeposit.css'
export interface FixedTermDeposit {
  id: number;
  accountNumber: string;
  balance: number;
  term: number;
  interestRate: number;
  maturityDate: Date;
  accountHolderId: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const FixedTermDepositDashboard: React.FC = () => {
  const [selectedDeposit, setSelectedDeposit] = useState<FixedTermDeposit | null>(null);

  const mockDeposits: FixedTermDeposit[] = [
    {
      id: 1,
      accountNumber: "TD-00123456",
      balance: 50000,
      term: 12,
      interestRate: 4.5,
      maturityDate: new Date('2024-12-15'),
      accountHolderId: 12345,
      isActive: true,
      createdAt: new Date('2023-12-15')
    },
    {
      id: 2,
      accountNumber: "TD-00789101",
      balance: 25000,
      term: 6,
      interestRate: 3.8,
      maturityDate: new Date('2024-06-20'),
      accountHolderId: 12345,
      isActive: true,
      createdAt: new Date('2023-12-20')
    },
    {
      id: 3,
      accountNumber: "TD-00345678",
      balance: 100000,
      term: 24,
      interestRate: 5.2,
      maturityDate: new Date('2025-12-10'),
      accountHolderId: 12345,
      isActive: true,
      createdAt: new Date('2023-12-10')
    }
  ];

  const calculateDaysUntilMaturity = (maturityDate: Date): number => {
    const today = new Date();
    const diffTime = maturityDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateProgress = (createdAt: Date, maturityDate: Date): number => {
    const totalDays = Math.ceil((maturityDate.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((new Date().getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const totalBalance = mockDeposits.reduce((sum, deposit) => sum + deposit.balance, 0);
  const totalInterest = mockDeposits.reduce((sum, deposit) => sum + (deposit.balance * deposit.interestRate / 100), 0);

  return (
    <div className="ftd-dashboard">
      <Container fluid>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="dashboard-header">
              <h1 className="dashboard-title">
                <Shield size={32} className="me-3" />
                Fixed Term Deposits
              </h1>
              <p className="dashboard-subtitle">Manage your investment portfolio</p>
            </div>
          </Col>
          <Col xs="auto">
            <Button variant="primary" className="new-deposit-btn">
              <PlusCircle size={20} className="me-2" />
              New Deposit
            </Button>
          </Col>
        </Row>

        {/* Summary Cards */}
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Card className="summary-card total-balance-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="summary-icon">
                    <DollarSign size={24} />
                  </div>
                  <div className="ms-3">
                    <h6 className="summary-label">Total Balance</h6>
                    <h3 className="summary-value">{formatCurrency(totalBalance)}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="summary-card total-interest-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="summary-icon">
                    <TrendingUp size={24} />
                  </div>
                  <div className="ms-3">
                    <h6 className="summary-label">Estimated Interest</h6>
                    <h3 className="summary-value">{formatCurrency(totalInterest)}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-3">
            <Card className="summary-card active-deposits-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="summary-icon">
                    <Clock size={24} />
                  </div>
                  <div className="ms-3">
                    <h6 className="summary-label">Active Deposits</h6>
                    <h3 className="summary-value">{mockDeposits.length}</h3>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Deposit Cards */}
        <Row>
          {mockDeposits.map((deposit) => (
            <Col lg={6} xl={4} key={deposit.id} className="mb-4">
              <Card className="deposit-card">
                <Card.Header className="deposit-card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="account-number">{deposit.accountNumber}</span>
                    <Badge bg={deposit.isActive ? "success" : "secondary"}>
                      {deposit.isActive ? "Active" : "Matured"}
                    </Badge>
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="deposit-info">
                    <div className="info-row">
                      <DollarSign size={18} />
                      <span className="info-label">Balance:</span>
                      <span className="info-value">{formatCurrency(deposit.balance)}</span>
                    </div>
                    <div className="info-row">
                      <TrendingUp size={18} />
                      <span className="info-label">Interest Rate:</span>
                      <span className="info-value">{deposit.interestRate}%</span>
                    </div>
                    <div className="info-row">
                      <Clock size={18} />
                      <span className="info-label">Term:</span>
                      <span className="info-value">{deposit.term} months</span>
                    </div>
                    <div className="info-row">
                      <Calendar size={18} />
                      <span className="info-label">Maturity Date:</span>
                      <span className="info-value">
                        {deposit.maturityDate.toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="progress-section">
                    <div className="d-flex justify-content-between mb-2">
                      <small>Progress</small>
                      <small>
                        {calculateDaysUntilMaturity(deposit.maturityDate)} days remaining
                      </small>
                    </div>
                    <ProgressBar 
                      now={calculateProgress(deposit.createdAt!, deposit.maturityDate)} 
                      variant="danger"
                      className="progress-bar-custom"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons mt-3">
                    <Button variant="outline-primary" size="sm" className="me-2">
                      <Eye size={16} className="me-1" />
                      Details
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <Download size={16} className="me-1" />
                      Statement
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Empty State */}
        {mockDeposits.length === 0 && (
          <Row>
            <Col>
              <Card className="text-center empty-state-card">
                <Card.Body>
                  <Shield size={64} className="mb-3 text-muted" />
                  <h5>No Fixed Term Deposits</h5>
                  <p className="text-muted">You don't have any fixed term deposits yet.</p>
                  <Button variant="primary">
                    <PlusCircle size={20} className="me-2" />
                    Create Your First Deposit
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default FixedTermDepositDashboard;