import { useParams, useNavigate } from "react-router-dom"
import { Card, Button, Spinner, Container, Row, Col, Badge, Form, Alert } from "react-bootstrap"
import { CreditCard, ArrowLeft, DollarSign, Calendar, Activity, User, Shield, Plus, Minus, TrendingUp, TrendingDown } from "lucide-react"
import { useCheckingAccount } from "../../hooks/useCheckingAccount";
import { useState } from "react";
import "../../styles/CheckingAccountDetails.css"

export default function CheckingAccountDetailsPage() {
  const { accountId } = useParams<{ accountId: string }>()
  const navigate = useNavigate()
  const accountResponse = useCheckingAccount(Number(accountId))
  const account = accountResponse?.data?.data
  console.log(account)
  const loading = accountResponse.isLoading

  // Credit/Debit form states
  const [creditAmount, setCreditAmount] = useState("")
  const [debitAmount, setDebitAmount] = useState("")
  const [creditDescription, setCreditDescription] = useState("")
  const [debitDescription, setDebitDescription] = useState("")
  const [creditErrors, setCreditErrors] = useState<Record<string, string>>({})
  const [debitErrors, setDebitErrors] = useState<Record<string, string>>({})
  const [isProcessingCredit, setIsProcessingCredit] = useState(false)
  const [isProcessingDebit, setIsProcessingDebit] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

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

  // Credit form validation
  const validateCreditForm = () => {
    const errors: Record<string, string> = {}
    
    if (!creditAmount || parseFloat(creditAmount) <= 0) {
      errors.amount = 'Please enter a valid credit amount'
    } else if (parseFloat(creditAmount) > 1000000) {
      errors.amount = 'Credit amount cannot exceed $1,000,000'
    }
    
    if (!creditDescription.trim()) {
      errors.description = 'Description is required'
    }
    
    setCreditErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Debit form validation
  const validateDebitForm = () => {
    const errors: Record<string, string> = {}
    
    if (!debitAmount || parseFloat(debitAmount) <= 0) {
      errors.amount = 'Please enter a valid debit amount'
    } else if (parseFloat(debitAmount) > account.balance) {
      errors.amount = 'Insufficient funds for this transaction'
    } else if (parseFloat(debitAmount) > 1000000) {
      errors.amount = 'Debit amount cannot exceed $1,000,000'
    }
    
    if (!debitDescription.trim()) {
      errors.description = 'Description is required'
    }
    
    setDebitErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle credit transaction
  const handleCreditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateCreditForm()) return
    
    setIsProcessingCredit(true)
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would call your actual API
      // await creditAccount(account.id, parseFloat(creditAmount), creditDescription)
      
      setSuccessMessage(`Successfully credited ${formatCurrency(parseFloat(creditAmount))} to account`)
      setCreditAmount("")
      setCreditDescription("")
      
      // Refresh account data
      accountResponse.refetch()
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000)
    } catch (error) {
      console.error('Error processing credit:', error)
      setCreditErrors({ submit: 'Failed to process credit transaction' })
    } finally {
      setIsProcessingCredit(false)
    }
  }

  // Handle debit transaction
  const handleDebitSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateDebitForm()) return
    
    setIsProcessingDebit(true)
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would call your actual API
      // await debitAccount(account.id, parseFloat(debitAmount), debitDescription)
      
      setSuccessMessage(`Successfully debited ${formatCurrency(parseFloat(debitAmount))} from account`)
      setDebitAmount("")
      setDebitDescription("")
      
      // Refresh account data
      accountResponse.refetch()
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000)
    } catch (error) {
      console.error('Error processing debit:', error)
      setDebitErrors({ submit: 'Failed to process debit transaction' })
    } finally {
      setIsProcessingDebit(false)
    }
  }

  // Calculate new balance previews
  const getCreditPreviewBalance = () => {
    if (!creditAmount || parseFloat(creditAmount) <= 0) return account.balance
    return account.balance + parseFloat(creditAmount)
  }

  const getDebitPreviewBalance = () => {
    if (!debitAmount || parseFloat(debitAmount) <= 0) return account.balance
    return account.balance - parseFloat(debitAmount)
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

      {/* Success Message */}
      {successMessage && (
        <Alert variant="success" className="success-message">
          <TrendingUp size={20} />
          {successMessage}
        </Alert>
      )}

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

      {/* Credit/Debit Forms */}
      <div className="transaction-forms">
        {/* Credit Form */}
        <Card className="transaction-form-card">
          <Card.Header className="transaction-form-header credit-form-header">
            <TrendingUp size={20} />
            Credit Account
          </Card.Header>
          <Card.Body className="transaction-form-body">
            <Form onSubmit={handleCreditSubmit}>
              <Form.Group className="form-group-transaction">
                <Form.Label className="form-label-transaction">
                  <Plus size={16} />
                  Amount to Credit
                </Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="1000000"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  isInvalid={!!creditErrors.amount}
                  placeholder="0.00"
                  className="form-control-transaction"
                  disabled={!account.isActive || isProcessingCredit}
                />
                {creditErrors.amount && (
                  <div className="invalid-feedback-transaction">
                    {creditErrors.amount}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="form-group-transaction">
                <Form.Label className="form-label-transaction">
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={creditDescription}
                  onChange={(e) => setCreditDescription(e.target.value)}
                  isInvalid={!!creditErrors.description}
                  placeholder="Enter transaction description..."
                  className="form-control-transaction"
                  disabled={!account.isActive || isProcessingCredit}
                />
                {creditErrors.description && (
                  <div className="invalid-feedback-transaction">
                    {creditErrors.description}
                  </div>
                )}
              </Form.Group>

              {creditAmount && parseFloat(creditAmount) > 0 && (
                <div className="balance-preview">
                  <div className="balance-preview-label">New Balance After Credit</div>
                  <div className="balance-preview-value balance-preview-positive">
                    {formatCurrency(getCreditPreviewBalance())}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="btn-credit"
                disabled={!account.isActive || isProcessingCredit || !creditAmount}
              >
                {isProcessingCredit ? (
                  <>
                    <Spinner animation="border" size="sm" className="loading-spinner-transaction me-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Credit Account
                  </>
                )}
              </Button>

              {!account.isActive && (
                <div className="text-muted text-center mt-2" style={{ fontSize: '0.875rem' }}>
                  Account must be active to process transactions
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>

        {/* Debit Form */}
        <Card className="transaction-form-card">
          <Card.Header className="transaction-form-header debit-form-header">
            <TrendingDown size={20} />
            Debit Account
          </Card.Header>
          <Card.Body className="transaction-form-body">
            <Form onSubmit={handleDebitSubmit}>
              <Form.Group className="form-group-transaction">
                <Form.Label className="form-label-transaction">
                  <Minus size={16} />
                  Amount to Debit
                </Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={account.balance}
                  value={debitAmount}
                  onChange={(e) => setDebitAmount(e.target.value)}
                  isInvalid={!!debitErrors.amount}
                  placeholder="0.00"
                  className="form-control-transaction"
                  disabled={!account.isActive || isProcessingDebit}
                />
                {debitErrors.amount && (
                  <div className="invalid-feedback-transaction">
                    {debitErrors.amount}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="form-group-transaction">
                <Form.Label className="form-label-transaction">
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={debitDescription}
                  onChange={(e) => setDebitDescription(e.target.value)}
                  isInvalid={!!debitErrors.description}
                  placeholder="Enter transaction description..."
                  className="form-control-transaction"
                  disabled={!account.isActive || isProcessingDebit}
                />
                {debitErrors.description && (
                  <div className="invalid-feedback-transaction">
                    {debitErrors.description}
                  </div>
                )}
              </Form.Group>

              {debitAmount && parseFloat(debitAmount) > 0 && (
                <div className="balance-preview">
                  <div className="balance-preview-label">New Balance After Debit</div>
                  <div className={`balance-preview-value ${
                    getDebitPreviewBalance() >= 0 ? 'balance-preview-positive' : 'balance-preview-negative'
                  }`}>
                    {formatCurrency(getDebitPreviewBalance())}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="btn-debit"
                disabled={!account.isActive || isProcessingDebit || !debitAmount}
              >
                {isProcessingDebit ? (
                  <>
                    <Spinner animation="border" size="sm" className="loading-spinner-transaction me-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Minus size={18} />
                    Debit Account
                  </>
                )}
              </Button>

              {!account.isActive && (
                <div className="text-muted text-center mt-2" style={{ fontSize: '0.875rem' }}>
                  Account must be active to process transactions
                </div>
              )}
            </Form>
          </Card.Body>
        </Card>
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