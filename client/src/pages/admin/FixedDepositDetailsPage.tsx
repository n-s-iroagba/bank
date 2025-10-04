import { useParams, useNavigate } from "react-router-dom"
import { Card, Spinner, Container, Row, Col, Badge, Button } from "react-bootstrap"
import { Calendar, Clock, Percent, DollarSign, User, Shield, ArrowLeft, TrendingUp, PieChart, Calendar as CalendarIcon } from "lucide-react"
import { useFixedDeposit } from "../../hooks/useFixedDeposit"
import "../../styles/FixedDepositDetails.css"

export default function FixedTermDepositDetailsPage() {
  const { accountId } = useParams<{ accountId: string }>()
  const navigate = useNavigate()

  const fixedDepositResponse = useFixedDeposit(accountId as string)
  const rawAccount = fixedDepositResponse.data

  if (fixedDepositResponse.isLoading) {
    return (
      <Container className="fixed-deposit-details-container fixed-deposit-details-page">
        <div className="fixed-deposit-loading-container">
          <Spinner animation="border" className="fixed-deposit-loading-spinner" />
          <div className="fixed-deposit-loading-text">Loading Fixed Deposit Details...</div>
        </div>
      </Container>
    )
  }

  if (!rawAccount) {
    return (
      <Container className="fixed-deposit-details-container fixed-deposit-details-page">
        <div className="fixed-deposit-not-found-container">
          <PieChart size={64} className="fixed-deposit-not-found-icon" />
          <div className="fixed-deposit-not-found-text">Fixed Deposit Not Found</div>
          <div className="fixed-deposit-not-found-subtext">
            The requested fixed deposit account could not be found or may have been closed.
          </div>
          <Button 
            onClick={() => navigate("/admin/fixed-deposits")}
            className="btn-primary-fixed-deposit"
          >
            <ArrowLeft size={16} className="me-2" />
            Back to Fixed Deposits
          </Button>
        </div>
      </Container>
    )
  }

  // ✅ Normalize account data to avoid NaN issues
  const account = {
    ...rawAccount,
    balance: Number(rawAccount.balance),
    term: Number(rawAccount.term),
    interestRate: Number(rawAccount.interestRate),
    maturityDate: new Date(rawAccount.maturityDate),
    createdAt: rawAccount.createdAt ? new Date(rawAccount.createdAt) : undefined,
    updatedAt: rawAccount.updatedAt ? new Date(rawAccount.updatedAt) : undefined,
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  const calculateDaysUntilMaturity = () => {
    const today = new Date()
    const diffTime = account.maturityDate.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const calculateMaturityProgress = () => {
    const createdDate = account.createdAt || new Date()
    const today = new Date()

    const totalDuration = account.maturityDate.getTime() - createdDate.getTime()
    const elapsedDuration = today.getTime() - createdDate.getTime()

    return Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100)
  }

  const calculateInterestEarned = () => {
    const annualRate = account.interestRate / 100
    const termInYears = account.term / 12
    return account.balance * annualRate * termInYears
  }

  const calculateTotalValue = () => account.balance + calculateInterestEarned()

  const getMaturityStatus = () => {
    const daysUntilMaturity = calculateDaysUntilMaturity()
    if (!account.isActive) return { status: "Closed", color: "slate" }
    if (daysUntilMaturity <= 0) return { status: "Matured", color: "green" }
    if (daysUntilMaturity <= 30) return { status: "Maturing Soon", color: "orange" }
    return { status: "Active", color: "blue" }
  }

  const maturityStatus = getMaturityStatus()
  const daysUntilMaturity = calculateDaysUntilMaturity()
  const maturityProgress = calculateMaturityProgress()
  const interestEarned = calculateInterestEarned()
  const totalValue = calculateTotalValue()

  return (
    <Container className="fixed-deposit-details-container fixed-deposit-details-page">
      {/* Header Section */}
      <div className="fixed-deposit-details-header">
        <Row className="align-items-center">
          <Col>
            <h1 className="fixed-deposit-page-title">
              <PieChart size={28} className="me-3" />
              Fixed Term Deposit Details
            </h1>
            <p className="fixed-deposit-page-subtitle">
              Comprehensive overview of fixed deposit account #{account.accountNumber}
            </p>
          </Col>
          <Col xs="auto">
            <Button 
              onClick={() => navigate("/admin/fixed-deposits")}
              className="btn-outline-fixed-deposit"
            >
              <ArrowLeft size={16} className="me-2" />
              Back to Deposits
            </Button>
          </Col>
        </Row>
      </div>

      {/* Account Overview */}
      <div className="fixed-deposit-overview">
        <div className="fixed-deposit-overview-card">
          <div className="fixed-deposit-overview-label">
            <DollarSign size={16} />
            Current Balance
          </div>
          <div className="fixed-deposit-overview-value balance">
            {formatCurrency(account.balance)}
          </div>
        </div>
        
        <div className="fixed-deposit-overview-card">
          <div className="fixed-deposit-overview-label">
            <Percent size={16} />
            Interest Rate
          </div>
          <div className="fixed-deposit-overview-value interest">
            {account.interestRate}%
          </div>
        </div>
        
        <div className="fixed-deposit-overview-card">
          <div className="fixed-deposit-overview-label">
            <Clock size={16} />
            Term Duration
          </div>
          <div className="fixed-deposit-overview-value">
            {account.term} months
          </div>
        </div>
        
        <div className="fixed-deposit-overview-card">
          <div className="fixed-deposit-overview-label">
            <Calendar size={16} />
            Account Status
          </div>
          <div>
            <Badge className={`fixed-deposit-status-badge ${
              account.isActive ? 'fixed-deposit-status-active' : 'fixed-deposit-status-inactive'
            }`}>
              {maturityStatus.status}
            </Badge>
          </div>
        </div>
      </div>

      {/* Maturity Progress */}
      {account.isActive && (
        <div className="maturity-progress">
          <div className="maturity-progress-title">
            <TrendingUp size={18} />
            Maturity Progress
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar-maturity" 
              style={{ width: `${maturityProgress}%` }}
            ></div>
          </div>
          <div className="maturity-stats">
            <span>Created: {formatDate(account.createdAt || new Date())}</span>
            <span>
              {daysUntilMaturity > 0 ? `${daysUntilMaturity} days remaining` : "Matured"}
            </span>
            <span>Matures: {formatDate(account.maturityDate)}</span>
          </div>
        </div>
      )}

      {/* Interest Calculation */}
      <div className="interest-calculation">
        <div className="interest-calculation-title">
          <TrendingUp size={18} />
          Projected Returns at Maturity
        </div>
        <div className="interest-breakdown">
          <div>
            <div className="interest-amount">{formatCurrency(interestEarned)}</div>
            <div className="interest-label">Interest Earned</div>
          </div>
          <div>
            <div className="interest-amount">{formatCurrency(totalValue)}</div>
            <div className="interest-label">Total Value</div>
          </div>
          <div>
            <div className="interest-amount">{account.interestRate}%</div>
            <div className="interest-label">Annual Rate</div>
          </div>
        </div>
      </div>

      {/* Main Details Card */}
      <Card className="fixed-deposit-details-card">
        <Card.Header className="fixed-deposit-card-header-custom">
          <Shield size={20} />
          Account Information
        </Card.Header>
        <Card.Body className="fixed-deposit-card-body-custom">
          <div className="fixed-deposit-info-grid">
            {/* Account Details Section */}
            <div className="fixed-deposit-info-section">
              <h4 className="fixed-deposit-section-title">
                <PieChart size={16} />
                Account Details
              </h4>
              <div className="fixed-deposit-info-item">
                <span className="fixed-deposit-info-label">Account Number</span>
                <span className="fixed-deposit-info-value" style={{ fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace' }}>
                  {account.accountNumber}
                </span>
              </div>
              <div className="fixed-deposit-info-item">
                <span className="fixed-deposit-info-label">Account Type</span>
                <span className="fixed-deposit-info-value">Fixed Term Deposit</span>
              </div>
              <div className="fixed-deposit-info-item">
                <span className="fixed-deposit-info-label">Current Balance</span>
                <span className="fixed-deposit-info-value" style={{ fontWeight: '700', color: '#059669' }}>
                  {formatCurrency(account.balance)}
                </span>
              </div>
            </div>

            {/* Term & Interest Section */}
            <div className="fixed-deposit-info-section">
              <h4 className="fixed-deposit-section-title">
                <Percent size={16} />
                Term & Interest
              </h4>
              <div className="fixed-deposit-info-item">
                <span className="fixed-deposit-info-label">Term Duration</span>
                <span className="fixed-deposit-info-value">
                  {account.term} months
                </span>
              </div>
              <div className="fixed-deposit-info-item">
                <span className="fixed-deposit-info-label">Interest Rate</span>
                <span className="fixed-deposit-info-value" style={{ color: '#059669', fontWeight: '700' }}>
                  {account.interestRate}% per annum
                </span>
              </div>
              <div className="fixed-deposit-info-item">
                <span className="fixed-deposit-info-label">Interest Earned</span>
                <span className="fixed-deposit-info-value" style={{ color: '#059669', fontWeight: '700' }}>
                  {formatCurrency(interestEarned)}
                </span>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="fixed-deposit-info-section">
              <h4 className="fixed-deposit-section-title">
                <CalendarIcon size={16} />
                Timeline
              </h4>
              <div className="fixed-deposit-info-item">
                <span className="fixed-deposit-info-label">Created Date</span>
                <span className="fixed-deposit-info-value">
                  {formatDate(account.createdAt || new Date())}
                </span>
              </div>
              <div className="fixed-deposit-info-item">
                <span className="fixed-deposit-info-label">Maturity Date</span>
                <span className="fixed-deposit-info-value">
                  {formatDate(account.maturityDate)}
                </span>
              </div>
              <div className="fixed-deposit-info-item">
                <span className="fixed-deposit-info-label">Last Updated</span>
                <span className="fixed-deposit-info-value">
                  {account.updatedAt ? formatDate(account.updatedAt) : "N/A"}
                </span>
              </div>
            </div>

            {/* Account Holder Section */}
            <div className="fixed-deposit-info-section">
              <h4 className="fixed-deposit-section-title">
                <User size={16} />
                Account Holder
              </h4>
              <div className="fixed-deposit-info-item">
                <span className="fixed-deposit-info-label">Holder ID</span>
                <span className="fixed-deposit-info-value">#{account.accountHolderId}</span>
              </div>
              <div className="fixed-deposit-info-item">
                <span className="fixed-deposit-info-label">Account Status</span>
                <span className="fixed-deposit-info-value">
                  <Badge className={`fixed-deposit-status-badge ${
                    account.isActive ? 'fixed-deposit-status-active' : 'fixed-deposit-status-inactive'
                  }`}>
                    {account.isActive ? "Active" : "Inactive"}
                  </Badge>
                </span>
              </div>
              <div className="fixed-deposit-info-item">
                <span className="fixed-deposit-info-label">Days Until Maturity</span>
                <span className="fixed-deposit-info-value">
                  {daysUntilMaturity > 0 ? `${daysUntilMaturity} days` : "Matured"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="fixed-deposit-action-buttons">
            <Button
              onClick={() => navigate(`/admin/account-holders/${account.accountHolderId}`)}
              className="btn-primary-fixed-deposit"
            >
              <User size={18} />
              View Account Holder
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/fixed-deposits")}
              className="btn-outline-fixed-deposit"
            >
              <ArrowLeft size={16} />
              Back to All Deposits
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
