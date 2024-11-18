import React, { useState } from "react";
import { Row, Col, Button, Accordion } from "react-bootstrap";
import { TermDepositAccount } from "../../../types/TermDepositAccount";
import UpdateTermDepositModal from "./UpdateTermDepositModal";




const TermDepositAccountAccordion: React.FC<{ account: TermDepositAccount,dividendEarned:number,dividendToBeEarned:number }> = ({ account,dividendEarned,dividendToBeEarned }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);


  const handleSave = (updatedAccount: TermDepositAccount) => {
    console.log("Updated account:", updatedAccount);
    setShowUpdateModal(false);
  };



  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Term Deposit Account ID: {account.id}</Accordion.Header>
          <Accordion.Body>
            <p><strong>Start Date:</strong> {account.startDate.toDateString()}</p>
            <p><strong>End Date:</strong> {(new Date(account.startDate.getTime() + account.durationInDays * 24 * 60 * 60 * 1000)).toDateString()}</p>
            <p><strong>Interest Rate:</strong> {account.interestRate}%</p>
            <p><strong>Amount Deposited:</strong> ${account.amountDeposited}</p>
            <p><strong>Dividend Earned:</strong> ${dividendEarned}</p>
            <p><strong>Dividend yet to be earned: ${dividendToBeEarned}</strong></p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Row>
        <Col lg={3} md={4} sm={12}>
          <Button variant="info" className="w-100 mb-2">
            View Term Deposit Account Details
          </Button>
        </Col>
        <Col lg={3} md={4} sm={12}>
          <Button variant="info" className="w-100 mb-2" onClick={() => setShowUpdateModal(true)}>
            Update Term Deposit Account Details
          </Button>
        </Col>
      </Row>

  
      <UpdateTermDepositModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        account={account}
        onSave={handleSave}
      />

    </>
  );
};

export default TermDepositAccountAccordion;