import React, { useState } from "react";
import { Accordion, Button, Image } from "react-bootstrap";
import useBanks from "../../hooks/useBanks";
import AdminDashboardLayout from "../../components/AdminDashboardLayout";
import { Bank } from "../../types/Bank";
import UpdateBankModal from "../../components/UpdateBankModal";
import BankUploadModal from "../../components/BankUploadModal";

const BankList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const adminId = 1;
  const { banks } = useBanks();

  const handleEditClick = (bank: Bank) => {
    setSelectedBank(bank);
    setShowModal(true);
  };

  const handleDeleteClick = (bankId: number) => {
    if (window.confirm("Are you sure you want to delete this bank?")) {
      // Implement delete logic here
    }
  };

  return (
    <>
      <AdminDashboardLayout adminId={adminId}>
        <div>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Bank
          </Button>
        </div>

        <Accordion>
          {banks.map((bank: Bank, index: number) => (
            <Accordion.Item eventKey={index.toString()} key={bank.id}>
              <Accordion.Header>
                <Image
                  src={bank.logo}
                  alt={`${bank.name} logo`}
                  rounded
                  style={{ width: "30px", height: "30px", marginRight: "10px" }}
                />
                {bank.name}
              </Accordion.Header>
              <Accordion.Body>
                <div className="d-flex justify-content-between align-items-center">
                 
                  <div>
                    <Button
                      variant="primary"
                      className="me-2"
                      onClick={() => handleEditClick(bank)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="me-2"
                      onClick={() => handleDeleteClick(bank.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        {showModal && selectedBank && (
          <UpdateBankModal
            show={showModal}
            onHide={() => setShowModal(false)}
            bankToBeUpdated={selectedBank}
          />
        )}
        {showModal && !selectedBank && (
          <BankUploadModal
            show={showModal}
            onHide={() => setShowModal(false)}
          />
        )}
      </AdminDashboardLayout>
    </>
  );
};

export default BankList;
