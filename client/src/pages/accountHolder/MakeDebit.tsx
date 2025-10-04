import React, { useState } from 'react';
import { Form, Dropdown, ListGroup, Button, Col, Row } from 'react-bootstrap';
import AccountBox from '../../components/accountHolder/AccountBox';
import { useBanks } from '../../hooks/useBank';
import { useSecondParties } from '../../hooks/useSecondParty';
import {  Bank, CreateTransactionRequest, SecondPartyWithBank } from '../../types';
import { useParams } from 'react-router-dom';
import { useCheckingAccount } from '../../hooks/useCheckingAccount';
import { transactionsService } from '../../services/transactionService';
import Logo from '../../components/ui/Logo';

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


const MakeDebit: React.FC = () => {
   const { accountId } = useParams<{ accountId: string }>()
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [show,setShow]= useState(false)
  const [transaction, setTransaction] = useState<CreateTransactionRequest>({
   
    type: 'debit',
    amount: 0,
    description: '',
    checkingAccountId: Number(accountId), // default (you might want to pass this as a prop)
    secondPartyId: 0,
    
  });

  const secondResponse = useSecondParties({});
  const banksResponse = useBanks();
  console.log(secondResponse,banksResponse)
  const banks:Bank[] = banksResponse.data?.data || [];
  const secondParties:SecondPartyWithBank[] = secondResponse.data?.data|| [];

 const accountResponse = useCheckingAccount(Number(accountId))
 const accountDetails = accountResponse.data

  // Find the selected second party and its bank
  const selectedSecondParty = secondParties.find(sp => sp.id === transaction.secondPartyId);
  const selectedBank = selectedSecondParty ? banks.find(bank => bank.id === selectedSecondParty.bankId) : null;

  const handlereceiverClick = (receiver: SecondPartyWithBank) => {
    setTransaction((prev) => ({
      ...prev,
      secondPartyId: receiver.id,
    }));
    
    setSearchTerm(receiver.name);
    setShow(false)
  };

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value) || 0;
    setTransaction((prev) => ({
      ...prev,
      amount,
      
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
    transactionsService.createTransaction(transaction)
  };

  return (
    <Row className="d-flex justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <Form className="px-2 py-5" onSubmit={handleSubmit}>
        <Logo shouldNotDisplay/>

         {accountDetails&& <AccountBox accountName={accountDetails.accountHolder.firstName + ' '+accountDetails.accountHolder.lastName} 
        {...accountDetails} />}
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
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setShow(true)
              }}
              placeholder="BENEFICIARY"
              className="sharp-input"
            />
            {searchTerm && show&& (
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
          {!transaction.secondPartyId ? (
            <Form.Group controlId="bank">
              <Dropdown className="w-100">
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  style={{ width: '100%' }}
                  className="w-100 sharp-input custom-dropdown-toggle"
                >
                  SELECT BANK
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
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              margin: '8px 0'
            }}>
              <img
                src={selectedBank?.logo}
                alt={selectedBank?.name}
                style={{
                  width: '24px',
                  height: '24px',
                  marginRight: '12px',
                  borderRadius: '4px'
                }}
              />
              <span style={{
                color: '#ffffff',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                {selectedBank?.name}
              </span>
            </div>
          )}
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