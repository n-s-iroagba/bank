import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateAccountHolder } from '../../../types/AccountHolder';


interface CreateAccountHolderModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (accountHolderData: CreateAccountHolder) => void;
}

const CreateAccountHolderModal: React.FC<CreateAccountHolderModalProps> = ({ show, onClose, onSubmit }) => {
  const [accountHolder, setAccountHolder] = useState<CreateAccountHolder>({
    firstname: '',
    surname: '',
    username: '',
    password: '',
    checkingAccount: {
      balance: 0,
      numberOfTransfers: 0,
      transferStartDate: new Date(),
      transferEndDate: new Date(),
      highestTransfer: 0,
      lowestTransfer: 0,
    },
    termDepositAccount: {
      amountDeposited: 0,
      startDate: new Date(),
      durationInDays: 0,
      interestRate: 0,
    }
  });

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
        [name]: value,
      }
    }));
  };

  const handleTermDepositAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountHolder((prevState) => ({
      ...prevState,
      termDepositAccount: {
        ...prevState.termDepositAccount,
        [name]: value,
      }
    }));
  };

  const handleSubmit = () => {
    onSubmit(accountHolder);
    setAccountHolder({
      firstname: '',
      surname: '',
      username: '',
      password: '',
      checkingAccount: {
        balance: 0,
        numberOfTransfers: 0,
        transferStartDate: new Date(),
        transferEndDate: new Date(),
        highestTransfer: 0,
        lowestTransfer: 0,
      },
      termDepositAccount: {
        amountDeposited: 0,
        startDate: new Date(),
        durationInDays: 0,
        interestRate: 0,
      }
    });
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Account Holder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formFirstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              value={accountHolder.firstname}
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

          <h5>Checking Account</h5>
          <Form.Group className="mb-3" controlId="formBalance">
            <Form.Label>Balance</Form.Label>
            <Form.Control
              type="number"
              name="balance"
              value={accountHolder.checkingAccount.balance}
              onChange={handleCheckingAccountChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNumberOfTransfers">
            <Form.Label>Number of Transfers</Form.Label>
            <Form.Control
              type="number"
              name="numberOfTransfers"
              value={accountHolder.checkingAccount.numberOfTransfers}
              onChange={handleCheckingAccountChange}
            />
          </Form.Group>

          <h5>Term Deposit Account</h5>
          <Form.Group className="mb-3" controlId="formAmountDeposited">
            <Form.Label>Amount Deposited</Form.Label>
            <Form.Control
              type="number"
              name="amountDeposited"
              value={accountHolder.termDepositAccount.amountDeposited}
              onChange={handleTermDepositAccountChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formInterestRate">
            <Form.Label>Interest Rate</Form.Label>
            <Form.Control
              type="number"
              name="interestRate"
              value={accountHolder.termDepositAccount.interestRate}
              onChange={handleTermDepositAccountChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDurationInDays">
            <Form.Label>Duration (Days)</Form.Label>
            <Form.Control
              type="number"
              name="durationInDays"
              value={accountHolder.termDepositAccount.durationInDays}
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
    </Modal>
  );
};

export default CreateAccountHolderModal;
