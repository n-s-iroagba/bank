
import React, { useState } from 'react';
import { Form, Dropdown, ListGroup, Button, Col, Row } from 'react-bootstrap';
import AccountBox from '../../components/AccountBox';

import { SecondParty } from '../../types/SecondParty';
import { CreateTransaction, TransactionType } from '../../types/Transaction';
import logo from '../../assets/images/greater-texas-cu-icon.svg'
import useSecondParty from '../../hooks/useSecondParty';
import useBanks from '../../hooks/useBanks';



type AccountDetails={
  accountName: string
  accountNumber:number;

}




const MakeDebit: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [transferDetails, setTransferDetails] = useState<CreateTransaction>({
    amount: 0,
    date: new Date(),
    description: '',
    transactionType:TransactionType.DEBIT,
    secondParty: {
      id: 0,
      firstName: '',
      surname:'',
      bank:{ id: 0, name: 'BANK', logo: '',listerId:'' },
      accountNumber: '',
    },
  });
  const {secondParties} = useSecondParty(1);
  const {banks} = useBanks()
  const accountDetails:AccountDetails = {
    accountName:'Fred Mecury',
    accountNumber: 1234567890,
  }

 
  // const { banks, loading, error } = useBanks();
  const handlereceiverClick = (receiver: SecondParty) => {
    setTransferDetails(prevDetails => ({
      ...prevDetails,
       receiver: receiver
     }));
    setSearchTerm(receiver.firstName+' '+receiver.surname);
    
    // Correctly update the 'receiver' field inside 'transferDetails'
    setTransferDetails(prevDetails => ({
      ...prevDetails,
      receiver: { ...receiver }
    }));
  };
  const handleChangereceiver = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setTransferDetails(prevDetails => ({
      ...prevDetails,
      receiver: {
        ...prevDetails.secondParty, // Keep the existing receiver details
        [e.target.name]: e.target.value // Update the specific field based on the input name
      }
    }));
  };
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {

    setTransferDetails(prevDetails => ({
     ...prevDetails,
      amount: parseFloat(e.target.value)
    }));
  }
  
  const handleBankChange = (bankName: string) => {
    const bank = banks.find(b => b.name === bankName) || null;
    setTransferDetails(prevDetails => ({
      ...prevDetails,
      receiver: {
        ...prevDetails.secondParty,
        bank: bank
      }
    }));
  };
  
  const filteredsecondParties = secondParties.filter(receiver =>
    (receiver.firstName.toLowerCase().includes(searchTerm.toLowerCase())|| receiver.surname.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Row className='d-flex justify-content-center'>
        <Col xs={12} md={8} lg={6}>
    <Form className='px-2 py-5'>

    <img className='mb-2' src={logo} alt='greater-texas logo'/>
    
      <AccountBox 
       
        {...accountDetails}
      />
  <br/>
      <Form.Group controlId="receiver">
      <Form.Group controlId="amount">
       
        <Form.Control 
        onChange={(e)=>handleChangeAmount(e)}
        type="number" placeholder="AMOUNT" className="sharp-input"
        name='account'
        />
      </Form.Group>
      <br/>
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="BENEFICIARY"
          className="sharp-input" // Add class for styling
        />
        {searchTerm && (
          <ListGroup className="dropdown-list">
            {filteredsecondParties.map((receiver) => (
              <ListGroup.Item
                key={receiver.id}
                onClick={() => handlereceiverClick(receiver)}
                style={{ cursor: 'pointer' }}
              >
                {receiver.firstName}{' '}{receiver.surname}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Form.Group>
      <br/>
      <Form.Group  className='w-100 bg-danger' controlId="bank">
      <Dropdown className='w-100'>
    <Dropdown.Toggle    variant="light" id="dropdown-basic" style={{width:'100%'}}className="'w-100 bg-danger sharp-input custom-dropdown-toggle">
      {transferDetails.secondParty.bank?.name || 'BANK'}
    </Dropdown.Toggle>
    <Dropdown.Menu
    style={{width:'100%'}}
    >
      {banks.map((bank) => (
        <Dropdown.Item
          key={bank.id}
          onClick={() => handleBankChange(bank.name)}
          style={{width:'100%'}}
        >
          <img src={bank.logo} alt={bank.name} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          {bank.name}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
      </Form.Group>
      <br/>
      <Form.Group controlId="amount">
      
        <Form.Control 
        name='accountNumber'
        onChange={(e)=>handleChangereceiver(e)}
        value={transferDetails.secondParty.accountNumber}
        type="number" placeholder="receiver ACCOUNT NUMBER" className="sharp-input" />
      </Form.Group>

      <Form.Group controlId="amount">
      <br/>
      <Form.Control 
      name='description'
      
      value={transferDetails.description}
      type="text" placeholder="DESCRIPTION" className="sharp-input" />
    </Form.Group>
      
<br/>
      <Button className='button-radius w-100 bg-red' type="submit">
        Submit
      </Button>
    </Form>
    </Col>
    </Row>
  );
};

export default MakeDebit;
