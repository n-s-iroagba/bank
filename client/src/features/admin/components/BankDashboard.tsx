import React, { useState } from 'react';
import { Accordion, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link for routing
import { Bank, CreateBank } from '../../../types/Bank';
import { CreateBankModal, UpdateBankModal } from './BankModals';

// Example Bank data
export const banks: Bank[] = [
  {
      id: 1,
      name: 'Bank of America',
      logo: ''
  },
  {
      id: 2,
      name: 'Chase Bank',
      logo: ''
  },
];

const BankDashboard: React.FC = () => {
  const [showUpdateBankModal, setShowUpdateBankModal] = useState<boolean>(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [showCreateBankModal, setShowCreateBankModal] = useState<boolean>(false);

  const handleShowUpdateBank = (bank: Bank) => {
    setSelectedBank(bank);
    setShowUpdateBankModal(true);
  };

  const handleShowCreateBank = () => {
    setShowCreateBankModal(true);
  };

  const handleShowDeleteBank = (bankId: number) => {
    // Handle delete logic here
    console.log(`Deleting bank with id: ${bankId}`);
  };

  return (
    <Container>
      <Button className="mb-3" onClick={handleShowCreateBank}>
        Create Bank
      </Button>
      <div className="container mt-4">
        <Accordion defaultActiveKey="0">
          {banks.map((bank, bankIndex) => (
            <Accordion.Item eventKey={`bank-${bankIndex}`} key={bank.id}>
              <Accordion.Header>{bank.name}</Accordion.Header>
              <Accordion.Body>
                <Link to={`/bank-dashboard/${bank.id}`}>
                  <Button variant="link" className="ms-3">See More</Button>
                </Link>
                <Button variant="link" className="ms-3" onClick={() => handleShowUpdateBank(bank)}>Update Bank</Button>
                <Button variant="link" className="ms-3" onClick={() => handleShowDeleteBank(bank.id)}>Delete Bank</Button>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      {/* Modals */}
      {selectedBank && (
        <UpdateBankModal
                  show={showUpdateBankModal}
                  onClose={() => setShowUpdateBankModal(false)}
                  bankToUpdate={selectedBank}
                  onSubmit={(bankData: Bank) => {
                      console.log('Updating bank data:', bankData);
                      setShowUpdateBankModal(false);
                  } } bank={{
                      id: 0,
                      name: '',
                      logo: ''
                  }} onUpdate={function (updatedBank: Bank): void {
                      throw new Error('Function not implemented.');
                  } }        />
      )}

      <CreateBankModal
              show={showCreateBankModal}
              onClose={() => setShowCreateBankModal(false)}
              onSubmit={(bankData: CreateBank) => {
                  console.log('Creating new bank:', bankData);
                  setShowCreateBankModal(false);
              } } onCreate={function (bank: CreateBank): void {
                  throw new Error('Function not implemented.');
              } }      />
    </Container>
  );
};

export default BankDashboard;
