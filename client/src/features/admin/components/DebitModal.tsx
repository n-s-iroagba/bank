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

const DebitModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [transferDetails, setTransferDetails] = useState<CreateTransaction>({
    amount: 0,
    date: null,
    description: '',
    transactionType: TransactionType.DEBIT,
    secondParty: {
      id: 0,
      firstname: '',
      surname: '',
      bank:  { id: 1, name: 'BANK', logo: '' },
      accountNumber: '',
      canRecieve:false,
      canSend:false,
    },
  });

  const secondPartys: SecondParty[] = [];

  const handleSecondPartyClick = (secondParty: SecondParty) => {
    setTransferDetails(prevDetails => ({
      ...prevDetails,
      secondParty: { ...secondParty },
    }));
    setSearchTerm(`${secondParty.firstname} ${secondParty.surname}`);
  };

  const handleChangesecondParty = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTransferDetails(prevDetails => ({
      ...prevDetails,
      secondParty: {
        ...prevDetails.secondParty,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTransferDetails(prevDetails => ({
      ...prevDetails,
      amount: parseFloat(e.target.value),
    }));
  };

  const handleBankChange = (bankName: string) => {
    const bank = banks.find(b => b.name === bankName);
    bank && setTransferDetails(prevDetails => ({
      ...prevDetails,
      secondParty: {
        ...prevDetails.secondParty,
        bank: bank,
      },
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTransferDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const filteredReceivers = secondPartys.filter(secondParty =>
    (secondParty.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || 
    secondParty.surname.toLowerCase().includes(searchTerm.toLowerCase())) && secondParty.canRecieve
  );

  return (
    <>


      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Debit Your Working Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="px-2 py-5">
            <img className="mb-2" src={logo} alt="greater-texas logo" />

            <Form.Group controlId="amount">
              <Form.Control
                onChange={handleChangeAmount}
                type="number"
                placeholder="AMOUNT"
                className="sharp-input"
                name="account"
              />
            </Form.Group>

            <Form.Group controlId="secondParty" className="mt-3">
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="RECEIVER"
                className="sharp-input"
              />
              {searchTerm && (
                <ListGroup className="dropdown-list">
                  {filteredReceivers.map(secondParty => (
                    <ListGroup.Item
                      key={secondParty.id}
                      onClick={() => handleSecondPartyClick(secondParty)}
                      style={{ cursor: 'pointer' }}
                    >
                      {secondParty.firstname} {secondParty.surname}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Form.Group>

            <Form.Group controlId="bank" className="mt-3">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="sharp-input custom-dropdown-toggle">
                  {transferDetails.secondParty.bank?.name || 'BANK'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {banks.map(bank => (
                    <Dropdown.Item key={bank.id} onClick={() => handleBankChange(bank.name)}>
                      <img src={bank.logo} alt={bank.name} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                      {bank.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group controlId="accountNumber" className="mt-3">
              <Form.Control
                name="accountNumber"
                onChange={handleChangesecondParty}
                value={transferDetails.secondParty.accountNumber}
                type="number"
                placeholder="ACCOUNT NUMBER"
                className="sharp-input"
              />
            </Form.Group>

            <Form.Group controlId="description" className="mt-3">
              <Form.Control
                name="description"
                onChange={handleChange}
                value={transferDetails.description}
                type="text"
                placeholder="DESCRIPTION"
                className="sharp-input"
              />
            </Form.Group>

            <Form.Group controlId="date" className="mt-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={transferDetails.date ? transferDetails.date.toISOString().slice(0, 10) : ''}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button className="button-radius w-100 bg-red mt-4" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DebitModal;
