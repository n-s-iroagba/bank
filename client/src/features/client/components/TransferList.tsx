// src/components/TransfersList.tsx
import React from 'react';
import { ListGroup, Spinner, Alert } from 'react-bootstrap';
import useTransfers from '../hooks/useTranfers';


// Define the Transfer interface
export interface Transfer {
  id: number;
  amount: number;
  date: string; // Date in 'YYYY-MM-DD' format
  description: string;
}

const TransfersList: React.FC = () => {
  const { transfers, loading, error } = useTransfers();

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  // Grouping transfers by date
  const groupedTransfers = transfers.reduce<Record<string, Transfer[]>>((acc, transfer) => {
    // Create a key for each date
    const dateKey = transfer.date;

    // If the date key doesn't exist, create a new array
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    // Push the current transfer into the array for the corresponding date
    acc[dateKey].push(transfer);
    return acc;
  }, {});

  return (
    <ListGroup className='w-100'>
      {Object.entries(groupedTransfers).map(([date, transfers]) => (
        <div key={date}>
          <h5>{date}</h5>
          {transfers.map((transfer) => (
            <ListGroup.Item key={transfer.id}>
              <strong>Amount:</strong> ${transfer.amount} <br />
              <strong>Description:</strong> {transfer.description} <br />
            </ListGroup.Item>
          ))}
        </div>
      ))}
    </ListGroup>
  );
};

export default TransfersList;
 
