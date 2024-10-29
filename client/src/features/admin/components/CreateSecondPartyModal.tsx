import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import useBanks from '../../common/hooks/useBanks';
import { ModalProps } from '../../common/types/ModalProps';


const CreateSecondPartyModal: React.FC<ModalProps> = ({ id,setShow, show}) => {
  const { banks } = useBanks();
  const [secondPartyDetails, setSecondPartyDetails] = useState({
    name: '',
    bank: '',
    accountNumber: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setSecondPartyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
   
  };

  return (
    <>
    <Modal show={show}>
    <Modal.Header closeButton>
      <Modal.Title>Create Second Party</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="secondPartyName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={secondPartyDetails.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />
      </Form.Group>

      <Form.Group controlId="secondPartyBank" className="mt-3">
        <Form.Label>Bank</Form.Label>
        <Form.Control
          as="select"
          name="bank"
          value={secondPartyDetails.bank}
          onChange={handleChange}
          required
        >
          <option value="">Select a bank...</option>
          {banks.map((option: any) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="secondPartyAccountNumber" className="mt-3">
        <Form.Label>Account Number</Form.Label>
        <Form.Control
          type="text"
          name="accountNumber"
          value={secondPartyDetails.accountNumber}
          onChange={handleChange}
          placeholder="Enter account number"
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end mt-4">
        <Button variant="secondary"  className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Create Second Party
        </Button>
      </div>
    </Form>
    </Modal.Body>
    </Modal>
    </>
  );
};
export default CreateSecondPartyModal




