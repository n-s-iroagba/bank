import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { CreateAccountHolder } from '../../../types/AccountHolder';
import axiosClient from '../../../api/axiosClient';
import { createAccountHolderUrl } from '../../../data/routes';

interface CreateAccountHolderModalProps {
  show: boolean;
  onClose: () => void;
  adminId:number,

}

const CreateAccountHolderModal: React.FC<CreateAccountHolderModalProps> = ({ adminId,show, onClose}) => {
  const [accountHolder, setAccountHolder] = useState<CreateAccountHolder>({
    firstname: '',
    surname: '',
    username: '',
    password: '',
    checkingAccount: {
      balance: 0,
    },
    termDepositAccount: {
      amountDeposited: 0,
      startDate: new Date(),
      durationInDays: 0,
      interestRate: 0,
    },
    transaction: {
      numberOfTransfers: 0,
      transferStartDate: new Date(),
      transferEndDate: new Date(),
      highestTransfer: 0,
      lowestTransfer: 0,
    },
  });
  const [errorMessage,setErrorMessage] = useState('')

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
        [name]: Number(value),
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
    const url = `${axiosClient.defaults.baseURL}${createAccountHolderUrl}/${adminId}`
  try{
   const response = await axiosClient.post(url,accountHolder)
    if (response.status === 201) {
       alert('Account Holder successfully create')
       window.location.reload()
    }
  }catch(error:any){
    console.error(error)
    setErrorMessage('Error contact site owners')
  }
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

          <h5>Transfers</h5>
          <Form.Group controlId="numberOfTransfers">
            <Form.Label>Number of Transfers</Form.Label>
            <Form.Control
              type="number"
              name="numberOfTransfers"
              value={accountHolder.transaction.numberOfTransfers}
              onChange={handleTransactionChange}
            />
          </Form.Group>
          <Form.Group controlId="transferStartDate">
            <Form.Label>Transfer Start Date</Form.Label>
            <Form.Control
              type="date"
              name="transferStartDate"
              value={accountHolder.transaction.transferStartDate.toISOString().split("T")[0]}
              onChange={handleTransactionChange}
            />
          </Form.Group>
          <Form.Group controlId="transferEndDate">
            <Form.Label>Transfer End Date</Form.Label>
            <Form.Control
              type="date"
              name="transferEndDate"
              value={accountHolder.transaction.transferEndDate.toISOString().split("T")[0]}
              onChange={handleTransactionChange}
            />
          </Form.Group>
          <Form.Group controlId="highestTransfer">
            <Form.Label>Highest Transfer</Form.Label>
            <Form.Control
              type="number"
              name="highestTransfer"
              value={accountHolder.transaction.highestTransfer}
              onChange={handleTransactionChange}
            />
          </Form.Group>
          <Form.Group controlId="lowestTransfer">
            <Form.Label>Lowest Transfer</Form.Label>
            <Form.Control
              type="number"
              name="lowestTransfer"
              value={accountHolder.transaction.lowestTransfer}
              onChange={handleTransactionChange}
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
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
    </Modal>
  );
};

export default CreateAccountHolderModal;
