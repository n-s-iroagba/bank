import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { BaseAccountHolder } from "../../../types/AccountHolder";

interface EditAccountHolderModalProps {
  show: boolean;
  onClose: (state:boolean) => void;
  accountHolder: BaseAccountHolder | null;
}

const EditAccountHolderModal: React.FC<EditAccountHolderModalProps> = ({ show, onClose, accountHolder }) => {
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (accountHolder) {
      setFirstname(accountHolder.firstname);
      setMiddlename(accountHolder.middlename || '');
      setSurname(accountHolder.surname);
      setUsername(accountHolder.username);
      setPassword(accountHolder.password);
    }
  }, [accountHolder]);

  const handleSave = () => {
    if (accountHolder) {
      const updatedAccountHolder: BaseAccountHolder = {
        ...accountHolder,
        firstname,
        middlename,
        surname,
        username,
        password,
      };
      console.log(updatedAccountHolder);

      onClose(false);
    }
  };

  return (
    <Modal show={show} onHide={()=>onClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Account Holder</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="accountHolderFirstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="accountHolderMiddlename" className="mt-3">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              type="text"
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="accountHolderSurname" className="mt-3">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="accountHolderUsername" className="mt-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="accountHolderPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={()=>onClose(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAccountHolderModal;
