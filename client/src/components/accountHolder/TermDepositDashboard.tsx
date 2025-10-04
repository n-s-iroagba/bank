
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
import '../../styles/TermDeposit.css';
import { useFixedDeposits } from '../../hooks/useFixedDeposit';
import { FixedTermDeposit } from '../../types';


const FixedTermDepositDashboard = ({accountHolderId}:{accountHolderId:number}) => {

  const termDepositResponse = useFixedDeposits({accountHolderId})
  const deposits:FixedTermDeposit[]= termDepositResponse.data?.data||[]

  const calculateDaysUntilMaturity = (maturityDate: Date): number => {
    const today = new Date();
    const diffTime = new Date(maturityDate).getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateProgress = (createdAt: Date, maturityDate: Date): number => {
    const totalDays = Math.ceil( new Date(maturityDate).getTime()- new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
    const daysPassed = Math.ceil((new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };


  return (
    <div className="ftd-dashboard">
      <Container fluid>
        {/* Header */}
        <Row className="mb-4">
          <Col xs={12}>
            <div className="dashboard-header">
              <h1 className="dashboard-title text-center">
                <Shield size={32} className="me-3" />
                Fixed Term Deposits
              </h1>
              <p className="dashboard-subtitle">Manage your investment portfolio</p>
            </div>
                <Button variant="primary" className="new-deposit-btn">
              <PlusCircle size={20} className="me-2" />
              New Deposit
            </Button>
          </Col>
          <Col xs="auto">
        
          </Col>
        </Row>



        {/* Deposit Cards - Two columns on large screens */}
        <Row>
          {deposits.map((deposit) => (
            <Col xl={6} lg={6} md={6} className="mb-4 deposit-card-col" key={deposit.id}>
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
                        {new Date(deposit.maturityDate).toLocaleDateString()}
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
        {deposits.length === 0 && (
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