import React, { useState } from "react";
import { Accordion, Alert, Button, Spinner } from "react-bootstrap";
import SecondPartyModal from "../../components/SecondPartyModal";
import useSecondParty from "../../hooks/useSecondParty";
import useBanks from "../../hooks/useBanks";
import { SecondParty } from "../../types/SecondParty";

const SecondPartyList: React.FC<{
  isAdmin: boolean;
  adminId:number
}> = ({ adminId, isAdmin }) => {
  const [selectedSecondParty, setSelectedSecondParty] =
    useState<SecondParty | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { banks, bankLoading } = useBanks();

  const {secondParties} = useSecondParty(adminId);

  const handleUpdateSecondParty = (secondParty: SecondParty) => {
    setSelectedSecondParty(secondParty);
    setShowUpdateModal(true);
  };

  const handleDeleteSecondParty = (secondPartyId: number) => {
    const selected = secondParties.find((sp) => sp.id !== secondPartyId);
    selected && setSelectedSecondParty(selected);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShowCreateModal(true)}
        className="mb-3"
      >
        Add Second Party
      </Button>
      <Accordion>
        {secondParties.map((secondParty, index) => (
          <Accordion.Item eventKey={index.toString()} key={secondParty.id}>
            <Accordion.Header>
              {secondParty.firstName} {secondParty.surname}
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <strong>Bank:</strong> {secondParty.bank?.name}
              </p>
              <p>
                <strong>Account Number:</strong> {secondParty.accountNumber}
              </p>

              {isAdmin && (
                <>
                  <Button
                    variant="info"
                    onClick={() => handleUpdateSecondParty(secondParty)}
                    className="me-2"
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteSecondParty(secondParty.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <SecondPartyModal show={showCreateModal} id={0} />
      {showUpdateModal &&
        (selectedSecondParty && banks ? (
          <SecondPartyModal
            show={showUpdateModal}
            secondParty={selectedSecondParty}
            banks={banks}
            onClose={() => setShowUpdateModal(false)}
          />
        ) : bankLoading ? (
          <Spinner title="Loading..." />
        ) : (
          <Alert variant="danger">Error Occurred</Alert>
        ))}
    </>
  );
};

export default SecondPartyList;
