import React, { useState } from 'react';
import { Form, Button, Modal, ModalProps } from 'react-bootstrap';
import useBanks from '../../common/hooks/useBanks';

import { Bank } from '../../../types/Bank';
import { CreateSecondParty } from '../../../types/SecondParty';

const CreateSecondPartyModal: React.FC<ModalProps> = ({ id, setShow, show }) => {
  const { banks } = useBanks();
  const [secondPartyDetails, setSecondPartyDetails] = useState<CreateSecondParty>({
    firstname: '',
    surname: '',
    accountNumber: '',
    bank: null,
    canReceive: false,
    canSend: false,
  });

  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement|HTMLTextAreaElement>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const fieldValue = type === "checkbox" ? (target as HTMLInputElement).checked : value;

    setSecondPartyDetails((prevDetails) => ({
      ...prevDetails,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Second Party Details:", secondPartyDetails);
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create Second Party</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="secondPartyFirstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              value={secondPartyDetails.firstname}
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
              onChange={(e) =>
                setSecondPartyDetails((prevDetails) => ({
                  ...prevDetails,
                  bank: banks.find((bank) => bank.name === e.target.value) || null,
                }))
              }
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

          <Form.Group controlId="canSend" className="mt-3">
            <Form.Label>Can Send</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Yes"
                name="canSend"
                checked={secondPartyDetails.canSend === true}
                onChange={() => setSecondPartyDetails({ ...secondPartyDetails, canSend: true })}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="canSend"
                checked={secondPartyDetails.canSend === false}
                onChange={() => setSecondPartyDetails({ ...secondPartyDetails, canSend: false })}
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
                checked={secondPartyDetails.canReceive === true}
                onChange={() => setSecondPartyDetails({ ...secondPartyDetails, canReceive: true })}
              />
              <Form.Check
                inline
                type="radio"
                label="No"
                name="canReceive"
                checked={secondPartyDetails.canReceive === false}
                onChange={() => setSecondPartyDetails({ ...secondPartyDetails, canReceive: false })}
              />
            </div>
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="secondary" className="me-2" onClick={() => setShow(false)}>
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

export default CreateSecondPartyModal;
