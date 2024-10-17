import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

interface CreateBeneficiaryFormProps {
  onSubmit: (beneficiaryData: { name: string; bank: string; accountNumber: string }) => void;
  onCancel: () => void;
}

const CreateBeneficiaryForm: React.FC<CreateBeneficiaryFormProps> = ({ onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [bank, setBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ name, bank, accountNumber });
    // Reset form fields
    setName('');
    setBank('');
    setAccountNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="beneficiaryName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />
      </Form.Group>

      <Form.Group controlId="beneficiaryBank" className="mt-3">
        <Form.Label>Bank</Form.Label>
        <Form.Control
          type="text"
          value={bank}
          onChange={(e) => setBank(e.target.value)}
          placeholder="Enter bank name"
          required
        />
      </Form.Group>

      <Form.Group controlId="beneficiaryAccountNumber" className="mt-3">
        <Form.Label>Account Number</Form.Label>
        <Form.Control
          type="text"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Enter account number"
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end mt-4">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Create Beneficiary
        </Button>
      </div>
    </Form>
  );
};

const CreateBeneficiaryFormModal:React.FC<{initialShow:boolean}> = ({initialShow}) =>{
    const [showCreateModal,setShowCreateModal] = useState<boolean>(false)
    useEffect(()=>{
        setShowCreateModal(initialShow)
    }, [initialShow])

    const handleAddBeneficiary = () =>{
        setShowCreateModal(false)
        // Call your addBeneficiary function here
  
    }
    return<>
     <Modal show={initialShow} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Beneficiary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBeneficiaryForm 
            onSubmit={handleAddBeneficiary} 
            onCancel={() => setShowCreateModal(false)} 
          />
        </Modal.Body>
      </Modal>
    
    </>
}
export default CreateBeneficiaryFormModal