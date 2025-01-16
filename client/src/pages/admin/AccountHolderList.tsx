import { ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminDashboardLayout from "../../components/AdminDashboardLayout";
import useAccountHolders from "../../hooks/useAccountHolders";
import AccountHolderModal from "../../components/AccountHolderModal";
import { useState } from "react";



const AccountHolderList: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();
  const adminId = 0
  const {accountHolders} = useAccountHolders(adminId)
  const handleNavigateToDetail = (accountHolderId: number) => {
    navigate(`/admin/account-holder/${accountHolderId}`);
  };

 
  return (
    <AdminDashboardLayout  adminId={adminId} >
    <div>
      <div className="d-flex justify-content-center mb-2">
        <button onClick={()=>setShowModal(true)}>Add Account Holders</button>
      </div>
      <h6>My Account Holders</h6>
      <ListGroup>
        {accountHolders.map((accountHolder) => (
          <ListGroup.Item key={accountHolder.id} className="d-flex justify-content-between align-items-center">
            <div className="fw-bold">
              {accountHolder.firstName} {accountHolder.surname}
            </div>
            <div>
              <Button
                variant="link"
                onClick={() => handleNavigateToDetail(accountHolder.id)}
                className="text-primary"
              >
                More
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
    <AccountHolderModal show={showModal} onClose={()=>setShowModal(false) } adminId={adminId}/>
    </AdminDashboardLayout>
  );
};

export default AccountHolderList;
