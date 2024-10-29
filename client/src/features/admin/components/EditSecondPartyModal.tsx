import React from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { ModalProps } from '../../common/types/ModalProps';



const EditSecondPartyModal: React.FC<ModalProps> = ({  show, setShow, id  }) => {



  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
  };
  const handleClose = () => {
    
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Second Party</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="secondPartyName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
         
              placeholder="Enter name"
              required
            />
          </Form.Group>

          <Form.Group controlId="secondPartyBank" className="mt-3">
            <Form.Label>Bank</Form.Label>
            <Form.Control
              type="text"
            
              placeholder="Enter bank name"
              required
            />
          </Form.Group>

          <Form.Group controlId="secondPartyAccountNumber" className="mt-3">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="text"
     
              placeholder="Enter account number"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditSecondPartyModal;
