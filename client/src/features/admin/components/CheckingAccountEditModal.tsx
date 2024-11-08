import { useState } from "react";
import { Modal, Button,Form } from "react-bootstrap";
import { EditCheckingAccount } from "../../../types/CheckingAccount";

const CheckingAccountEditModal: React.FC<{
  show: boolean;
  onHide: () => void;
editId: number;
  onSave: (updatedAccount: EditCheckingAccount) => void;
}> = ({ show, onHide, editId, onSave }) => {
  const [editedAccount, setEditedAccount] = useState<EditCheckingAccount>({
    accountNumber:0,
    balance: 0,

  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedAccount(prev => ({
      ...prev,
      [name]: name === "balance" || name.includes("Transfer") ? parseFloat(value) : value
    }));
  };

  const handleSave = () => {
    onSave(editedAccount);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Checking Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="balance">
            <Form.Label>Balance</Form.Label>
            <Form.Control
              type="number"
              name="balance"
              value={editedAccount.balance}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="numberOfTransfers">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="number"
              name="numberOfTransfers"
              value={editedAccount.accountNumber}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CheckingAccountEditModal