import { Modal, Button } from "react-bootstrap";

const ConfirmDeleteModal: React.FC<{
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }> = ({ show, onClose, onConfirm }) => (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this term deposit account?</Modal.Body>
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