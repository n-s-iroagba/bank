import React, { useState } from "react";
import { Accordion, Button, Modal, Form } from "react-bootstrap";
import { Transaction, TransactionType} from "../../types/Transaction";
import AccountHolderLayout from "../../components/AccountHolderLayout";
import useGetTransactions from "../../hooks/useGetTransactions";


const AdminTransactionList: React.FC = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const {transactions} = useGetTransactions(1)

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowEditModal(true);
  };

  const handleDelete = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDeleteModal(true);
  };

  const saveTransaction = () => {
    // Logic to save the updated transaction
    setShowEditModal(false);
  };

  const confirmDelete = () => {
    // Logic to delete the transaction
    // transactions && setSelectedTransaction(transactions.filter((t) => t.id !== selectedTransaction?.id));
    // setShowDeleteModal(false);
  };

  return (
    <AccountHolderLayout>
      <Accordion>
        {transactions.map((transaction) => (
          <Accordion.Item eventKey={String(transaction.id)} key={transaction.id}>
            <Accordion.Header>
              {transaction.description} - ${transaction.amount.toFixed(2)}
            </Accordion.Header>
            <Accordion.Body>
              <p><strong>Date:</strong> {new Date (transaction.date).toDateString()}</p>
              <p><strong>Type:</strong> {transaction.transactionType}</p>
              <p><strong>Origin:</strong> {transaction.origin || "N/A"}</p>
              <p><strong>Second Party:</strong> {transaction.secondParty.firstName} {transaction.secondParty.surname}</p>
              <p><strong>Account Number:</strong> {transaction.secondParty.accountNumber}</p>
              <Button variant="primary" onClick={() => handleEdit(transaction)}>
                Edit
              </Button>{" "}
              <Button variant="danger" onClick={() => handleDelete(transaction)}>
                Delete
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTransaction && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedTransaction.description}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  defaultValue={selectedTransaction.amount}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Type</Form.Label>
                <Form.Select defaultValue={selectedTransaction.transactionType}>
                  <option value={TransactionType.DEBIT}>Debit</option>
                  <option value={TransactionType.CREDIT}>Credit</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveTransaction}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this transaction?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </AccountHolderLayout>
  );
};

export default AdminTransactionList;
