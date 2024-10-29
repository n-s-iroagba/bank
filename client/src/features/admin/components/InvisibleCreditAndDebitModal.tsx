import { useState } from "react";
import { Modal, Button,Form } from "react-bootstrap";


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

  

  