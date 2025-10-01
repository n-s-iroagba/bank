import React, { useState } from "react";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Plus, Upload, Download, Banknote, TrendingUp } from "lucide-react";

import BankList from "../../components/admin/BankManagement/BankList";
import BankFormModal from "../../components/admin/BankManagement/BankForm";
import BankBulkUploadModal from "../../components/admin/BankManagement/BankBulkUpload";

import { Bank } from "../../types";
import { useBanks } from "../../hooks/useBank";
import "../../styles/BankManagement.css";
 
const Banks: React.FC = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [editingBank, setEditingBank] = useState<Bank | null>(null);

  const { data: banksResponse, isLoading, isError, error, refetch } = useBanks({
    page: 1,
    limit: 10,
  });
console.log(banksResponse)
  const handleCreateBank = () => {
    setEditingBank(null);
    setShowFormModal(true);
  };

  const handleEditBank = (bank: Bank) => {
    setEditingBank(bank);
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditingBank(null);
  };

  const handleCloseBulkUploadModal = () => {
    setShowBulkUploadModal(false);
  };

  const handleSuccess = () => {
    refetch();
    handleCloseFormModal();
    handleCloseBulkUploadModal();
  };

  // Optional: Add some stats if available
  const totalBanks = banksResponse?.pagination?.totalItems || 0;
  const banks = banksResponse?.data||[] 


  return (
    <div className="banks-page">
      {/* Optional Stats Grid */}
      {(totalBanks > 0) && (
        <div className="stats-grid mb-4">
          <div className="stat-card">
            <div className="stat-value">{totalBanks}</div>
            <div className="stat-label">Total Banks</div>
          </div>
          
        </div>
      )}

      {/* Page Header */}
      <Card className="page-header-card">
        <Card.Body className="page-header-body">
          <Row className="align-items-center">
            <Col lg={6}>
              <h3 className="page-title">
                <div className="page-title-icon">
                  <Banknote size={24} className="text-white" />
                </div>
                Bank Management
              </h3>
              <p className="page-subtitle">
                Manage banks and their associated information with ease
              </p>
            </Col>
            <Col lg={6}>
              <div className="action-buttons justify-content-lg-end">
                <Button 
                  className="btn-primary-custom"
                  onClick={handleCreateBank}
                >
                  <Plus size={18} className="btn-icon" />
                  Add Bank
                </Button>
                <Button
                  className="btn-outline-primary-custom"
                  onClick={() => setShowBulkUploadModal(true)}
                >
                  <Upload size={18} className="btn-icon" />
                  Bulk Upload
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Error State */}
      {isError && (
        <Alert variant="danger" className="alert-custom alert-danger-custom">
          <Alert.Heading className="h6 fw-bold mb-2">
            ⚠️ Loading Error
          </Alert.Heading>
          Error loading banks:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </Alert>
      )}

      {/* Bank List */}
      <Card className="main-content-card">
        <Card.Header className="card-header-custom d-flex align-items-center">
          <TrendingUp size={20} className="me-2 text-red-600" />
          Banks Overview
          {!isLoading && banksResponse?.data && (
            <span className="badge bg-red-500 ms-2">
              {banks.length} banks
            </span>
          )}
        </Card.Header>
        <Card.Body className="card-body-custom">
          <BankList
            banks={banks}
            pagination={banksResponse?.pagination}
            isLoading={isLoading}
            onRefetch={refetch}
            onEdit={handleEditBank}
          />
        </Card.Body>
      </Card>

      {/* Modals */}
      <BankFormModal
        show={showFormModal}
        bank={editingBank}
        onClose={handleCloseFormModal}
        onSuccess={handleSuccess}
      />

      <BankBulkUploadModal
        show={showBulkUploadModal}
        onClose={handleCloseBulkUploadModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Banks;