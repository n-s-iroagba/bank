import React from "react";
import {  Button, Modal } from "react-bootstrap";

const ConfirmDeleteModal: React.FC<{
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message:string;
}> = ({ show, onClose, message, onConfirm }) => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Deletion</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        Confirm
      </Button>
    </Modal.Footer>
  </Modal>
);


export default ConfirmDeleteModal