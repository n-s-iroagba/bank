import { Button, ListGroup, Modal } from "react-bootstrap";
import { Transaction, TransactionType } from "../../../types/Transaction";

const TransactionModal: React.FC<{
    show: boolean;
    onHide: () => void;
    transactions: Transaction[];
  }> = ({ show, onHide, transactions }) => (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Transactions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {transactions.map((transaction, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
              <div className="w-75">
                <div className="fw-bold">{transaction.transactionType}</div>
                <div>{transaction.secondParty?.firstname} {transaction.secondParty?.surname}</div>
                <div className="small fw-bold">SOURCE: {transaction.origin}</div>
              </div>
              <div className="text-end" style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div className="text-muted small">{new Date(transaction.date).toDateString()}</div>
                <div className={`fs-5 ${transaction.transactionType === TransactionType.DEBIT ? "text-danger" : ""}`}>
                  {transaction.transactionType === TransactionType.DEBIT ? "-" : ""}${transaction.amount}
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
export default TransactionModal