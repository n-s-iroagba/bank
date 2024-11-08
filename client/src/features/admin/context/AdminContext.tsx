
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextProps {
  showBeneficiaryModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
  showCreditCheckingModal: boolean;
  showDebitCheckingModal: boolean;
  selectedAccountHolderId: number|null;
  showCreateAccountHoldersModal: boolean;
  handleShowBeneficiaryModal: (accountHolderId: number) => void;
  handleCloseBeneficiaryModal: () => void;
  handleEditClient: (accountHolderId: number) => void;
  handleCloseEditModal: () => void;
  handleDeleteClient: (accountHolderId: number) => void;
  handleCloseDeleteModal: () => void;
  handleCreditCheckingVisible: (accountHolderId: number) => void;
  handleCloseCreditCheckingModal: () => void;
  handleDebitCheckingVisible: (accountHolderId: number) => void;
  handleCloseDebitCheckingModal: () => void;
  handleCreateAccountHolderModal:() => void
  
  
}

export const AdminContext = createContext<AdminContextProps|any>(undefined);

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    console.error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreditCheckingModal, setShowCreditCheckingModal] = useState(false);
  const [showDebitCheckingModal, setShowDebitCheckingModal] = useState(false);
  const [selectedAccountHolderId, setSelectedAccountHolderId] = useState<number | null>(null);
  const [showCreateAccountHoldersModal, setShowCreateAccountHolderModal] = useState (false);
  

  const handleShowBeneficiaryModal = (accountHolderId: number) => {
    setSelectedAccountHolderId(accountHolderId);
    setShowBeneficiaryModal(true);
  };

  const handleCloseBeneficiaryModal = () => {
    setShowBeneficiaryModal(false);
    setSelectedAccountHolderId(null);
  };

  const handleEditClient = (accountHolderId: number) => {
    setSelectedAccountHolderId(accountHolderId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedAccountHolderId(null);
  };

  const handleDeleteClient = (accountHolderId: number) => {
    setSelectedAccountHolderId(accountHolderId);
    setShowDeleteModal(true);
   
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedAccountHolderId(null);
  };

  const handleCreditCheckingVisible = (accountHolderId: number) => {
    setSelectedAccountHolderId(accountHolderId);
    setShowCreditCheckingModal(true);
  };

  const handleCloseCreditCheckingModal = () => {
    setShowCreditCheckingModal(false);
    setSelectedAccountHolderId(null);
  };

  const handleDebitCheckingVisible = (accountHolderId: number) => {
    setSelectedAccountHolderId(accountHolderId);
    setShowDebitCheckingModal(true);
  };
const handleCreateAccountHolderModal = ()=>{
  setShowCreateAccountHolderModal(true)
}
  const handleCloseDebitCheckingModal = () => {
    setShowDebitCheckingModal(false);
    setSelectedAccountHolderId(null);
  };

  return (
    <AdminContext.Provider
      value={{
        showBeneficiaryModal,
        showEditModal,
        showDeleteModal,
        showCreditCheckingModal,
        showDebitCheckingModal,
        selectedAccountHolderId,
        showCreateAccountHoldersModal,
        handleCreateAccountHolderModal,
        handleShowBeneficiaryModal,
        handleCloseBeneficiaryModal,
        handleEditClient,
        handleCloseEditModal,
        handleDeleteClient,
        handleCloseDeleteModal,
        handleCreditCheckingVisible,
        handleCloseCreditCheckingModal,
        handleDebitCheckingVisible,
        handleCloseDebitCheckingModal,
        
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
