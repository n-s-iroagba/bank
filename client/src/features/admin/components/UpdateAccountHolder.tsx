import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { UpdateAccountHolder } from '../../../types/AccountHolder';



interface UpdateAccountHolderModalProps {
  show: boolean;
  onClose: (state:boolean) => void;
  accountHolder: UpdateAccountHolder | null;
  accountHolderId:number
}

const UpdateAccountHolderModal: React.FC<UpdateAccountHolderModalProps> = ({ show, onClose, accountHolder,accountHolderId }) => {
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (accountHolder) {
      setFirstname(accountHolder.firstname);
      setMiddlename(accountHolder.middlename || '');
      setSurname(accountHolder.surname);
      setUsername(accountHolder.username);
      setPassword(accountHolder.password);
    }
  }, [accountHolder]);

  const handleSave = async () => {
   
 };

  return (
    <Modal show={show} onHide={()=>onClose(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Account Holder</Modal.Title>
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
      {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
    </Modal>
  );
};

export default UpdateAccountHolderModal;
