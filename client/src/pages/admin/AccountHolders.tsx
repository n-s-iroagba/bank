import React, { useState } from "react";
import { Plus, Search,  Users, RefreshCw } from "lucide-react";
import { accountHolderManagemntStyles } from "../../styles/AdminAccountHolderStyles";
import AccountHolderList from "../../components/admin/AccountHolderManagement/AccountHolderList";
import { AccountHolder } from "../../types";
import { useAccountHolders } from "../../hooks/useAccountHolder";
import AccountHolderFormModal from "../../components/admin/AccountHolderManagement/AccountHolderForm";

const AccountHolders: React.FC = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingAccountHolder, setEditingAccountHolder] =
    useState<AccountHolder | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data: accountHoldersResponse,
    isLoading,
 
    refetch,
  } = useAccountHolders({ page: 1, limit: 10 });

  const handleCreateAccountHolder = () => {
    setEditingAccountHolder(null);
    setShowFormModal(true);
  };

  const handleEditAccountHolder = (accountHolder: AccountHolder) => {
    setEditingAccountHolder(accountHolder);
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditingAccountHolder(null);
  };

  const handleSuccess = () => {
    refetch();
    handleCloseFormModal();
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch(); // ✅ actually reloads account holders
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const accountHolders = accountHoldersResponse?.data || [];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <style>{accountHolderManagemntStyles}</style>

      {/* Header */}
      <div className="gradient-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center mb-3">
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    background: "#dc2626",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "16px",
                  }}
                >
                  <Users size={24} />
                </div>
                <div>
                  <h1
                    style={{
                      fontSize: "32px",
                      fontWeight: "700",
                      marginBottom: "8px",
                    }}
                  >
                    Account Holder Management
                  </h1>
                  <p
                    style={{ fontSize: "18px", opacity: 0.8, marginBottom: 0 }}
                  >
                    Manage and monitor all account holders
                  </p>
                </div>
              </div>
            </div>
            <div className="col-auto">
              <div className="d-flex gap-3">
                <button
                  className="btn btn-secondary"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw
                    size={16}
                    style={{ marginRight: "8px" }}
                    className={isRefreshing ? "loading" : ""}
                  />
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleCreateAccountHolder}
                >
                  <Plus size={16} style={{ marginRight: "8px" }} />
                  Add New Holder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
<div className="container" style={{ 
  paddingTop: "50px", 
  paddingBottom: "50px",
  background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
  minHeight: "100vh"
}}>
  <div className="row mb-5">
    <div className="col-12 col-md-6 col-lg-4 col-xl-3">
      <div className="card" style={{
        border: "none",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderLeft: "4px solid #ef4444",
        position: "relative"
      }}>
        <div className="card-body" style={{ padding: "2rem" }}>
          {/* Background accent */}
          <div style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "80px",
            height: "100%",
            background: "linear-gradient(135deg, transparent 0%, #ef4444 150%)",
            opacity: "0.05",
            zIndex: "0"
          }}></div>
          
          <div className="d-flex justify-content-between align-items-center" style={{ position: "relative", zIndex: "1" }}>
            <div>
              <p style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#64748b",
                marginBottom: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                Number Of Account Holders
              </p>
              <h3 style={{
                fontSize: "42px",
                fontWeight: "800",
                marginBottom: "0",
                background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                {accountHolders.length}
              </h3>
            </div>
            
            {/* Icon/Status Circle */}
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: accountHolders.length 
                ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
                : "linear-gradient(135deg, #64748b 0%, #475569 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
              transition: "all 0.3s ease"
            }}>
              <span style={{
                fontSize: "12px",
                fontWeight: "700",
                color: "white",
                textAlign: "center",
                lineHeight: "1.2"
              }}>
                {accountHolders.length ? "Active" : "No Data"}
              </span>
            </div>
          </div>
          
          {/* Progress bar indicator */}
          <div style={{
            marginTop: "20px",
            height: "4px",
            background: "#e2e8f0",
            borderRadius: "10px",
            overflow: "hidden"
          }}>
            <div style={{
              height: "100%",
              width: accountHolders.length ? "100%" : "0%",
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              borderRadius: "10px",
              transition: "width 0.5s ease-in-out"
            }}></div>
          </div>
          
          {/* Additional info */}
          <div style={{
            marginTop: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{
              fontSize: "12px",
              fontWeight: "600",
              color: accountHolders.length ? "#10b981" : "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              {accountHolders.length ? "✓ All Systems Active" : "No Account Holders"}
            </span>
            <span style={{
              fontSize: "11px",
              color: "#94a3b8",
              fontWeight: "500"
            }}>
              Real-time
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>


        {/* Search */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row align-items-end">
              <div className="col">
                <div className="input-group">
                  <Search size={20} className="input-icon" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email, or phone number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-auto">
                <button className="btn btn-primary">
                  <Search size={16} style={{ marginRight: "8px" }} />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="card">
          <div className="card-body" style={{ padding: 0 }}>
            <div
              style={{
                padding: "24px",
                background: "linear-gradient(135deg, #f1f5f9, #f8fafc)",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <AccountHolderList
                accountHolders={accountHolders}
                isLoading={isLoading}
                onEdit={handleEditAccountHolder}
                onRefetch={refetch}
                setParams={() => {}} // you can expand pagination/filtering later
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showFormModal && (
        <AccountHolderFormModal
          show={showFormModal}
          accountHolder={editingAccountHolder}
          onClose={handleCloseFormModal}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default AccountHolders;
