import { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { CheckingAccount, UpdateCheckingAccount } from "../../../types/CheckingAccount";
import { Transaction } from "../../../types/Transaction";
import TransactionModal from "./TransactionModal";

import CreditDebitModal from "./CreditDebitModal";
import UpdateCheckingAccountModal from "./UpdateCheckingAccountModal";


const CheckingAccountAccordion: React.FC<{ account: CheckingAccount; isAdmin?: boolean,adminId:number }> = ({ account, isAdmin,adminId }) => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [showUpdateCheckingAccountModal, setShowUpdateCheckingAccountModal] = useState(false);
  const [operationType, setOperationType] = useState<"credit" | "debit" | null>(null);
  const [isTransferVisible, setIsTransferVisible] = useState(false);
  const [showOperationModal, setShowOperationModal] = useState(false);

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
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Checking Account ID: {account.id}</Accordion.Header>
          <Accordion.Body>
            <p><strong>Balance:</strong> ${account.balance}</p>
            {isAdmin && (
              <div>
                <Button variant="info" onClick={handleUpdateCheckingAccount}>Update</Button>
                <Button variant="info" onClick={() => openOperationModal("debit", true)}>Debit (with Transfer)</Button>
                <Button variant="info" onClick={() => openOperationModal("credit", true)}>Credit (with Transfer)</Button>
                <Button variant="info" onClick={() => openOperationModal("debit", false)}>Debit (no Transfer)</Button>
                <Button variant="info" onClick={() => openOperationModal("credit", false)}>Credit (no Transfer)</Button>
              </div>
            )}
            <Button variant="link" onClick={() => setShowTransactions(true)}>View Transactions</Button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <TransactionModal
        show={showTransactions}
        onHide={() => setShowTransactions(false)}
        transactions={account.transactions as Transaction[]}
      />

      <UpdateCheckingAccountModal
        show={showUpdateCheckingAccountModal}
        onHide={() => setShowUpdateCheckingAccountModal(false)}
        editId={account.id}
        onSave={handleSaveUpdateedAccount}
      />

      <CreditDebitModal
        show={showOperationModal}
        onHide={() => setShowOperationModal(false)}
        type={operationType}
        isTransferVisible={isTransferVisible} adminId={adminId}      />
    </>
  );
};

export default CheckingAccountAccordion;

