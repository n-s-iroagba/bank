import { useParams, useNavigate } from "react-router-dom"
import { Card, Button, Spinner, Container, Row, Col, Badge, } from "react-bootstrap"
import { CreditCard, ArrowLeft, DollarSign, Activity, User, Shield  } from "lucide-react"
import { useCheckingAccount } from "../../hooks/useCheckingAccount";

import "../../styles/CheckingAccountDetails.css"


export default function CheckingAccountDetailsPage() {
  const { accountId } = useParams<{ accountId: string }>()
  const navigate = useNavigate()
  const accountResponse = useCheckingAccount(Number(accountId))
  const account = accountResponse?.data
  console.log(account)
  const loading = accountResponse.isLoading


  if (loading) {
    return (
      <Container className="checking-details-container checking-account-details-page">
        <div className="loading-container-checking">
          <Spinner animation="border" className="loading-spinner-checking" />
          <div className="loading-text-checking">Loading Account Details...</div>
        </div>
      </Container>
    )
  }

  if (!account) {
    return (
      <Container className="checking-details-container checking-account-details-page">
        <div className="not-found-container">
          <CreditCard size={64} className="not-found-icon" />
          <div className="not-found-text">Account Not Found</div>
          <div className="not-found-subtext">
            The requested checking account could not be found or may have been deleted.
          </div>
          <Button 
            onClick={() => navigate("/admin/checking-accounts")}
            className="btn-primary-checking"
          >
            <ArrowLeft size={16} className="me-2" />
            Back to Checking Accounts
          </Button>
        </div>
      </Container>
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getDaysSinceCreation = () => {
    if (!account.createdAt) return 0
    const created = new Date(account.createdAt)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - created.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }



  return (
    <Container className="checking-details-container checking-account-details-page">
      {/* Header Section */}
      <div className="checking-details-header">
        <Row className="align-items-center">
          <Col>
            <h1 className="checking-page-title">
              <CreditCard size={28} className="me-3" />
              Checking Account Details
            </h1>
            <p className="checking-page-subtitle">
              Comprehensive overview and management for account #{account.accountNumber}
            </p>
          </Col>
        </Row>
      </div>

   
      {/* Quick Stats */}
      <div className="quick-stats-checking">
        <div className="stat-card-checking">
          <div className="stat-value-checking">#{account.id}</div>
          <div className="stat-label-checking">Account ID</div>
        </div>
        <div className="stat-card-checking">
          <div className="stat-value-checking">{getDaysSinceCreation()}</div>
          <div className="stat-label-checking">Days Active</div>
        </div>
        <div className="stat-card-checking">
          <div className="stat-value-checking">#{account.accountHolderId}</div>
          <div className="stat-label-checking">Account Holder ID</div>
        </div>
      </div>

      {/* Account Overview */}
      <div className="account-overview">
        <div className="overview-card">
          <div className="overview-label">
            <DollarSign size={16} />
            Current Balance
          </div>
          <div className="overview-value balance">
            {formatCurrency(account.balance)}
          </div>
        </div>
        
        <div className="overview-card">
          <div className="overview-label">
            <Activity size={16} />
            Account Status
          </div>
          <div>
            <Badge className={`status-badge-checking ${account.isActive ? 'status-active-checking' : 'status-inactive-checking'}`}>
              {account.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
        
        <div className="overview-card">
          <div className="overview-label">
            <CreditCard size={16} />
            Account Number
          </div>
          <div className="overview-value" style={{ fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace' }}>
            {account.accountNumber}
          </div>
        </div>
      </div>


      {/* Main Details Card */}
      <Card className="checking-details-card">
        <Card.Header className="checking-card-header-custom">
          <Shield size={20} />
          Account Information
        </Card.Header>
        <Card.Body className="checking-card-body-custom">
          <div className="info-grid-checking">
            {/* Account Details Section */}
            <div className="info-section-checking">
              <h4 className="section-title-checking">
                <CreditCard size={16} />
                Account Details
              </h4>
              <div className="info-item-checking">
                <span className="info-label-checking">Account Number</span>
                <span className="info-value-checking" style={{ fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace' }}>
                  {account.accountNumber}
                </span>
              </div>
              <div className="info-item-checking">
                <span className="info-label-checking">Account Type</span>
                <span className="info-value-checking">Checking Account</span>
              </div>
              <div className="info-item-checking">
                <span className="info-label-checking">Current Balance</span>
                <span className="info-value-checking" style={{ fontWeight: '700', color: '#059669' }}>
                  {formatCurrency(account.balance)}
                </span>
              </div>
            </div>

            {/* Status & Timeline Section */}
            <div className="info-section-checking">
              <h4 className="section-title-checking">
                <Activity size={16} />
                Status & Timeline
              </h4>
              <div className="info-item-checking">
                <span className="info-label-checking">Account Status</span>
                <span className="info-value-checking">
                  <Badge className={`status-badge-checking ${account.isActive ? 'status-active-checking' : 'status-inactive-checking'}`}>
                    {account.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </span>
              </div>
              <div className="info-item-checking">
                <span className="info-label-checking">Created Date</span>
                <span className="info-value-checking">
                  {account.createdAt ? formatDate(account.createdAt) : 'N/A'}
                </span>
              </div>
              <div className="info-item-checking">
                <span className="info-label-checking">Last Updated</span>
                <span className="info-value-checking">
                  {account.updatedAt ? formatDate(account.updatedAt) : 'N/A'}
                </span>
              </div>
            </div>

            {/* Account Holder Section */}
            <div className="info-section-checking">
              <h4 className="section-title-checking">
                <User size={16} />
                Account Holder
              </h4>
              <div className="info-item-checking">
                <span className="info-label-checking">Holder ID</span>
                <span className="info-value-checking">#{account.accountHolderId}</span>
              </div>
              <div className="info-item-checking">
                <span className="info-label-checking">Member Since</span>
                <span className="info-value-checking">
                  {account.createdAt ? formatDate(account.createdAt).split(',')[0] : 'N/A'}
                </span>
              </div>
              <div className="info-item-checking">
                <span className="info-label-checking">Account Age</span>
                <span className="info-value-checking">
                  {getDaysSinceCreation()} days
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons-checking">
            <Button
              onClick={() => navigate(`/admin/transactions/${account.id}`)}
              className="btn-primary-checking"
            >
              <Activity size={18} />
              View Transactions
            </Button>
            <Button
              onClick={() => navigate(`/admin/account-holders/${account.accountHolderId}`)}
              className="btn-primary-checking"
            >
              <User size={18} />
              View Account Holder
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/checking-accounts")}
              className="btn-outline-checking"
            >
              <ArrowLeft size={16} />
              Back to All Accounts
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}