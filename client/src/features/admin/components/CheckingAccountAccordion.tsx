import { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { CheckingAccount, EditCheckingAccount } from "../../../types/CheckingAccount";
import { Transaction } from "../../../types/Transaction";
import TransactionModal from "./TransactionModal";
import CheckingAccountEditModal from "./CheckingAccountEditModal";
import CreditDebitModal from "./CreditDebitModal";


const CheckingAccountAccordion: React.FC<{ account: CheckingAccount; isAdmin?: boolean }> = ({ account, isAdmin }) => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [showEditCheckingAccountModal, setShowEditCheckingAccountModal] = useState(false);
  const [operationType, setOperationType] = useState<"credit" | "debit" | null>(null);
  const [isTransferVisible, setIsTransferVisible] = useState(false);
  const [showOperationModal, setShowOperationModal] = useState(false);

  const handleEditCheckingAccount = () => {
    setShowEditCheckingAccountModal(true);
  };

  const handleSaveEditedAccount = (updatedAccount: EditCheckingAccount) => {
    console.log("Updated Account:", updatedAccount);
    setShowEditCheckingAccountModal(false);
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
                <Button variant="info" onClick={handleEditCheckingAccount}>Edit</Button>
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

      <CheckingAccountEditModal
        show={showEditCheckingAccountModal}
        onHide={() => setShowEditCheckingAccountModal(false)}
        editId={account.id}
        onSave={handleSaveEditedAccount}
      />

      <CreditDebitModal
        show={showOperationModal}
        onHide={() => setShowOperationModal(false)}
        type={operationType}
        isTransferVisible={isTransferVisible}
      />
    </>
  );
};

export default CheckingAccountAccordion;

