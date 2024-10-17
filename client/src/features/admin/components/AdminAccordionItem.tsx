import React from 'react';
import { Accordion, Button, Row, Col } from 'react-bootstrap';

interface AdminAccordionItemProps {
  admin: { id: number; name: string; workingAccounts: number };
  onEdit: (adminId: number) => void;
  onDelete: (adminId: number) => void;
}

const AdminAccordionItem: React.FC<AdminAccordionItemProps> = ({ admin, onEdit, onDelete }) => {
  return (
    <Accordion.Item eventKey={admin.id.toString()}>
      <Accordion.Header>{admin.name}</Accordion.Header>
      <Accordion.Body>
        <Row>
          <Col xs={6}>
            <p><strong>Working Accounts:</strong> {admin.workingAccounts}</p>
          </Col>
          <Col xs={6}>
            <Button className="mb-2" variant="info" onClick={() => onEdit(admin.id)}>
              Edit Admin
            </Button>
            <Button className="mb-2" variant="danger" onClick={() => onDelete(admin.id)}>
              Delete Admin
            </Button>
            <Button className="mb-2" variant="primary">
              View Working Accounts
            </Button>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default AdminAccordionItem;
