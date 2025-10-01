import { ListGroup, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useState } from 'react';
import {TransactionWithDetails } from "../../types";

const TransactionList: React.FC<{ checkingAccountId: number }> = ({ checkingAccountId }) => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");
const transactions:TransactionWithDetails[] = []

  const handleNavigateToDetail = (transactionId: number) => {
    navigate(`/transaction-detail/${transactionId}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(event.target.value);
  };


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>Transaction History</h4>
        <div>
          <Form.Select className="me-2 d-inline-block w-auto" value={filterType} onChange={handleFilterChange}>
            <option value="">All Types</option>
            <option value="CREDIT">Credit</option>
            <option value="DEBIT">Debit</option>
          </Form.Select>
          <Form.Control
            type="date"
            className="me-2 d-inline-block w-auto"
            value={filterDate}
            onChange={handleDateChange}
            placeholder="Filter by date"
          />
        </div>
      </div>
      <ListGroup>
        {transactions.map((transaction, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
            <div className="w-75">
              <div className="fw-bold">{transaction.type}</div>
              <div>{transaction.secondParty?.name} </div>
           
            </div>
            <div className="text-end" style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div className="text-muted small">{new Date(transaction.date).toDateString()}</div>
              <div className={`fs-5 ${transaction.type === 'debit' ? "text-danger" : ""}`}>
                {transaction.type ? "-" : ""}${transaction.amount}
              </div>
            </div>
            <div className="text-end">
              <Button
                variant="link"
                onClick={() => handleNavigateToDetail(transaction.id)}
                className="text-primary"
              >
                More
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TransactionList;