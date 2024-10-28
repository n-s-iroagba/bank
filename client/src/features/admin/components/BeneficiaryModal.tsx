import React, { useState } from 'react';
import { Modal, Accordion, Button } from 'react-bootstrap';
import EditBeneficiaryFormModal from './EditBeneficiaryFormModal';
import CreateBeneficiaryFormModal from './CreateBeneficiaryFormModal';


interface Beneficiary {
  id: number;
  name: string;
  bank: string;
  accountNumber: string;
}

interface BeneficiaryModalProps {
  show: boolean;
  handleClose: () => void;
  clientId:number
}

const BeneficiaryModal: React.FC<BeneficiaryModalProps> = ({ show, handleClose, clientId }) => {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([
    { id: 1, name: 'John Doe', bank: 'Bank A', accountNumber: '1234567890' },
    { id: 2, name: 'Jane Smith', bank: 'Bank B', accountNumber: '0987654321' },
    { id: 3, name: 'John Doe', bank: 'Bank A', accountNumber: '1234567890' },
    { id: 4, name: 'Jane Smith', bank: 'Bank B', accountNumber: '0987654321' },
    { id: 5, name: 'John Doe', bank: 'Bank A', accountNumber: '1234567890' },
    { id: 6, name: 'Jane Smith', bank: 'Bank B', accountNumber: '0987654321' },
  ]);

  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);



  const handleEditBeneficiary = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setShowEditModal(true);
  };

  const handleDeleteBeneficiary = (beneficiaryId: number) => {
    setBeneficiaries(beneficiaries.filter(b => b.id !== beneficiaryId));
  };

  const handleUpdateBeneficiary = (beneficiaryId: number, updatedData: { name: string; bank: string; accountNumber: string }) => {
    setBeneficiaries(beneficiaries.map(b => (b.id === beneficiaryId ? { ...b, ...updatedData } : b)));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Beneficiary List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button variant="primary" onClick={() => setShowCreateModal(true)} className="mb-3">
            Add Beneficiary
          </Button>
          <Accordion>
            {beneficiaries.map((beneficiary, index) => (
              <Accordion.Item eventKey={index.toString()} key={beneficiary.id}>
                <Accordion.Header>{beneficiary.name}</Accordion.Header>
                <Accordion.Body>
                  <p><strong>Bank:</strong> {beneficiary.bank}</p>
                  <p><strong>Account Number:</strong> {beneficiary.accountNumber}</p>
                  <Button variant="info" onClick={() => handleEditBeneficiary(beneficiary)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteBeneficiary(beneficiary.id)}>
                    Delete
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Modal.Body>
      </Modal>

      <CreateBeneficiaryFormModal initialShow={showCreateModal} />
  
      {selectedBeneficiary && (
        <EditBeneficiaryFormModal 
          beneficiary={selectedBeneficiary} 
          show={showEditModal} 
          handleClose={() => setShowEditModal(false)} 
          onSubmit={handleUpdateBeneficiary} 
        />
      )}
    </>
  );
};

export default BeneficiaryModal;

