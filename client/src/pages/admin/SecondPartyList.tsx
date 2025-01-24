import React, { useState } from "react";
import { Accordion, Alert, Button, Spinner } from "react-bootstrap";

import useSecondParty from "../../hooks/useSecondParty";
import useBanks from "../../hooks/useBanks";
import { SecondParty } from "../../types/SecondParty";
import AdminDashboardLayout from "../../components/AdminDashboardLayout";
import SecondPartyUploadModal from "../../components/SecondPartyUploadModal";
import UpdateSecondPartyModal from "../../components/UpdateSecondPartyModal";
import useAuth from "../../hooks/useAuth";


const SecondPartyList: React.FC = () => {
  const [selectedSecondParty, setSelectedSecondParty] =
    useState<SecondParty | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

   const { banks, bankLoading } = useBanks();

  const {adminId, superAdminId} = useAuth()
  const {secondParties} = useSecondParty(adminId);

  const handleUpdateSecondParty = (secondParty: SecondParty) => {
    setSelectedSecondParty(secondParty);
    setShowUpdateModal(true);
  };

  const handleDeleteSecondParty = (secondPartyId: number) => {
    const selected = secondParties.find((sp) => sp.id !== secondPartyId);
    selected && setSelectedSecondParty(selected);
  };
  if (!banks.length &&!bankLoading)
    return <AdminDashboardLayout superAdminId={superAdminId}>
      <div className="d-flex justify-content-center">
      <Alert className="text-center" variant="danger">Add Banks first</Alert>
      </div>
    </AdminDashboardLayout>

  return (
    <AdminDashboardLayout superAdminId={superAdminId}>
      <div className="d-flex justify-content-center">
      <Button
        
        onClick={() => setShowCreateModal(true)}
        className="mb-3 button-radius bg-blue"
      >
        Add Second Party
      </Button>
      </div>
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
         
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <SecondPartyUploadModal show={showCreateModal} onHide={()=>setShowCreateModal(false)}  />
      {showUpdateModal &&
        (selectedSecondParty && banks ? (
          <UpdateSecondPartyModal
          show={showUpdateModal}
          secondPartyToBeUpdated={selectedSecondParty}

          onHide={() => setShowUpdateModal(false)} adminId={0}          />
        ) : bankLoading ? (
          <Spinner title="Loading..." />
        ) : (
          <Alert variant="danger">Error Occurred</Alert>
        ))}
    </AdminDashboardLayout>
  );
};

export default SecondPartyList;
