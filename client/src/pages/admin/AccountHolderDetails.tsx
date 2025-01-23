import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import AccountHolderLayout from "../../components/AccountHolderLayout";
import UpdateAccountHolderModal from "../../components/UpdateAccountHolderModal";
import useGetAccountHolderDetails from "../../hooks/useGetAccountHolderDetails";


const AccountHolderDetails: React.FC<{}> = () => {
  const {id} = useParams<{ id: string }>() ;

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { accountHolder } = useGetAccountHolderDetails(id as string);
  console.log(accountHolder)

  if (!accountHolder) {
    return <div>Account Holder not found</div>;
  }

  const handleEdit = () => {
    setShowModal(true);
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
          <p>
            <strong>Name:</strong> {accountHolder?.firstName}{" "}
            {accountHolder.surname}
          </p>
        </div>

        <Button variant="secondary" onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="danger" onClick={handleDelete} className="ml-2">
          Delete
        </Button>

        <UpdateAccountHolderModal
          show={showModal}
          onClose={() => setShowModal(false)}
          accountHolder={accountHolder}
        />
      </div>
    </AccountHolderLayout>
  );
};

export default AccountHolderDetails;
