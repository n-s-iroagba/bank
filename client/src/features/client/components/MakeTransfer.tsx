// MakeTransfers.tsx
import React, { useState } from 'react';
import { Form, Dropdown, ListGroup, Button } from 'react-bootstrap';
import AccountBox from './AccountBox';
import '../styles/MakeTransfer.css'; 
import logo from '../assets/greater-texas-cu-logo.svg'

interface Beneficiary {
  id: number;
  name: string;
  bank: string;
  accountNumber: string;
  logo: string; // URL for the bank logo
}

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
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState<string>(''); // Storing the selected bank name
  

  const handleBeneficiaryClick = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setSearchTerm(beneficiary.name); // Populate the input with the selected beneficiary's name
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
       
        <Form.Control type="number" placeholder="AMOUNT" className="sharp-input" />
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
      {selectedBeneficiary?.bank || selectedBank || 'BANK'}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {banks.map((bank) => (
        <Dropdown.Item
          key={bank.id}
          onClick={() => setSelectedBank(bank.name)}
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
        value={selectedBeneficiary?.accountNumber||''}
        type="number" placeholder="BENEFICIARY ACCOUNT NUMBER" className="sharp-input" />
      </Form.Group>
<br/>
      <Button className='button-radius w-100 bg-red' type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default MakeTransfers;
