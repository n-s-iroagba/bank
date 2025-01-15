import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import AccountHolderModal from "../../components/AccountHolderModal";
import AccountHolderLayout from "../../components/AccountHolderLayout";


const AccountHolderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

let accountHolder ={
    id: id,
    firstName: "John Doe",
    surname: "John"
};

  if (!accountHolder) {
    return <div>Account Holder not found</div>;
  }

  const handleEdit = () => {
    setShowModal(true); // Show modal to edit account holder
  };

  const handleDelete = () => {
    // Perform delete action (can be a confirm dialog)
    alert("Account Holder deleted!");
    navigate("/account-holder-list");
  };
 

  return (
    <AccountHolderLayout id={0}>
    <div>
      <h5>Account Holder Details</h5>
      <div>
        <p><strong>Name:</strong> {accountHolder?.firstName} {accountHolder.surname}</p>
       
        {/* Add other fields as necessary */}
      </div>

      <Button variant="secondary" onClick={handleEdit}>Edit</Button>
      <Button variant="danger" onClick={handleDelete} className="ml-2">Delete</Button>

      {/* Account Holder Edit Modal */}
      <AccountHolderModal
        show={showModal}
        adminId={0}
        onClose={() => setShowModal(false)}
        // accountHolderToBeUpdated={accountHolder}
      />
    </div>
    </AccountHolderLayout>
  );
};

export default AccountHolderDetails;
