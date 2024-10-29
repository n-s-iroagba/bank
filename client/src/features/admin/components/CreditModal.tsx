import React, { useState } from 'react';
import { Form, Dropdown, ListGroup, Button, Modal } from 'react-bootstrap';

import '../styles/MakeTransfer.css'; 
import logo from '../assets/greater-texas-cu-logo.svg';
import { SecondParty } from '../../common/types/SecondParty';
import { Bank } from '../../common/types/Bank';
import { CreateTransaction } from '../../common/types/CreateTransaction';
import { TransactionType } from '../../common/types/TransactionType';

const banks: Bank[] = [
  { id: 1, name: 'Bank A', logo: 'path/to/logoA.png' },
  { id: 2, name: 'Bank B', logo: 'path/to/logoB.png' },
  { id: 3, name: 'Bank C', logo: 'path/to/logoC.png' },
];

const CreditModal: React.FC = () => {
  const [show, setShow] = useState(false); // Control modal visibility
  const [searchTerm, setSearchTerm] = useState('');
  const [transferDetails, setTransferDetails] = useState<CreateTransaction>({
    amount: 0,
    date: null,
    description: '',
    transactionType: TransactionType.CREDIT,
    secondParty: {
      id: 0,
      firstname: '',
      surname: '',
      bank: { id: 0, name: 'BANK', logo: '' },
      accountNumber: '',
      canRecieve: false,
      canSend: false
    },
  });

  const secondPartys: SecondParty[] = [];
  const handleClose = () => setShow(false);


  const handleSecondPartyClick = (secondParty: SecondParty) => {
    setTransferDetails(prevDetails => ({
      ...prevDetails,
      secondParty: secondParty
    }));
    setSearchTerm(secondParty.firstname + ' ' + secondParty.surname);
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

  const filteredSenders = secondPartys.filter(secondParty =>
    (secondParty.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || 
    secondParty.surname.toLowerCase().includes(searchTerm.toLowerCase())) && secondParty.canSend
  );

  return (
    <>
   
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Credit Your Working Account</Modal.Title>
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
                      {secondParty.firstname}{' '}{secondParty.surname}
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

export default CreditModal;
