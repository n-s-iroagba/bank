import { useState } from "react";
import { Modal, Button,Form } from "react-bootstrap";
import { CreateTransactionSystem } from "../types/Transaction";


const UpdateTransfersModal: React.FC<{
  show: boolean;
  onHide: () => void;
editId: number;
  onSave: (updatedAccount: CreateTransactionSystem) => void;
}> = ({ show, onHide, editId, onSave }) => {
  const [editedAccount, setUpdateedAccount] = useState<CreateTransactionSystem>({
    numberOfTransfers: 0,
    transferStartDate: new Date(),
    transferEndDate: new Date(),
   
    highestTransfer: 0,
    lowestTransfer: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateedAccount(prev => ({
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
        <Modal.Title>Update Checking Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
      
          <Form.Group controlId="numberOfTransfers">
            <Form.Label>Number of Transfers</Form.Label>
            <Form.Control
              type="number"
              name="numberOfTransfers"
              value={editedAccount.numberOfTransfers}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="transferStartDate">
            <Form.Label>Transfer Start Date</Form.Label>
            <Form.Control
              type="date"
              name="transferStartDate"
              value={editedAccount.transferStartDate.toISOString().split("T")[0]}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="transferEndDate">
            <Form.Label>Transfer End Date</Form.Label>
            <Form.Control
              type="date"
              name="transferEndDate"
              value={editedAccount.transferEndDate.toISOString().split("T")[0]}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="highestTransfer">
            <Form.Label>Highest Transfer</Form.Label>
            <Form.Control
              type="number"
              name="highestTransfer"
              value={editedAccount.highestTransfer}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="lowestTransfer">
            <Form.Label>Lowest Transfer</Form.Label>
            <Form.Control
              type="number"
              name="lowestTransfer"
              value={editedAccount.lowestTransfer}
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
export default UpdateTransfersModal