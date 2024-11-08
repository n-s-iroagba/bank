import React from 'react';
import { ListGroup } from 'react-bootstrap';
import TransferButton from './TransferButton';
import { Transaction, TransactionOrigin, TransactionType } from '../../../types/Transaction';

const TransferList: React.FC = () => {
  const transfers: Transaction[] = [
    {
      date: new Date('2024-10-10'),
      description: 'Payment for Invoice #1234',
      amount: 500,
      transactionType: TransactionType.CREDIT,
      id: 0,
      secondParty: {
        firstname: 'Kennedy',
        surname: 'Ogbongedonoo',
        accountNumber: '',
        bank: { id: 0, name: 'aa', logo: '' },
        id: 0,
        canReceive: false,
        canSend: false
      },
      origin: TransactionOrigin.ADMIN
    },
    {
      date: new Date('2024-10-11'),
      description: 'Refund for Order #5678',
      amount: 100,
      transactionType: TransactionType.DEBIT,
      id: 1,
      secondParty: {
        firstname: 'Kennedy',
        surname: 'Ogbongedonoo',
        accountNumber: '',
        bank: { id: 0, name: 'aa', logo: '' },
        id: 0,
        canReceive: false,
        canSend: false
      },
      origin: TransactionOrigin.ADMIN
    },
    {
      date: new Date('2024-10-12'),
      description: 'Payment for Invoice #9101',
      amount: 250,
      transactionType: TransactionType.CREDIT,
      id: 2,
      secondParty: {
        firstname: 'Kennedy',
        surname: 'Ogbongedonoo',
        accountNumber: '',
        bank: { id: 0, name: 'aa', logo: '' },
        id: 0,
        canReceive: false,
        canSend: false
      },
      origin: TransactionOrigin.ADMIN
    },
  ];

  return (
    <div>
      <TransferButton />
      <ListGroup>
        {transfers.map((transfer, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
            <div className="w-75">
              <div className="d-flex justify-content-between">
                <div className="fw-bold">{transfer.transactionType}</div>
              </div>
              <div>{transfer.secondParty.firstname} {transfer.secondParty.surname}</div>
              <div className="small fw-bold">{transfer.secondParty.accountNumber}</div>
            </div>
            <div className="text-end" style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div className="text-muted small">{transfer.date.toDateString()}</div>
              <div 
                className={`fs-5 ${transfer.transactionType === TransactionType.DEBIT ? 'text-danger' : ''}`}
              >
                {transfer.transactionType === TransactionType.DEBIT ? '-' : ''}${transfer.amount}
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TransferList;
