import React, { useState } from 'react';
import { Form, Dropdown, ListGroup, Button, Modal, Spinner, Alert } from 'react-bootstrap';

import logo from '../assets/images/greater-texas-cu-icon.svg';
import useSecondParty from '../hooks/useSecondParty';
import { Bank } from '../types/Bank';
import { SecondParty } from '../types/SecondParty';
import { CreateTransaction, TransactionType } from '../types/Transaction';
import useBanks from '../hooks/useBanks';


interface CreditDebitModalProps {
  show: boolean;
  onHide: () => void;
  type: "credit" | "debit" | null;
  isTransferVisible: boolean;
  checkingAccountId:number;

}

const CreditDebitModal: React.FC<CreditDebitModalProps> = ({ show, onHide, type, isTransferVisible,checkingAccountId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const {banks} = useBanks()
  const [transferDetails, setTransferDetails] = useState<CreateTransaction>({
    amount: 0,
    date: new Date(),
    description: '',
    transactionType: TransactionType.CREDIT,
    secondParty: {
      id: 0,
      firstName: '',
      surname: '',
      bank: { id: 0, name: 'BANK', logo: '',listerId:'' },
      accountNumber: '',
    },
  });

  const {secondParties,secondPartyLoading,secondPartyError} =  useSecondParty(checkingAccountId)



  const handleSecondPartyClick = (secondParty: SecondParty) => {
    setTransferDetails(prevDetails => ({
      ...prevDetails,
      secondParty: secondParty
    }));
    setSearchTerm(secondParty.firstName + ' ' + secondParty.surname);
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTransferDetails(prevDetails => ({
      ...prevDetails,
      amount: parseFloat(e.target.value)
    }));
  };

  const handleBankChange = (bankName: string) => {
    const bank = banks.find(b => b.name === bankName);
    bank && setTransferDetails(prevDetails => ({
      ...prevDetails,
      secondParty: {
        ...prevDetails.secondParty,
        bank: bank
      }
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTransferDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const filteredSenders = secondParties.filter(secondParty =>
    (secondParty.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    secondParty.surname.toLowerCase().includes(searchTerm.toLowerCase())) 
  );

  if(secondPartyLoading){
    return <Spinner title='loading...'/>
  }
  if(secondPartyError){
    return <Alert variant='danger'>Sorry and error occured contact site owner</Alert>
  }

  return (
    <>
   
      
   <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{type === "credit" ? "Credit Account" : "Debit Account"}</Modal.Title>
        <p>Transfer visibility: {isTransferVisible ? "Visible Transfer" : "Invisible Transfer"}</p>
      </Modal.Header>
        <Modal.Body>
          <Form className='px-2 py-5'>
            <img className='mb-2' src={logo} alt='greater-texas logo'/>
            <Form.Group controlId="secondParty">
              <Form.Group controlId="amount">
                <Form.Control
                  onChange={(e) => handleChangeAmount(e)}
                  type="number"
                  placeholder="AMOUNT"
                  className="sharp-input"
                  name='account'
                />
              </Form.Group>
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="SENDER"
                className="sharp-input"
              />
              {searchTerm && (
                <ListGroup className="dropdown-list">
                  {filteredSenders.map((secondParty) => (
                    <ListGroup.Item
                      key={secondParty.id}
                      onClick={() => handleSecondPartyClick(secondParty)}
                      style={{ cursor: 'pointer' }}
                    >
                      {secondParty.firstName}{' '}{secondParty.surname}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Form.Group>
            <Form.Group controlId="bank">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="sharp-input custom-dropdown-toggle">
                  {transferDetails.secondParty.bank.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {banks.map((bank) => (
                    <Dropdown.Item
                      key={bank.id}
                      onClick={() => handleBankChange(bank.name)}
                    >
                      <img src={bank.logo} alt={bank.name} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                      {bank.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Control
                name='accountNumber'
                onChange={(e) => handleChange(e)}
                value={transferDetails.secondParty.accountNumber}
                type="number"
                placeholder=" ACCOUNT NUMBER"
                className="sharp-input"
              />
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Control
                name='description'
                onChange={(e) => handleChange(e)}
                value={transferDetails.description}
                type="text"
                placeholder="DESCRIPTION"
                className="sharp-input"
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={transferDetails.date?.toDateString() || ''}
                onChange={(e) => handleChange(e)}
                required
              />
            </Form.Group>
            <Button className='button-radius w-100 bg-red' type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};



export default CreditDebitModal;
