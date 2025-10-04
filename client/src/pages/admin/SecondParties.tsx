import React, { useState } from 'react';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Plus, Upload,Users, BarChart3,UserCheck } from 'lucide-react';

import SecondPartyList from '../../components/admin/SecondPartyManagement/SecondPartyList';
import { SecondParty } from '../../types';
import { useSecondParties } from '../../hooks/useSecondParty';
import SecondPartyFormModal from '../../components/admin/SecondPartyManagement/SecondPartyForm';
import SecondPartyBulkUploadModal from '../../components/admin/SecondPartyManagement/SecondPartyBulkUpload';
import '../../styles/SecondPartyManagement.css';

const SecondParties: React.FC = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [editingSecondParty, setEditingSecondParty] = useState<SecondParty | null>(null);
  
  const { 
    data: secondPartiesResponse, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useSecondParties({ page: 1, limit: 10 });

  const handleCreateSecondParty = () => {
    setEditingSecondParty(null);
    setShowFormModal(true);
  };

  const handleEditSecondParty = (secondParty: SecondParty) => {
    setEditingSecondParty(secondParty);
    setShowFormModal(true);
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setEditingSecondParty(null);
  };

  const handleCloseBulkUploadModal = () => {
    setShowBulkUploadModal(false);
  };

  const handleSuccess = () => {
    refetch();
    handleCloseFormModal();
    handleCloseBulkUploadModal();
  };
 console.log(secondPartiesResponse)
  const totalSecondParties = secondPartiesResponse?.pagination?.totalItems || 0;
  const activeSecondParties = secondPartiesResponse?.data?.length || 0;

  return (
    <div className="second-parties-page">
      {/* Stats Grid */}
      {totalSecondParties > 0 && (
        <div className="stats-grid-second-parties">
          <div className="stat-card-second-parties">
            <div className="stat-value-second-parties">{totalSecondParties}</div>
            <div className="stat-label-second-parties">Total Second Parties</div>
            <Users size={24} className="stat-icon-second-parties" />
          </div>
          <div className="stat-card-second-parties">
            <div className="stat-value-second-parties">{activeSecondParties}</div>
            <div className="stat-label-second-parties">Active This Page</div>
            <UserCheck size={24} className="stat-icon-second-parties" />
          </div>
          <div className="stat-card-second-parties">
            <div className="stat-value-second-parties">
              {secondPartiesResponse?.pagination?.totalPages || 1}
            </div>
            <div className="stat-label-second-parties">Total Pages</div>
            <BarChart3 size={24} className="stat-icon-second-parties" />
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header-second-parties">
        <Row className="align-items-center">
          <Col lg={6}>
            <h1 className="page-title-second-parties">
              <div className="page-title-icon">
                <Users size={24} className="text-white" />
              </div>
              Second Party Management
            </h1>
            <p className="page-subtitle-second-parties">
              Manage second parties and their transaction information efficiently
            </p>
          </Col>
          <Col lg={6}>
            <div className="action-buttons-second-parties">
              <Button 
                className="btn-primary-second-parties"
                onClick={handleCreateSecondParty}
              >
                <Plus size={18} className="btn-icon-second-parties" />
                Add Second Party
              </Button>
              <Button
                className="btn-outline-primary-second-parties"
                onClick={() => setShowBulkUploadModal(true)}
              >
                <Upload size={18} className="btn-icon-second-parties" />
                Bulk Upload
              </Button>
          
            </div>
          </Col>
        </Row>
      </div>

      {/* Quick Actions Section */}
      <div className="quick-actions-second-parties">
        <div className="quick-actions-title">Quick Actions</div>
        <div className="quick-actions-buttons">
          <Button 
            variant="outline" 
            size="sm" 
            className="btn-outline-primary-second-parties"
            onClick={handleCreateSecondParty}
          >
            <Plus size={14} className="me-1" />
            Single Entry
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="btn-outline-primary-second-parties"
            onClick={() => setShowBulkUploadModal(true)}
          >
            <Upload size={14} className="me-1" />
            Bulk Upload
          </Button>
    
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <Alert variant="danger" className="alert-custom-second-parties alert-danger-second-parties">
          <Alert.Heading className="h6 fw-bold mb-2">
            ⚠️ Loading Error
          </Alert.Heading>
          Error loading second parties: {error instanceof Error ? error.message : 'Unknown error'}
        </Alert>
      )}

      {/* Second Party List */}
      <Card className="main-content-card-second-parties">
        <Card.Body className="card-body-second-parties">
          <SecondPartyList
            secondParties={secondPartiesResponse?.data || []}
            pagination={secondPartiesResponse?.pagination}
            isLoading={isLoading}
            onEdit={handleEditSecondParty}
            onRefetch={refetch}
          />
        </Card.Body>
      </Card>

=

      {/* Modals */}
      <SecondPartyFormModal
        show={showFormModal}
        secondParty={editingSecondParty}
        onClose={handleCloseFormModal}
        onSuccess={handleSuccess}
      />

      <SecondPartyBulkUploadModal
        show={showBulkUploadModal}
        onClose={handleCloseBulkUploadModal}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default SecondParties;