import React from 'react';
import { Accordion, Button, Row, Col } from 'react-bootstrap';
import AdminAccordionItem from './AdminAccordionItem';

interface AdminListProps {
  admins: { id: number; name: string; workingAccounts: number }[];
  onCreateAdminClick: () => void;
  onEditAdminClick: (adminId: number) => void;
  onDeleteAdminClick: (adminId: number) => void;
}

const AdminList: React.FC<AdminListProps> = ({
  admins,
  onCreateAdminClick,
  onEditAdminClick,
  onDeleteAdminClick,
}) => {
  return (
    <div>
      <Button className="mb-3" onClick={onCreateAdminClick}>
        Create Admin
      </Button>
      <Accordion>
        {admins.map((admin) => (
          <AdminAccordionItem
            key={admin.id}
            admin={admin}
            onEdit={onEditAdminClick}
            onDelete={onDeleteAdminClick}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default AdminList;
