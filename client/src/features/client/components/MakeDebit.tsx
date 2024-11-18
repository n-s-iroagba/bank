
import React, { useState } from 'react';
import { Form, Dropdown, ListGroup, Button } from 'react-bootstrap';
import AccountBox from './AccountBox';
import '../styles/MakeTransfer.css'; 
import logo from '../../../assets/images/greater-texas-cu-logo.svg'
import { CreateTransaction, TransactionType } from '../../../types/Transaction';
import { Bank } from '../../../types/Bank';
import { SecondParty } from '../../../types/SecondParty';


type AccountDetails={
  accountName: string
  accountNumber:number;

}


const banks:Bank[] = [
  { id: 1, name: 'Bank A', logo: 'path/to/logoA.png' },
  { id: 2, name: 'Bank B', logo: 'path/to/logoB.png' },
  { id: 3, name: 'Bank C', logo: 'path/to/logoC.png' },
];

const MakeDebit: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [transferDetails, setTransferDetails] = useState<CreateTransaction>({
    amount: 0,
    date: new Date(),
    description: '',
    transactionType:TransactionType.DEBIT,
    secondParty: {
      id: 0,
      firstname: '',
      surname:'',
      bank:{ id: 0, name: 'BANK', logo: '' },
      accountNumber: '',
      canReceive: true,
      canSend: false,
    },
  });
  const accountDetails:AccountDetails = {
    accountName:'Fred Mecury',
    accountNumber: 1234567890,
  }
  const receivers:SecondParty[]=[]
  // const { banks, loading, error } = useBanks();
  const handlereceiverClick = (receiver: SecondParty) => {
    setTransferDetails(prevDetails => ({
      ...prevDetails,
       receiver: receiver
     }));
    setSearchTerm(receiver.firstname+' '+receiver.surname);
    
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
  
  const filteredReceivers = receivers.filter(receiver =>
    (receiver.firstname.toLowerCase().includes(searchTerm.toLowerCase())|| receiver.surname.toLowerCase().includes(searchTerm.toLowerCase())) && receiver.canReceive
  );

  return (
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
            {filteredReceivers.map((receiver) => (
              <ListGroup.Item
                key={receiver.id}
                onClick={() => handlereceiverClick(receiver)}
                style={{ cursor: 'pointer' }}
              >
                {receiver.firstname}{' '}{receiver.surname}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Form.Group>
      <br/>
      <Form.Group controlId="bank">
      <Dropdown>
    <Dropdown.Toggle variant="light" id="dropdown-basic" className="sharp-input custom-dropdown-toggle">
      {transferDetails.secondParty.bank?.name || 'BANK'}
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
  );
};

export default MakeDebit;
