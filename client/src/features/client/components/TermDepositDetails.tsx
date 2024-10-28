// TermDepositDetails.tsx

import React from 'react';
import { Alert, Card, Col, Row, } from 'react-bootstrap';
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
    <>
    <div className="">
       <h6 className="text-center">Term Deposit Details</h6>
      <Card className="term-deposit-card mb-5">
        <Card.Body>
         
          <Row className=" ">
            <Col className='py-3' xs={4} md={3} lg={2}>
              <div >Date of Deposit:</div>
              <div>{termDeposit.depositDate}</div> 
            </Col>
            <Col className='py-3' xs={4} md={3} lg={2}>
               <div >Date of Payout:</div>
               <div>{termDeposit.payoutDate}</div>
            </Col>
            <Col className='py-3' xs={4} md={3} lg={2}>
               <div >Percentage Yield:</div>
               <div> {termDeposit.percentageYield}%</div>
            </Col>
            <Col className='py-3' xs={4} md={3} lg={2}>
               <div >Tenure:</div>
               <div> {termDeposit.tenure}</div>
            </Col>
            <Col className='py-3' xs={4} md={3} lg={2}>
               <div >Amount:</div>
               <div> {termDeposit.amount}</div>
            </Col>
            <Col className='py-3' xs={4} md={3} lg={2}>
               <div >Account Number:</div>
               <div>{termDeposit.accountNumber}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Alert variant='danger' className='text-center'>Visit Any out branches to unrestrict account.</Alert>
    </div>
   
    </>
  );
};

export default TermDepositDetails;
