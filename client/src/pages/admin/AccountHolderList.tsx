import { ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminDashboardLayout from "../../components/AdminDashboardLayout";
import useAccountHolders from "../../hooks/UseAccountHolders";
import AccountHolderModal from "../../components/AccountHolderModal";
import { useState } from "react";
import { faUsers, faUserAlt, faBank } from "@fortawesome/free-solid-svg-icons";


const AccountHolderList: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();
  const id = 0

  const {accountHolders} = useAccountHolders(id)

  const handleNavigateToDetail = (accountHolderId: number) => {
    navigate(`/admin/account-holder/${accountHolderId}`);

  };

  const navItems = [
    { icon: faUsers, label: "Account Holders", path:`/admin/account-holders/${id}`  },
    { icon: faUserAlt, label: "Second Parties", path: `/admin/second-parties/${id}`  },
    { icon: faBank, label: "Banks", path: "/admin/banks" },
  
  ];
  return (
    <AdminDashboardLayout navItems={navItems} >
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
    <AccountHolderModal show={showModal} onClose={()=>setShowModal(false) } adminId={id}/>
    </AdminDashboardLayout>
  );
};

export default AccountHolderList;
