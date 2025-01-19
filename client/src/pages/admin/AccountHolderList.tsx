import { ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminDashboardLayout from "../../components/AdminDashboardLayout";
import useAccountHolders from "../../hooks/useAccountHolders";
import AccountHolderModal from "../../components/AccountHolderModal";
import { useState } from "react";
import useBanks from "../../hooks/useBanks";



const AccountHolderList: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();
  const adminId = 1
  const {accountHolders} = useAccountHolders(adminId)
  const {banks} = useBanks()

  const handleNavigateToDetail = (accountHolderId: number) => {
    navigate(`/admin/account-holder-details/${accountHolderId}`);
  };
  const handleShowCreateModal = () =>{
    if (banks.length){
    setShowModal(true)
    }else{
      alert("Please ask site owner to add banks first bank first")
   
    }
  }

  return (
    <AdminDashboardLayout  adminId={adminId} >
    <div>
      <div className="d-flex justify-content-center mb-2">
        <button onClick={handleShowCreateModal}>Add Account Holders</button>
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
