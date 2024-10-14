import React from 'react';
import { Modal, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { Transfer } from '../types/ClientAccount';



interface Props {
  show: boolean;
  onHide: () => void;
  transfers: Transfer[];
  loading: boolean;
  error: string | null;
}

const TransfersModal: React.FC<Props> = ({ show, onHide, transfers, loading, error }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>User Transfers</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <ListGroup>
          {transfers.map((transfer) => (
            <ListGroup.Item key={transfer.id}>
              <strong>Amount:</strong> ${transfer.amount} <br />
              <strong>Description:</strong> {transfer.description} <br />
              <strong>Date:</strong> {transfer.date} <br />
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Modal.Body>
  </Modal>
);

export default TransfersModal;
