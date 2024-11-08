import React, { useState } from 'react';
import {  Accordion, Button } from 'react-bootstrap';



import CreateSecondPartyModal from './CreateSecondPartyModal';
import EditSecondPartyModal from './EditSecondPartyModal';
import { SecondParty } from '../../../types/SecondParty';
import { ModalProps } from '../../../types/ModalProps';




const SecondPartySection: React.FC<ModalProps&{isAdmin:boolean}> = ({ show, id,isAdmin }) => {
  const [secondParties, setSecondParties] = useState<SecondParty[]>([]);

  const [selectedSecondParty, setSelectedSecondParty] = useState<SecondParty | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleEditSecondParty = (secondParty: SecondParty) => {
    setSelectedSecondParty(secondParty);
    setShowEditModal(true);
  };

  const handleDeleteSecondParty = (secondPartyId: number) => {
    setSecondParties(secondParties.filter(sp => sp.id !== secondPartyId));
  };


  return (
    <>
   
          <Button variant="primary" onClick={() => setShowCreateModal(true)} className="mb-3">
            Add Second Party
          </Button>
          <Accordion>
            {secondParties.map((secondParty, index) => (
              <Accordion.Item eventKey={index.toString()} key={secondParty.id}>
                <Accordion.Header>{secondParty.firstname} {secondParty.surname}</Accordion.Header>
                <Accordion.Body>
                  <p><strong>Bank:</strong> {secondParty.bank?.name}</p>
                  <p><strong>Account Number:</strong> {secondParty.accountNumber}</p>

                  {isAdmin&&
                    <>
                  <Button variant="info" onClick={() => handleEditSecondParty(secondParty)} className="me-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteSecondParty(secondParty.id)}>
                    Delete
                  </Button>
                  </>
}

                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
    

      <CreateSecondPartyModal show={showCreateModal} id={0} />
  
      {selectedSecondParty && (
        <EditSecondPartyModal show={showEditModal} secondParty={selectedSecondParty} banks={[]} onClose={()=>setShowEditModal(false) }   
   
         
        />
      )}
    </>
  );
};

export default SecondPartySection;
