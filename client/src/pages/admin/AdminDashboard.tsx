import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ClientFormModal from '../../features/admin/components/ClientFormModal';
import ClientTable from '../../features/admin/components/ClientTable';
import TransfersModal from '../../features/admin/components/TransferModal';
import useClients from '../../features/admin/hooks/useClients';
import useClientTransfers from '../../features/admin/hooks/useClientTransfers';




const AdminDashboard: React.FC = () => {
  // Hooks for Clients
  const { clients, loading, error, createClient, updateClient, updateBalance } = useClients();
  const [selectedClient, setSelectedClient] = useState<any>(null);

  // State for Client Modal
  const [showClientModal, setShowClientModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', balance: 0 });

  // State for Transfers Modal
  const [showTransfersModal, setShowTransfersModal] = useState(false);
  const { transfers, loading: transfersLoading, error: transfersError, fetchTransfers } = useClientTransfers(selectedClient ? selectedClient.id : null);

  // Open the modal for creating a new Client
  const handleCreateClient = () => {
    setFormData({ username: '', password: '', balance: 0 });
    setIsEditing(false);
    setShowClientModal(true);
  };

  // Open the modal for editing a Client
  const handleEditClient = (client: any) => {
    setFormData({ username: client.username, password:client.password, balance: client.balance });
    setSelectedClient(client);
    setIsEditing(true);
    setShowClientModal(true);
  };

  // Handle form submission for create/edit Client
  const handleFormSubmit = () => {
    if (isEditing) {
      updateClient(selectedClient.id, formData);
    } else {
      createClient(formData);
    }
    setShowClientModal(false);
  };

  // Open the transfers modal for a selected Client
  const handleViewTransfers = (clientId: number) => {
    setSelectedClient(clients.find((client) => client.id === clientId));
    fetchTransfers();
    setShowTransfersModal(true);
  };

  // Handle increasing or decreasing Client balance
  const handleIncreaseBalance = (ClientId: number) => {
    const amount = prompt('Enter the amount to increase:');
    if (amount) {
      updateBalance(ClientId, Number(amount));
    }
  };

  const handleDecreaseBalance = (ClientId: number) => {
    const amount = prompt('Enter the amount to decrease:');
    if (amount) {
      updateBalance(ClientId, -Number(amount));
    }
  };

  // Handle crediting account (this logs as a credit in Client's transfers)
  const handleCreditAccount = (ClientId: number) => {
    const amount = prompt('Enter the credit amount:');
    if (amount) {
      updateBalance(ClientId, Number(amount)); // or call another API endpoint to log this as a credit transaction
    }
  };

  return (
    <div>
      <h1>Clients Account</h1>

      <Button variant="primary" onClick={handleCreateClient}>
        Create New Account
      </Button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ClientTable
        clients={clients}
        onEdit={handleEditClient}
        onViewTransfers={handleViewTransfers}
        onIncreaseBalance={handleIncreaseBalance}
        onDecreaseBalance={handleDecreaseBalance}
        onCreditAccount={handleCreditAccount}
      />

      {/* Client Form Modal */}
      <ClientFormModal
        show={showClientModal}
        onHide={() => setShowClientModal(false)}
        onSubmit={handleFormSubmit}
        formData={formData}
        setFormData={setFormData}
        isEdit={isEditing}
      />

      {/* Transfers Modal */}
      <TransfersModal
        show={showTransfersModal}
        onHide={() => setShowTransfersModal(false)}
        transfers={transfers}
        loading={transfersLoading}
        error={transfersError}
      />
    </div>
  );
};

export default AdminDashboard;
