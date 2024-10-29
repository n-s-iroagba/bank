import React, { useState } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

interface Admin {
  id: number;
  name: string;
}

const SuperAdminList = () => {
  const [admins] = useState<Admin[]>([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    // additional admin data
  ]);

  return (
    <Modal show={true} onHide={() => console.log('Modal closed')} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>SuperAdmin List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {admins.map((admin) => (
            <ListGroup.Item key={admin.id}>
              {admin.name}
              <Button variant="link" className="ms-2">
                View Details
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => console.log('Modal closed')}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuperAdminList;
