import React, { useState } from 'react';
import { Form, Dropdown, ListGroup, Button, Col, Row } from 'react-bootstrap';
import logo from '../../assets/images/greater-texas-cu-icon.svg';
import AccountBox from '../../components/accountHolder/AccountBox';
import { useBanks } from '../../hooks/useBank';
import { useSecondParties } from '../../hooks/useSecondParty';
import {  SecondPartyWithBank } from '../../types';

export interface TransactionAttributes {
  id: number;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  checkingAccountId: number;
  secondPartyId: number;
  balanceAfter: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type AccountDetails = {
  accountName: string;
  accountNumber: number;
};

const MakeDebit: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [transaction, setTransaction] = useState<TransactionAttributes>({
    id: 0,
    type: 'debit',
    amount: 0,
    description: '',
    checkingAccountId: 1, // default (you might want to pass this as a prop)
    secondPartyId: 0,
    balanceAfter: 0,
  });

  const secondResponse = useSecondParties({});
  const banksResponse = useBanks();
  const banks = banksResponse.data?.data?.data || [];
  const secondParties = secondResponse.data?.data?.data || [];

  const accountDetails: AccountDetails = {
    accountName: 'Fred Mecury',
    accountNumber: 1234567890,
  };

  const handlereceiverClick = (receiver: SecondPartyWithBank) => {
    setTransaction((prev) => ({
      ...prev,
      secondPartyId: receiver.id,
    }));
    setSearchTerm(receiver.name );
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value) || 0;
    setTransaction((prev) => ({
      ...prev,
      amount,
      balanceAfter: prev.balanceAfter - amount, // simple demo balance update
    }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransaction((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const filteredsecondParties = secondParties.filter(
    (receiver) =>
      receiver.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting Transaction:', transaction);
    // TODO: call API mutation here
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <Form className="px-2 py-5" onSubmit={handleSubmit}>
          <img className="mb-2" src={logo} alt="greater-texas logo" />

          <AccountBox {...accountDetails} />
          <br />

          {/* Amount */}
          <Form.Group controlId="amount">
            <Form.Control
              onChange={handleChangeAmount}
              type="number"
              placeholder="AMOUNT"
              className="sharp-input"
              value={transaction.amount || ''}
            />
          </Form.Group>
          <br />

          {/* Beneficiary */}
          <Form.Group controlId="receiver">
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="BENEFICIARY"
              className="sharp-input"
            />
            {searchTerm && (
              <ListGroup className="dropdown-list">
                {filteredsecondParties.map((receiver) => (
                  <ListGroup.Item
                    key={receiver.id}
                    onClick={() => handlereceiverClick(receiver)}
                    style={{ cursor: 'pointer' }}
                  >
                    {receiver.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form.Group>
          <br />

          {/* Bank selector (optional for UI, not part of TransactionAttributes) */}
          <Form.Group controlId="bank">
            <Dropdown className="w-100">
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                style={{ width: '100%' }}
                className="'w-100 bg-danger sharp-input custom-dropdown-toggle"
              >
                {banks.find((b) => b.id === transaction.secondPartyId)?.name ||
                  'BANK'}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: '100%' }}>
                {banks.map((bank) => (
                  <Dropdown.Item key={bank.id} style={{ width: '100%' }}>
                    <img
                      src={bank.logo}
                      alt={bank.name}
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '8px',
                      }}
                    />
                    {bank.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <br />

          {/* Description */}
          <Form.Group controlId="description">
            <Form.Control
              name="description"
              onChange={handleDescriptionChange}
              value={transaction.description}
              type="text"
              placeholder="DESCRIPTION"
              className="sharp-input"
            />
          </Form.Group>
          <br />

          <Button className="button-radius w-100 bg-red" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default MakeDebit;
