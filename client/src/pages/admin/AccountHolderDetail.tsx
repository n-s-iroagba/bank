 
import { useNavigate, useParams } from "react-router-dom"
import { Card, Button, Spinner, Container, Row, Col } from "react-bootstrap"
import { User, Mail,  Shield, CreditCard, PieChart, ArrowLeft } from "lucide-react"

import { useAccountHolder } from "../../hooks/useAccountHolder"
import "../../styles/AccountHolderDetails.css"

export default function AccountHolderDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const accountHolderResponse = useAccountHolder(Number(id))
  console.log(accountHolderResponse.data?.data)
  const accountHolder = accountHolderResponse.data?.data

  if (accountHolderResponse.isLoading) {
    return (
      <Container className="details-container account-holder-details-page">
        <div className="loading-container">
          <Spinner animation="border" className="loading-spinner" />
          <div className="loading-text">Loading Account Holder Details...</div>
        </div>
      </Container>
    )
  }

  if (!accountHolder) {
    return (
      <Container className="details-container account-holder-details-page">
        <div className="text-center py-5">
          <User size={48} className="text-slate-400 mb-3" />
          <h3 className="text-slate-700">Account Holder Not Found</h3>
          <p className="text-slate-500">The requested account holder could not be found.</p>
          <Button 
            onClick={() => navigate("/admin/account-holders")}
            className="btn-primary-custom mt-3"
          >
            <ArrowLeft size={16} className="me-2" />
            Back to Account Holders
          </Button>
        </div>
      </Container>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Container className="details-container account-holder-details-page">
      {/* Header Section */}
      <div className="details-header">
        <Row className="align-items-center">
          <Col>
            <h1 className="page-title">
              <User size={28} className="me-3" />
              Account Holder Details
            </h1>
            <p className="page-subtitle">
              Comprehensive information and account management for {accountHolder.firstName} {accountHolder.lastName}
            </p>
          </Col>
          <Col xs="auto">
            <Button 
              onClick={() => navigate("/admin/account-holders")}
              className="btn-outline-custom"
            >
              <ArrowLeft size={16} className="me-2" />
              Back to List
            </Button>
          </Col>
        </Row>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">#{accountHolder.id}</div>
          <div className="stat-label">Account Holder ID</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">#{accountHolder.userId}</div>
          <div className="stat-label">User ID</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {accountHolder.createdAt ? formatDate(accountHolder.createdAt.toString()).split(' ')[0] : 'N/A'}
          </div>
          <div className="stat-label">Member Since</div>
        </div>
      </div>

      {/* Main Details Card */}
      <Card className="details-card">
        <Card.Header className="card-header-custom d-flex align-items-center">
          <User size={20} className="me-2" />
          Personal Information
        </Card.Header>
        <Card.Body className="card-body-custom">
          <div className="info-grid">
            {/* Personal Information Section */}
            <div className="info-section">
              <h4 className="section-title">
                <User size={16} />
                Basic Information
              </h4>
              <div className="info-item">
                <span className="info-label">Full Name</span>
                <span className="info-value">
                  {accountHolder.firstName} {accountHolder.lastName}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Username</span>
                <span className="info-value">{accountHolder.username}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date of Birth</span>
                <span className="info-value">
                  {accountHolder.dateOfBirth ? formatDate(accountHolder.dateOfBirth) : 'N/A'}
                </span>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="info-section">
              <h4 className="section-title">
                <Mail size={16} />
                Contact Details
              </h4>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{accountHolder.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone</span>
                <span className="info-value">{accountHolder.phoneNumber}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Address</span>
                <span className="info-value">{accountHolder.address}</span>
              </div>
            </div>

            {/* Security Information Section */}
            <div className="info-section">
              <h4 className="section-title">
                <Shield size={16} />
                Security Information
              </h4>
              <div className="info-item">
                <span className="info-label">SSN</span>
                <span className="info-value sensitive-value">
                  {accountHolder.ssn || 'Not Provided'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Password</span>
                <span className="info-value sensitive-value">
                  ••••••••••
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Created</span>
                <span className="info-value">
                  {accountHolder.createdAt ? formatDate(accountHolder.createdAt.toString()) : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <Button 
              onClick={() => navigate(`/admin/account-holders/checking/${id}`)}
              className="btn-primary-custom"
            >
              <CreditCard size={18} />
              View Checking Accounts
            </Button>
            <Button 
              onClick={() => navigate(`/admin/account-holders/fixed/${id}`)}
              className="btn-primary-custom"
            >
              <PieChart size={18} />
              View Fixed Term Accounts
            </Button>
            <Button 
              onClick={() => navigate("/admin/account-holders")}
              className="btn-outline-custom"
            >
              <ArrowLeft size={16} />
              Back to All Account Holders
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

