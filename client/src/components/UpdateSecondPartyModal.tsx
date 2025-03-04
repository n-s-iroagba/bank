import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

import useBanks from '../hooks/useBanks';
import { Bank } from '../types/Bank';
import { SecondParty } from '../types/SecondParty';


const UpdateSecondPartyModal: React.FC<{adminId:number, show:boolean, secondPartyToBeUpdated:SecondParty,onHide:()=>void}> = ({ show,adminId,secondPartyToBeUpdated,onHide }) => {
  const { banks } = useBanks();
  const [secondPartyDetails, setSecondPartyDetails] = useState<SecondParty>(secondPartyToBeUpdated);

  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement|HTMLTextAreaElement>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const fieldValue = type === "checkbox" ? (target as HTMLInputElement).checked : value;

    setSecondPartyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: fieldValue,
    }));
  };

  const handleBankChange = (event:any) => {
    const selectedBank = banks.find((bank) => bank.name === event.target.value);
    setSecondPartyDetails((prevDetails) => ({
      ...prevDetails,
      bank: selectedBank || { id: 0, name: '', logo: '',listerId:"" },
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Second Party Details:", secondPartyDetails);
  };

  return (
    <Modal show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Create Second Party</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="secondPartyFirstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={secondPartyDetails.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />
          </Form.Group>

          <Form.Group controlId="secondPartySurname" className="mt-3">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={secondPartyDetails.surname}
              onChange={handleChange}
              placeholder="Enter surname"
              required
            />
          </Form.Group>

          <Form.Group controlId="secondPartyBank" className="mt-3">
            <Form.Label>Bank</Form.Label>
            <Form.Control
              as="select"
              name="bank"
              value={secondPartyDetails.bank?.name || ''}
              onChange={handleBankChange}
              required
            >
              <option value="">Select a bank...</option>
              {banks.map((option: Bank) => (
                <option key={option.id} value={option.name}>
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
            <Button variant="secondary" className="me-2" onClick={() =>onHide()}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Second Party
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateSecondPartyModal;
