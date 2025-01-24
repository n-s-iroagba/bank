import { useState } from "react";
import { Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom";
import CreditDebitModal from "../../components/CreditDebitModal";
import UpdateCheckingAccountModal from "../../components/UpdateCheckingAccountModal";
import {UpdateCheckingAccount } from "../../types/CheckingAccount";
import AccountHolderLayout from "../../components/AccountHolderLayout";
import useCheckingAccount from "../../hooks/useCheckingAccount";



const AdminCheckingAccountDetails: React.FC =()  => {
  const [showUpdateCheckingAccountModal, setShowUpdateCheckingAccountModal] = useState(false);
  const [operationType, setOperationType] = useState<"credit" | "debit" | null>(null);
  const [isTransferVisible, setIsTransferVisible] = useState(false);
  const [showOperationModal, setShowOperationModal] = useState(false);
  const navigate = useNavigate()
  const {id} = useParams<{id:string}>()

  const {account} = useCheckingAccount(id as string)

  const handleUpdateCheckingAccount = () => {
    setShowUpdateCheckingAccountModal(true);
  };

  const handleSaveUpdateedAccount = (updatedAccount: UpdateCheckingAccount) => {
    console.log("Updated Account:", updatedAccount);
    setShowUpdateCheckingAccountModal(false);
  };

  const openOperationModal = (type: "credit" | "debit", visible: boolean) => {
    setOperationType(type);
    setIsTransferVisible(visible);
    setShowOperationModal(true);
  };



  return (
    <>
    <AccountHolderLayout accountHolderId = {id as string} >
   
          <div>Checking Account ID: {account?.id}</div>
         
            <p><strong>Balance:</strong> ${account?.balance}</p>
            
              <div>
                <Button variant="info" onClick={handleUpdateCheckingAccount}>Update</Button>
                <Button variant="info" onClick={() => openOperationModal("debit", true)}>Debit (with Transfer)</Button>
                <Button variant="info" onClick={() => openOperationModal("credit", true)}>Credit (with Transfer)</Button>
                <Button variant="info" onClick={() => openOperationModal("debit", false)}>Debit (no Transfer)</Button>
                <Button variant="info" onClick={() => openOperationModal("credit", false)}>Credit (no Transfer)</Button>
              </div>
      
            <Button variant="link" onClick={() => navigate(`/admin/transactions/${account?.id}`)}>View Transactions</Button>
         
            </AccountHolderLayout>

      <UpdateCheckingAccountModal
        show={showUpdateCheckingAccountModal}
        onHide={() => setShowUpdateCheckingAccountModal(false)}
        editId={account?.id||0}
        onSave={handleSaveUpdateedAccount}
      />

      <CreditDebitModal
        show={showOperationModal}
        onHide={() => setShowOperationModal(false)}
        type={operationType}
        isTransferVisible={isTransferVisible} checkingAccountId={account?.id||0}      />
    </>
  );
};

export default AdminCheckingAccountDetails;

