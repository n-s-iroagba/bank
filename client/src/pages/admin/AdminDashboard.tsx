import React, { useState } from "react";
import { Accordion, Alert, Button, Col, Row, Spinner } from "react-bootstrap";
import SecondPartySection from "../../features/admin/components/SecondPartySection";
import { BaseAccountHolder } from "../../types/AccountHolder";
import CheckingAccountAccordion from "../../features/admin/components/CheckingAccountAccordion";
import TermDepositAccountAccordion from "../../features/admin/components/TermDepositAccountAccordion";
import EditAccountHolderModal from "../../features/admin/components/EditAccountHolder";
import CreateAccountHolderModal from "../../features/admin/components/CreateAccountHolderModal";
import useAccountHolders from "../../hooks/UseAccountHolders";
import { calculateDividends } from "../../utils/calculateDividends";
import ConfirmDeleteModal from "../../features/admin/components/ConfirmDeleteModal";


const AdminDashboard: React.FC<{ adminId: number; isAdmin: boolean }> = ({
  adminId,
  isAdmin,
}) => {
  const [showCreateAccountHolderModal, setShowCreateAccountHolderModal] =
    useState(false);
  const [showEditAccountHolderModal, setShowEditAccountHolderModal] =
    useState(false);
  const [showDeleteAccountHolderModal, setShowDeleteAccountHolderModal] =
    useState(false);
  const [selectedAccountHolder, setSelectedAccountHolder] =
    useState<BaseAccountHolder | null>(null);

  const { accountHolders, accountLoading, accountHoldersError } =
    useAccountHolders(adminId);

  const handleCreateAccountHolderModal = () => {
    setShowCreateAccountHolderModal(true);
  };
  const handleDeleteAccountHolderModal = (accountHolder: BaseAccountHolder) => {
    setSelectedAccountHolder(accountHolder);
    setShowDeleteAccountHolderModal(true);
  };

  const handleEditAccountHolderModal = (accountHolder: BaseAccountHolder) => {
    setSelectedAccountHolder(accountHolder);
    setShowEditAccountHolderModal(true);
  };

  const handleDelete = () => {};

  if (accountHoldersError) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Alert variant="danger">
          Error fetching account holders from server.
        </Alert>
      </div>
    );
  }
  if (accountLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <Spinner />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2 className="text-center">Admin Dashboard</h2>
        <Button
          className="mb-3"
          onClick={() => handleCreateAccountHolderModal()}
        >
          Create Account Holder
        </Button>
        <Accordion defaultActiveKey="0">
          {accountHolders.map((accountHolder, index) => {
            const { amountDeposited, startDate, durationInDays, interestRate } =
              accountHolder.termDepositAccount;
            const { dividendEarned, dividendToBeEarned } = calculateDividends(
              amountDeposited,
              startDate,
              durationInDays,
              interestRate
            );

            return (
              <Accordion.Item
                eventKey={index.toString()}
                key={accountHolder.id}
              >
                <Accordion.Header>{`${accountHolder.firstname} ${
                  accountHolder.middlename || ""
                } ${accountHolder.surname}`}</Accordion.Header>
                <Accordion.Body>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Account Holder Details
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          <strong>Username:</strong> {accountHolder.username}
                        </p>
                        <p>
                          <strong>Password:</strong> {accountHolder.password}
                        </p>

                        {isAdmin && (
                          <Row>
                            <Col lg={3} md={4} sm={12}>
                              <Button
                                variant="info"
                                className="w-100 mb-2"
                                onClick={() =>
                                  handleEditAccountHolderModal(
                                    accountHolder as BaseAccountHolder
                                  )
                                }
                              >
                                Edit Account Holder Details
                              </Button>
                            </Col>
                            <Col lg={3} md={4} sm={12}>
                              <Button
                                variant="danger"
                                className="w-100 mb-2"
                                onClick={() =>
                                  handleDeleteAccountHolderModal(
                                    accountHolder as BaseAccountHolder
                                  )
                                }
                              >
                                Delete Client
                              </Button>
                            </Col>
                          </Row>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Checking Account</Accordion.Header>
                      <Accordion.Body>
                        <CheckingAccountAccordion
                          account={accountHolder.checkingAccount}
                          adminId={adminId}
                        />
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="3">
                      <Accordion.Header>Receivers and Senders</Accordion.Header>
                      <Accordion.Body>
                        <SecondPartySection
                          secondParties={accountHolder.secondParties}
                          isAdmin={isAdmin}
                        />
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="4">
                      <Accordion.Header>Term Deposit Account</Accordion.Header>
                      <Accordion.Body>
                        <TermDepositAccountAccordion
                          account={accountHolder.termDepositAccount}
                          dividendEarned={dividendEarned}
                          dividendToBeEarned={dividendToBeEarned}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </div>
      <CreateAccountHolderModal
        show={showCreateAccountHolderModal}
        onClose={() => setShowCreateAccountHolderModal(false)}
        adminId={adminId}
      />
      {selectedAccountHolder && (
        <EditAccountHolderModal
          show={showEditAccountHolderModal}
          onClose={() => setShowEditAccountHolderModal(false)}
          accountHolder={selectedAccountHolder}
          accountHolderId={selectedAccountHolder?.id}
        />
      )}

      <ConfirmDeleteModal
        show={showDeleteAccountHolderModal}
        onClose={() => setShowDeleteAccountHolderModal(false)}
        onConfirm={handleDelete}
        message={""}
      />
    </>
  );
};

export default AdminDashboard;
