import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { ArrowLeft, TrendingUp, TrendingDown, Calendar} from "lucide-react";
import { TransactionWithDetails } from "../../types";
import { useTransaction } from "../../hooks/useTransaction";

const TransactionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch transaction by ID
  const { data, isLoading, isError } = useTransaction(Number(id));
  const transaction: TransactionWithDetails | undefined = data;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionIcon = (type: "credit" | "debit") =>
    type === "credit" ? (
      <TrendingUp size={40} className="text-success" />
    ) : (
      <TrendingDown size={40} className="text-danger" />
    );

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (isError || !transaction) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center py-5">
        <h5 className="text-danger">Transaction not found</h5>
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} className="me-1" />
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Button
        variant="outline-secondary"
        className="mb-3"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} className="me-1" />
        Back
      </Button>

      <Card className="shadow-sm">
        <Card.Header className="d-flex align-items-center">
          {getTransactionIcon(transaction.type)}
          <h5 className="ms-2 mb-0">Transaction Details</h5>
        </Card.Header>

        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <h6 className="text-muted">Type</h6>
              <p className="fw-bold text-capitalize">{transaction.type}</p>
            </Col>
            <Col md={6}>
              <h6 className="text-muted">Amount</h6>
              <p
                className={`fw-bold ${
                  transaction.type === "credit" ? "text-success" : "text-danger"
                }`}
              >
                {transaction.type === "credit" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <h6 className="text-muted">Description</h6>
              <p>{transaction.description}</p>
            </Col>
            <Col md={6}>
              <h6 className="text-muted">Balance After</h6>
              <p>{formatCurrency(transaction.balanceAfter)}</p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <h6 className="text-muted">Date</h6>
              <p>
                <Calendar size={14} className="me-1" />
                {formatDate(transaction.createdAt)}
              </p>
            </Col>
            <Col md={6}>
              <h6 className="text-muted">Account Number</h6>
              <p>{transaction.checkingAccount.accountNumber}</p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <h6 className="text-muted">Account Holder</h6>
              <p>
                {transaction.checkingAccount.accountHolder.firstName}{" "}
                {transaction.checkingAccount.accountHolder.lastName} <br />
                <small className="text-muted">
                  {transaction.checkingAccount.accountHolder.user.email}
                </small>
              </p>
            </Col>
            <Col md={6}>
              <h6 className="text-muted">Second Party</h6>
              <p>
                {transaction.secondParty.name} <br />
                <small className="text-muted">{transaction.secondParty.details}</small>
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={12} className="d-flex align-items-center">
              {transaction.secondParty.bank?.logo && (
                <img
                  src={transaction.secondParty.bank.logo}
                  alt={transaction.secondParty.bank.name}
                  style={{ width: 40, height: 40, objectFit: "contain" }}
                  className="me-2"
                />
              )}
              <span>{transaction.secondParty.bank.name}</span>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TransactionDetails;
