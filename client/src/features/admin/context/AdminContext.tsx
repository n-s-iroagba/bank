// src/contexts/AdminContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AdminContextProps {
  showBeneficiaryModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
  showCreditCheckingModal: boolean;
  showDebitCheckingModal: boolean;
  handleShowBeneficiaryModal: (clientId: number) => void;
  handleCloseBeneficiaryModal: () => void;
  handleEditClient: (clientId: number) => void;
  handleCloseEditModal: () => void;
  handleDeleteClient: (clientId: number) => void;
  handleCloseDeleteModal: () => void;
  handleCreditCheckingVisible: (clientId: number) => void;
  handleCloseCreditCheckingModal: () => void;
  handleDebitCheckingVisible: (clientId: number) => void;
  handleCloseDebitCheckingModal: () => void;
  selectedClientId: number | null;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
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
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);

  const handleShowBeneficiaryModal = (clientId: number) => {
    setSelectedClientId(clientId);
    setShowBeneficiaryModal(true);
  };

  const handleCloseBeneficiaryModal = () => {
    setShowBeneficiaryModal(false);
    setSelectedClientId(null);
  };

  const handleEditClient = (clientId: number) => {
    setSelectedClientId(clientId);
    setShowEditModal(true);
    console.log(`Edit Account Holder Details for client ID: ${clientId}`);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedClientId(null);
  };

  const handleDeleteClient = (clientId: number) => {
    setSelectedClientId(clientId);
    setShowDeleteModal(true);
    console.log(`Delete Client with ID: ${clientId}`);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedClientId(null);
  };

  const handleCreditCheckingVisible = (clientId: number) => {
    setSelectedClientId(clientId);
    setShowCreditCheckingModal(true);
    console.log(`Credit Checking Account (visible) for client ID: ${clientId}`);
  };

  const handleCloseCreditCheckingModal = () => {
    setShowCreditCheckingModal(false);
    setSelectedClientId(null);
  };

  const handleDebitCheckingVisible = (clientId: number) => {
    setSelectedClientId(clientId);
    setShowDebitCheckingModal(true);
    console.log(`Debit Checking Account (visible) for client ID: ${clientId}`);
  };

  const handleCloseDebitCheckingModal = () => {
    setShowDebitCheckingModal(false);
    setSelectedClientId(null);
  };

  return (
    <AdminContext.Provider
      value={{
        showBeneficiaryModal,
        showEditModal,
        showDeleteModal,
        showCreditCheckingModal,
        showDebitCheckingModal,
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
        selectedClientId
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
