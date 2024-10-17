import React from 'react';
import { ListGroup } from 'react-bootstrap';
import TransferButton from './TransferButton';

interface Transfer {
  date: string;
  description: string;
  amount: string;
  title: string;
  status: string;
}

const TransferList: React.FC = () => {
  const transfers: Transfer[] = [
    {
      date: '2024-10-10',
      description: 'Payment for Invoice #1234',
      amount: '$500.00',
      title: 'Invoice Payment',
      status: 'Completed',
    },
    {
      date: '2024-10-11',
      description: 'Refund for Order #5678',
      amount: '-$100.00',
      title: 'Refund',
      status: 'Pending',
    },
    {
      date: '2024-10-12',
      description: 'Payment for Invoice #9101',
      amount: '$250.00',
      title: 'Invoice Payment',
      status: 'Failed',
    },
  ];
  return (
    <div>
    
        <>
          <TransferButton/>
          <ListGroup>
            {transfers.map((transfer, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
                <div className="w-75">
                  <div className="d-flex justify-content-between">
                    <div className="fw-bold">{transfer.title}</div>
                  </div>
                  <div>{transfer.description}</div>
                  <div className="small fw-bold" style={{ color: '#6c757d' }}>
                    {transfer.status}
                  </div>
                </div>
                <div className="text-end" style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div className="text-muted small">{transfer.date}</div>
                  <div className="fs-5">{transfer.amount}</div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
   
    </div>
  );
};

export default TransferList;
