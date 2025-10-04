import React, { useState } from "react";
import { Plus, Search, Users, RefreshCw } from "lucide-react";
import { accountHolderManagemntStyles } from "../../styles/AdminAccountHolderStyles";
import AccountHolderList from "../../components/admin/AccountHolderManagement/AccountHolderList";
import { AccountHolder } from "../../types";
import { useAccountHolders } from "../../hooks/useAccountHolder";
import AccountHolderFormModal from "../../components/admin/AccountHolderManagement/AccountHolderForm";

const AccountHolders: React.FC = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingAccountHolder, setEditingAccountHolder] = useState<AccountHolder | null>(null);
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
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const accountHolders = accountHoldersResponse?.data || [];

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundColor: "#f8fafc",
      paddingBottom: "2rem"
    }}>
      <style>{accountHolderManagemntStyles}</style>

      {/* Header - Mobile Optimized */}
      <div className="gradient-header">
        <div className="container-fluid px-3 px-md-4">
          <div className="row align-items-center py-3">
            <div className="col-12 col-md-8 col-lg-9">
              <div className="d-flex align-items-center mb-2 mb-md-3">
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "#dc2626",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "12px",
                    flexShrink: 0
                  }}
                >
                  <Users size={20} color="white" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h1
                    style={{
                      fontSize: "clamp(1.5rem, 5vw, 2rem)",
                      fontWeight: "700",
                      marginBottom: "4px",
                      lineHeight: "1.2",
                      wordWrap: "break-word"
                    }}
                  >
                    Account Holder Management
                  </h1>
                  <p
                    style={{ 
                      fontSize: "clamp(0.875rem, 3vw, 1rem)", 
                      opacity: 0.8, 
                      marginBottom: 0,
                      lineHeight: "1.4"
                    }}
                  >
                    Manage and monitor all account holders
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-3">
              <div className="d-flex flex-column flex-sm-row gap-2 w-100">
                <button
                  className="btn btn-secondary d-flex align-items-center justify-content-center"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  style={{
                    flex: 1,
                    minHeight: "44px", // Better touch target
                    fontSize: "14px"
                  }}
                >
                  <RefreshCw
                    size={16}
                    style={{ marginRight: "6px" }}
                    className={isRefreshing ? "loading" : ""}
                  />
                  {isRefreshing ? "Refreshing..." : "Refresh"}
                </button>
                <button
                  className="btn btn-primary d-flex align-items-center justify-content-center"
                  onClick={handleCreateAccountHolder}
                  style={{
                    flex: 1,
                    minHeight: "44px",
                    fontSize: "14px"
                  }}
                >
                  <Plus size={16} style={{ marginRight: "6px" }} />
                  Add New
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats - Mobile Optimized */}
      <div className="container-fluid px-3 px-md-4" style={{ 
        paddingTop: "1.5rem", 
        paddingBottom: "1.5rem",
      }}>
        <div className="row">
          <div className="col-12">
            <div className="card" style={{
              border: "none",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              transition: "all 0.3s ease",
              borderLeft: "4px solid #ef4444",
              position: "relative"
            }}>
              <div className="card-body" style={{ padding: "1.5rem" }}>
                {/* Background accent */}
                <div style={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                  width: "60px",
                  height: "100%",
                  background: "linear-gradient(135deg, transparent 0%, #ef4444 150%)",
                  opacity: "0.05",
                  zIndex: "0"
                }}></div>
                
                <div className="d-flex justify-content-between align-items-center" style={{ position: "relative", zIndex: "1" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#64748b",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}>
                      Number Of Account Holders
                    </p>
                    <h3 style={{
                      fontSize: "clamp(2rem, 8vw, 2.5rem)",
                      fontWeight: "800",
                      marginBottom: "0",
                      background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: "1.1"
                    }}>
                      {accountHolders.length}
                    </h3>
                  </div>
                  
                  {/* Icon/Status Circle */}
                  <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    background: accountHolders.length 
                      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
                      : "linear-gradient(135deg, #64748b 0%, #475569 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 8px rgba(16, 185, 129, 0.3)",
                    flexShrink: 0,
                    marginLeft: "12px"
                  }}>
                    <span style={{
                      fontSize: "10px",
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
                  marginTop: "16px",
                  height: "3px",
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
                  marginTop: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: accountHolders.length ? "#10b981" : "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em"
                  }}>
                    {accountHolders.length ? "✓ All Systems Active" : "No Account Holders"}
                  </span>
                  <span style={{
                    fontSize: "10px",
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

        {/* Search - Mobile Optimized */}
        <div className="card mb-3" style={{ borderRadius: "12px" }}>
          <div className="card-body" style={{ padding: "1rem" }}>
            <div className="row align-items-center">
              <div className="col-12 col-md-8 mb-2 mb-md-0">
                <div className="input-group" style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                    color: "#64748b"
                  }}>
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      paddingLeft: "40px",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      fontSize: "16px", // Prevents zoom on iOS
                      minHeight: "44px" // Better touch target
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <button 
                  className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                  style={{
                    minHeight: "44px",
                    borderRadius: "8px",
                    fontSize: "16px"
                  }}
                >
                  <Search size={16} style={{ marginRight: "8px" }} />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="card" style={{ borderRadius: "12px", overflow: "hidden" }}>
          <div className="card-body" style={{ padding: 0 }}>
            <div
              style={{
                padding: "1rem",
                background: "linear-gradient(135deg, #f1f5f9, #f8fafc)",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <AccountHolderList
                accountHolders={accountHolders}
                isLoading={isLoading}
                onEdit={handleEditAccountHolder}
                onRefetch={refetch}
                setParams={() => {}}
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