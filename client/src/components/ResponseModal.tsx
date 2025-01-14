import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ResponseModalProps {
  show: boolean;
  onClose: () => void;
  onNavigate: () => void;
  message: string;
  imageUrl: string;
}

const ResponseModal: React.FC<ResponseModalProps> = ({
  show,
  onClose,
  onNavigate,
  message,
  imageUrl,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Body className="text-center">
        {imageUrl && <img src={imageUrl} alt="Response" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />}
        <p className="mt-3">{message}</p>
      </Modal.Body>
      <Modal.Footer>
     
        <Button variant="primary" onClick={onNavigate}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResponseModal;
