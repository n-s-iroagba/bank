import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Bank } from '../../../types/Bank';
import { SecondParty } from '../../../types/SecondParty';

interface UpdateSecondPartyModalProps {
  show: boolean;
  secondParty: SecondParty | null; // Handle null if `secondParty` might not be provided initially
  banks: Bank[]; // Array of available banks to choose from
  onClose: () => void;

}

const UpdateSecondPartyModal: React.FC<UpdateSecondPartyModalProps> = ({ show, secondParty, banks, onClose }) => {
  const [formValues, setFormValues] = useState<SecondParty>({
    id: 0,
    firstname: '',
    surname: '',
    accountNumber: '',
    bank: banks[0] || { id: 0, name: '' }, // Default to first bank or empty if no banks
    canReceive: false,
    canSend: false,
  });

  useEffect(() => {
    if (secondParty) {
      setFormValues(secondParty); // Populate form values when `secondParty` is provided
    }
  }, [secondParty]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement|HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const fieldValue = type === "checkbox" ? (event.target as HTMLInputElement).checked : value;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: fieldValue,
    }));
  };

  const handleBankChange = (event: any) => {
    const selectedBank = banks.find(bank => bank.id === Number(event.target.value));
    if (selectedBank) {
      setFormValues((prevValues) => ({ ...prevValues, bank: selectedBank }));
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
   
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Second Party</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="secondPartyFirstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              value={formValues.firstname}
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
              value={formValues.surname}
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
              value={formValues.bank.id}
              onChange={handleBankChange}
              required
            >
              <option value="">Select a bank...</option>
              {banks.map((bank) => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="secondPartyAccountNumber" className="mt-3">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="text"
              name="accountNumber"
              value={formValues.accountNumber}
              onChange={handleChange}
              placeholder="Enter account number"
              required
            />
          </Form.Group>

          <Form.Group controlId="canSend" className="mt-3">
            <Form.Label>Can Send</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Yes"
                name="canSend"
                value="true"
                checked={formValues.canSend === true}
                onChange={() => setFormValues({ ...formValues, canSend: true })}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="canSend"
                value="false"
                checked={formValues.canSend === false}
                onChange={() => setFormValues({ ...formValues, canSend: false })}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="canReceive" className="mt-3">
            <Form.Label>Can Receive</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Yes"
                name="canReceive"
                value="true"
                checked={formValues.canReceive === true}
                onChange={() => setFormValues({ ...formValues, canReceive: true })}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="canReceive"
                value="false"
                checked={formValues.canReceive === false}
                onChange={() => setFormValues({ ...formValues, canReceive: false })}
              />
            </div>
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" onClick={onClose} className="me-2">
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

export default UpdateSecondPartyModal;
