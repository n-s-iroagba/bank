import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface EditAdminModalProps {
  show: boolean;
  onClose: () => void;
  onEdit: (name: string) => void;
  currentName: string;
}

const EditAdminModal: React.FC<EditAdminModalProps> = ({ show, onClose, onEdit, currentName }) => {
  const [adminName, setAdminName] = useState(currentName);

  useEffect(() => {
    setAdminName(currentName);
  }, [currentName]);

  const handleEdit = () => {
    onEdit(adminName);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="adminNameEdit">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAdminModal;
