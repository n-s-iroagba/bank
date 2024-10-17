// TermDepositDetails.tsx

import React from 'react';
import { Card, ListGroup, } from 'react-bootstrap';
import '../styles/TermDepositDetails.css'; // Ensure to import your CSS file

interface TermDeposit {
  depositDate: string;
  payoutDate: string;
  percentageYield: number;
  tenure: string;
  amount: string;
  accountNumber: string;
}

const TermDepositDetails: React.FC = () => {
  // Dummy data for term deposit details
  const termDeposit: TermDeposit = {
    depositDate: '2024-01-15',
    payoutDate: '2024-12-15',
    percentageYield: 5.5,
    tenure: '12 Months',
    amount: '$10,000.00',
    accountNumber: 'TD-123456789',
  };

  return (
    <div className="term-deposit-container">
      <Card className="term-deposit-card">
        <Card.Body>
          <Card.Title className="text-center text-light">Term Deposit Details</Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <span className="fw-bold">Date of Deposit:</span> {termDeposit.depositDate}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="fw-bold">Date of Payout:</span> {termDeposit.payoutDate}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="fw-bold">Percentage Yield:</span> {termDeposit.percentageYield}%
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="fw-bold">Tenure:</span> {termDeposit.tenure}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="fw-bold">Amount:</span> {termDeposit.amount}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="fw-bold">Account Number:</span> {termDeposit.accountNumber}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TermDepositDetails;
