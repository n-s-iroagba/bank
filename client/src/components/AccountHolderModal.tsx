import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { BaseAccountHolder, CreateAccountHolder } from "../types/AccountHolder";
import { createAccountHolder } from "../services/accountHolderService";
import '../styles/Modal.css'

interface AccountHolderModalProps {
  show: boolean;
  onClose: () => void;
  adminId: number;
  accountHolderToBeUpdated?: BaseAccountHolder;
}

const AccountHolderModal: React.FC<AccountHolderModalProps> = ({
  adminId,
  show,
  onClose,
}) => {
  const [accountHolder, setAccountHolder] = useState<CreateAccountHolder>({
    firstName: "",
    surname: "",
    username: "",
    password: "",
    checkingAccount: {
      balance: 0,
    },
    termDepositAccount: {
      amountDeposited: 0,
      depositDate: new Date(),
      payoutDate: new Date(),
      interestRate: 0,
      accountHolderIds: [],
    },
    transaction: {
      numberOfTransfers: 0,
      transferStartDate: new Date(),
      transferEndDate: new Date(),
      highestTransfer: 0,
      lowestTransfer: 0,
    },
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountHolder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckingAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountHolder((prevState) => ({
      ...prevState,
      checkingAccount: {
        ...prevState.checkingAccount,
        [name]: Number(value),
      },
    }));
  };

  const handleTermDepositAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountHolder((prevState) => ({
      ...prevState,
      termDepositAccount: {
        ...prevState.termDepositAccount,
        [name]: name.includes("Date") ? new Date(value) : Number(value),
      },
    }));
  };

  const handleTransactionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountHolder((prevState) => ({
      ...prevState,
      transaction: {
        ...prevState.transaction,
        [name]: name.includes("Date") ? new Date(value) : Number(value),
      },
    }));
  };

  const handleSubmit = async () => {
    const currentDate = new Date();

    // Validation logic
    if (accountHolder.termDepositAccount.depositDate >= currentDate) {
      setErrorMessage("Term Deposit Start Date must be earlier than today.");
      return;
    }
    if (accountHolder.termDepositAccount.payoutDate <= currentDate) {
      setErrorMessage("Term Deposit End Date must be later than today.");
      return;
    }
    if (accountHolder.transaction.transferStartDate >= currentDate) {
      setErrorMessage("Transfer Start Date must be earlier than today.");
      return;
    }

    try {
      await createAccountHolder(adminId, accountHolder);
      alert("Account Holder Created Successfully");
      onClose(); // Close the modal after successful creation
    } catch (error: any) {
      console.error(error);
      setErrorMessage("Error creating account holder. Contact the owner or developer.");
    }
  };

  return (
    <Modal style={{zIndex:'1000'}} show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account Holder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Input fields for accountHolder details */}
          <Form.Group className="mb-3" controlId="formFirstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={accountHolder.firstName}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={accountHolder.surname}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={accountHolder.username}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={accountHolder.password}
              onChange={handleInputChange}
            />
          </Form.Group>

          <h3> Checking Account Details</h3>
          <Form.Group className="mb-3" controlId="formCheckingBalance">
            <Form.Label>Checking Account Balance</Form.Label>
            <Form.Control
              type="number"
              name="balance"
              value={accountHolder.checkingAccount.balance}
              onChange={handleCheckingAccountChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCheckingBalance">
            <Form.Label>Number of Transfers</Form.Label>
            <Form.Control
              type="number"
              name="numberOfTransfers"
              value={accountHolder.transaction.numberOfTransfers}
              onChange={handleTransactionChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTransferStartDate">
            <Form.Label>Transfer Start Date</Form.Label>
            <Form.Control
              type="date"
              name="transferStartDate"
              value={accountHolder.transaction.transferStartDate.toISOString().split("T")[0]}
              onChange={handleTransactionChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTransferEndDate">
            <Form.Label>Transfer End Date</Form.Label>
            <Form.Control
              type="date"
              name="transferEndDate"
              value={accountHolder.transaction.transferEndDate.toISOString().split("T")[0]}
              onChange={handleTransactionChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formHighestTransfer">
            <Form.Label>Highest Transfer Amount</Form.Label>
            <Form.Control
              type="number"
              name="highestTransfer"
              value={accountHolder.transaction.highestTransfer}
              onChange={handleTransactionChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLowestTransfer">
            <Form.Label>Lowest Transfer Amount</Form.Label>
            <Form.Control
              type="number"
              name="lowestTransfer"
              value={accountHolder.transaction.lowestTransfer}
              onChange={handleTransactionChange}
            />
          </Form.Group>

         <h3>Term Deposit Account Details</h3>
         <Form.Group className="mb-3" controlId="formDepositDate">
            <Form.Label>Amount Deposited </Form.Label>
            <Form.Control
              type="number"
              name="amountDeposited"
              value={accountHolder.termDepositAccount.amountDeposited}
              onChange={handleTermDepositAccountChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDepositDate">
            <Form.Label>Interest Rate</Form.Label>
            <Form.Control
              type="number"
              name="interestRate"
              value={accountHolder.termDepositAccount.interestRate}
              onChange={handleTermDepositAccountChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDepositDate">
            <Form.Label>Deposit Date</Form.Label>
            <Form.Control
              type="date"
              name="depositDate"
              value={accountHolder.termDepositAccount.depositDate.toISOString().split("T")[0]}
              onChange={handleTermDepositAccountChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPayoutDate">
            <Form.Label>Payout Date</Form.Label>
            <Form.Control
              type="date"
              name="payoutDate"
              value={accountHolder.termDepositAccount.payoutDate.toISOString().split("T")[0]}
              onChange={handleTermDepositAccountChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Account Holder
        </Button>
      </Modal.Footer>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </Modal>
  );
};

export default AccountHolderModal;
