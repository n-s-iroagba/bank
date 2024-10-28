// MakeTransfers.tsx
import React, { useState } from 'react';
import { Form, Dropdown, ListGroup, Button } from 'react-bootstrap';
import AccountBox from './AccountBox';
import '../styles/MakeTransfer.css'; 
import logo from '../assets/greater-texas-cu-logo.svg'

interface Beneficiary {
  id: number;
  name: string;
  bank: string|null;
  accountNumber: string;
  logo: string; // URL for the bank logo
}


interface TransferDetails{
  beneficiary:Beneficiary;
  amount: number;
  date:any;
  description: string;
}
//ADD beneficiaries
const beneficiaries: Beneficiary[] = [
  { id: 1, name: 'John Doe', bank: 'Bank A', accountNumber: '123456789', logo: 'path/to/logoA.png' },
  { id: 2, name: 'Jane Smith', bank: 'Bank B', accountNumber: '987654321', logo: 'path/to/logoB.png' },
  { id: 3, name: 'Alice Johnson', bank: 'Bank C', accountNumber: '456123789', logo: 'path/to/logoC.png' },
];

const banks = [
  { id: 1, name: 'Bank A', logo: 'path/to/logoA.png' },
  { id: 2, name: 'Bank B', logo: 'path/to/logoB.png' },
  { id: 3, name: 'Bank C', logo: 'path/to/logoC.png' },
];

const MakeTransfers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transferDetails, setTransferDetails] = useState<TransferDetails>({
    beneficiary: { 
      id: 0, 
      name: '', 
      bank: null,
      accountNumber: '',
      logo: ''
    },
    amount: 0,
    description:'',
    date:new Date(),
  });
  // const { banks, loading, error } = useBanks();
  const handleBeneficiaryClick = (beneficiary: Beneficiary) => {
    setTransferDetails(prevDetails => ({
      ...prevDetails,
       beneficiary: beneficiary
     }));
    setSearchTerm(beneficiary.name);
    
    // Correctly update the 'beneficiary' field inside 'transferDetails'
    setTransferDetails(prevDetails => ({
      ...prevDetails,
      beneficiary: { ...beneficiary }
    }));
  };
  const handleChangeBeneficiary = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setTransferDetails(prevDetails => ({
      ...prevDetails,
      beneficiary: {
        ...prevDetails.beneficiary, // Keep the existing beneficiary details
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
    setTransferDetails(prevDetails => ({
      ...prevDetails,
      beneficiary: {
        ...prevDetails.beneficiary,
        bank: bankName
      }
    }));
  };
  const filteredBeneficiaries = beneficiaries.filter(beneficiary =>
    beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Form className='px-2 py-5'>

    <img className='mb-2' src={logo} alt='greater-texas logo'/>
    
      <AccountBox 
       
        accountNumber={'000'}
      />
  <br/>
      <Form.Group controlId="beneficiary">
      <Form.Group controlId="amount">
       
        <Form.Control 
        onChange={(e)=>handleChangeAmount(e)}
        type="number" placeholder="AMOUNT" className="sharp-input"
        name='account'
        />
      </Form.Group>
      <br/>
        <Form.Label>Frequent Beneficiaries</Form.Label>
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type beneficiary name..."
          className="sharp-input" // Add class for styling
        />
        {searchTerm && (
          <ListGroup className="dropdown-list">
            {filteredBeneficiaries.map((beneficiary) => (
              <ListGroup.Item
                key={beneficiary.id}
                onClick={() => handleBeneficiaryClick(beneficiary)}
                style={{ cursor: 'pointer' }}
              >
                {beneficiary.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Form.Group>
      <br/>
      <Form.Group controlId="bank">
      <Dropdown>
    <Dropdown.Toggle variant="light" id="dropdown-basic" className="sharp-input custom-dropdown-toggle">
      {transferDetails.beneficiary.bank || 'BANK'}
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
        onChange={(e)=>handleChangeBeneficiary(e)}
        value={transferDetails.beneficiary.accountNumber}
        type="number" placeholder="BENEFICIARY ACCOUNT NUMBER" className="sharp-input" />
      </Form.Group>

      <Form.Group controlId="amount">
      
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

export default MakeTransfers;
