import { useState } from "react";
import { Modal, Button,Form } from "react-bootstrap";
import EditClientForm from "./EditClientForm";


export const CreditModal: React.FC<{ show: boolean,  clientId: number | null,  }> = ({ show, clientId, }) => {
    const [amount, setAmount] = useState<number>(0);
  const handleClose = () => {
    
  }

    const handleSubmit = () => {
      if (clientId !== null) {
      
      }
      handleClose();
    };
  
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Credit Checking Account (Client ID: {clientId})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="creditAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="Enter amount"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Credit</Button>
        </Modal.Footer>
      </Modal>
    );
  };


export const DebitModal: React.FC<{ show: boolean,  clientId: number | null,  }> = ({ show, clientId, }) => {
    const [amount, setAmount] = useState<number>(0);
  const handleClose = () => {
    
  }

    const handleSubmit = () => {
      if (clientId !== null) {
      
      }
      handleClose();
    };
  
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Credit Checking Account (Client ID: {clientId})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="creditAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="Enter amount"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>Credit</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  
  interface Client {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    checkingBalance: number;
    termDepositBalance: number;
  }
  
  interface EditClientModalProps {
    client: Client;
    show: boolean;
    handleClose: () => void;
    onSubmit: (clientId: number, updatedData: { firstName: string, lastName: string, username: string }) => void;
  }
  
  const EditClientModal: React.FC<EditClientModalProps> = ({ client, show, handleClose, onSubmit }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client Details (ID: {client.id})</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditClientForm 
            client={client} 
            onSubmit={(clientId, updatedData) => {
              onSubmit(clientId, updatedData);
              handleClose(); // Close the modal on submit
            }} 
            onCancel={handleClose}
          />
        </Modal.Body>
      </Modal>
    );
  };
  
  export default EditClientModal;
  