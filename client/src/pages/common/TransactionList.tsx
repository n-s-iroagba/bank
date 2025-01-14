import { ListGroup, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import {  TransactionType } from "../../types/Transaction";
import useGetTransactions from "../../hooks/useGetTransactions";

const TransactionList: React.FC<{
  checkingAccountId:number
}> = ({checkingAccountId}) => {
  const navigate = useNavigate();
  const transactions = useGetTransactions(checkingAccountId)

  const handleNavigateToDetail = (transactionId: number) => {
    navigate(`/transaction-detail/${transactionId}`);
  };

 

  return (
    <div>
      <h5>Transactions</h5>
      <ListGroup>
        {transactions.map((transaction, index) => (
          <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
            <div className="w-75">
              <div className="fw-bold">{transaction.transactionType}</div>
              <div>{transaction.secondParty?.firstName} {transaction.secondParty?.surname}</div>
              <div className="small fw-bold">SOURCE: {transaction.origin}</div>
            </div>
            <div className="text-end" style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div className="text-muted small">{new Date(transaction.date).toDateString()}</div>
              <div className={`fs-5 ${transaction.transactionType === TransactionType.DEBIT ? "text-danger" : ""}`}>
                {transaction.transactionType === TransactionType.DEBIT ? "-" : ""}${transaction.amount}
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
