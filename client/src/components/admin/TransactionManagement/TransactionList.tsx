import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { TrendingUp, TrendingDown, Calendar, ArrowRight, DollarSign } from "lucide-react";
import "../../../styles/TransactionList.css";
import { TransactionWithDetails } from "../../../types";
import {useTransactions } from "../../../hooks/useTransaction";

const TransactionList: React.FC<{ checkingAccountId: number }> = ({ checkingAccountId }) => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");

const transactionsResponse = useTransactions(checkingAccountId as number,{page:1,limit:10})

  const transactions:TransactionWithDetails[]=
  transactionsResponse?.data?.data||
  []

  const handleNavigateToDetail = (transactionId: number) => {
    navigate(`/transaction-detail/${transactionId}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(event.target.value);
  };
// Filtered transactions based on type & date
const filteredTransactions = transactions.filter((transaction) => {
  let matchesType = true;
  let matchesDate = true;

  if (filterType) {
    matchesType = transaction.type === filterType;
  }

  if (filterDate) {
    const txDate = new Date(transaction.createdAt).toISOString().split("T")[0]; 
    matchesDate = txDate === filterDate;
  }

  return matchesType && matchesDate;
});

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionIcon = (type: "credit" | "debit") => {
    return type === "credit" ? (
      <TrendingUp size={20} className="text-white" />
    ) : (
      <TrendingDown size={20} className="text-white" />
    );
  };

  return (
    <div className="transaction-list-component">
      {/* Header Section */}
      <div className="transaction-list-header">
        <h4 className="transaction-list-title">
          <DollarSign size={24} />
          Transaction History
        </h4>
        <div className="filter-controls">
          <Form.Select
            className="filter-select"
            value={filterType}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </Form.Select>
          <Form.Control
            type="date"
            className="filter-date"
            value={filterDate}
            onChange={handleDateChange}
            placeholder="Filter by date"
          />
        </div>
      </div>

      {/* Transaction List */}
      <div className="transaction-list-container">
        {filteredTransactions.length === 0 ? (
          <div className="empty-state">
            <DollarSign size={48} className="empty-state-icon" />
            <div className="empty-state-text">No Transactions Found</div>
            <div className="empty-state-subtext">
              {filterType || filterDate
                ? "No transactions match your current filters. Try adjusting your search criteria."
                : "There are no transactions to display for this account."}
            </div>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              {/* Transaction Icon */}
              <div
                className={`transaction-icon ${
                  transaction.type === "credit" ? "credit" : "debit"
                }`}
              >
                {getTransactionIcon(transaction.type)}
              </div>

              {/* Transaction Details */}
              <div className="transaction-content">
                <div className="transaction-details">
                  <div className="transaction-type mb-1">
                    {transaction.type.toUpperCase()}
                  </div>
                  <div className="transaction-description">
                    {transaction.description}
                  </div>
                  <div className="transaction-balance">
                    Balance After: {formatCurrency(transaction.balanceAfter)}
                  </div>
                </div>
              </div>

              {/* Transaction Amount & Date */}
              <div className="transaction-meta">
                <div className="transaction-date">
                  <Calendar size={12} className="me-1" />
                  {formatDate(transaction.createdAt)}
                </div>
                <div
                  className={`transaction-amount ${
                    transaction.type === "credit" ? "credit" : "debit"
                  }`}
                >
                  {transaction.type === "credit" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </div>
                  <div className="transaction-party">
                    {transaction.secondParty?.name || 'Internal Transfer'}
                  </div>
              </div>

              {/* Action Button */}
              <Button
                variant="outline"
                onClick={() => handleNavigateToDetail(transaction.id)}
                className="btn-transaction-detail"
              >
                Details
                <ArrowRight size={14} />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;
