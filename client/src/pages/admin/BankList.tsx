import React, { useState } from "react";
import { Accordion, Button, Image } from "react-bootstrap";
import useBanks from "../../hooks/useBanks";
import AdminDashboardLayout from "../../components/AdminDashboardLayout";
import { Bank } from "../../types/Bank";
import UpdateBankModal from "../../components/UpdateBankModal";
import BankUploadModal from "../../components/BankUploadModal";
import { API_ENDPOINTS } from "../../api/urls";
import { apiDelete } from "../../api/api";
import useAuth from "../../hooks/useAuth";

const BankList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const {superAdminId, adminId}= useAuth()
  const { banks } = useBanks();
  console.log(adminId)

  const handleEditClick = (bank: Bank) => {
    if (adminId === Number(bank.listerId)) {
      setSelectedBank(bank);
      setShowModal(true);
    } else {
      alert("You are not authorized to edit this bank")
    }
  };

  const handleDeleteClick = async (bank: Bank) => {
    if (adminId === Number(bank.listerId)) {
      if (window.confirm("Are you sure you want to delete this bank?")) {
        try {
          await apiDelete(`${API_ENDPOINTS.bank.delete}/${bank.id}`)
          window.location.reload()
        } catch (error: any) {
          console.error(error)
          alert("Failed to delete bank")
        }
      }
    } else {
      alert("You are not authorized to delete this bank")

    };
  }
    return (
      <>
        <AdminDashboardLayout superAdminId={superAdminId} >
          <div className="d-flex justify-content-center mb-3">
            <Button className="button-radius bg-blue button-width" onClick={() => setShowModal(true)}>
              Add Bank
            </Button>
          </div>

          {banks.length ? <Accordion>
            {banks.map((bank: Bank, index: number) => (
              <Accordion.Item eventKey={index.toString()} key={bank.id}>
                <Accordion.Header
                  onClick={() => setShowModal(false)}
                >
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
                        onClick={() => handleDeleteClick(bank)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
            : <div className="text-center mt-5">No Banks Added Yet.</div>}
          {showModal && selectedBank && (
            <UpdateBankModal bankName={selectedBank.name}
              existingLogoUrl={selectedBank.logo}
              show={showModal}
              handleClose={() => setShowModal(false)}
            />
          )}
          {showModal && !selectedBank && (
            <BankUploadModal
              show={showModal} 
              listerId={adminId}
              onClose={() => setShowModal(false)}
            />
          )}
        </AdminDashboardLayout>
      </>
    );
  };


  export default BankList;
