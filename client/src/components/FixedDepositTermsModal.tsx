
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { apiPost, apiGet } from '../api/api';
import { API_ENDPOINTS } from '../api/urls';

interface Term {
  duration: number;
  yieldPercentage: number;
}

interface Props {
  show: boolean;
  onClose: () => void;
}

const FixedDepositTermsModal: React.FC<Props> = ({ show, onClose }) => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [newTerm, setNewTerm] = useState<Term>({ duration: 3, yieldPercentage: 5 });

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const response = await apiGet(API_ENDPOINTS.fixedDeposit.getTerms);
      setTerms(response.data);
    } catch (error) {
      console.error('Failed to fetch terms:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiPost(API_ENDPOINTS.fixedDeposit.createTerm, newTerm);
      fetchTerms();
      setNewTerm({ duration: 3, yieldPercentage: 5 });
    } catch (error) {
      console.error('Failed to add term:', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Manage Fixed Deposit Terms</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Current Terms</h5>
        <div className="mb-4">
          {terms.map((term, index) => (
            <div key={index} className="d-flex justify-content-between mb-2">
              <span>{term.duration} months</span>
              <span>{term.yieldPercentage}% yield</span>
            </div>
          ))}
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Duration (months)</Form.Label>
            <Form.Control
              type="number"
              value={newTerm.duration}
              onChange={(e) => setNewTerm({...newTerm, duration: parseInt(e.target.value)})}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Yield Percentage</Form.Label>
            <Form.Control
              type="number"
              step="0.1"
              value={newTerm.yieldPercentage}
              onChange={(e) => setNewTerm({...newTerm, yieldPercentage: parseFloat(e.target.value)})}
            />
          </Form.Group>
          <Button type="submit" className="w-100">Add New Term</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FixedDepositTermsModal;
