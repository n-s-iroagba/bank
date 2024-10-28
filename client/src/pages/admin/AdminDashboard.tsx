import React, { useState } from 'react';
import { Accordion, Button, Row, Col } from 'react-bootstrap';
import BeneficiaryModal from '../../features/admin/components/BeneficiaryModal';


import AddTransferForm from '../../features/admin/components/AddTransferForm';

;


interface Client {
  id: number;
  name: string;
  checkingBalance: number;
  termDepositBalance: number;
  email: string;
}

const dummyClients: Client[] = [
  { id: 1, name: 'John Doe', checkingBalance: 5000, termDepositBalance: 20000, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', checkingBalance: 3000, termDepositBalance: 15000, email: 'jane@example.com' },
];

const AdminDashboard = () => {
  const [clients, setClients] = useState<Client[]>(dummyClients);
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  // const [showAddTransferModal, setShowAddTransferModal] = useState(true);
  // const [showEditClient, setShowEditClient] = useState(false);
  // const [showTermDeposit, setShowTermDeposit] = useState(false);
  // const [showCheckingAccount, setShowCheckingAccount] = useState(false);


  // const [clientId, setClientId] = useState(0)

  const handleCreditCheckingVisible = (clientId: number) => {
    console.log(`Credit Checking Account (visible) for client ID: ${clientId}`)
  }
  
  const handleCreditCheckingInvisible = (clientId: number) => {
    console.log(`Credit Checking Account (invisible) for client ID: ${clientId}`);
  };

  const handleDebitCheckingVisible = (clientId: number) => {
    console.log(`Debit Checking Account (visible) for client ID: ${clientId}`);
  };

  const handleDebitCheckingInvisible = (clientId: number) => {
    console.log(`Debit Checking Account (invisible) for client ID: ${clientId}`);
  };

  // const handleDebitTermDeposit = (clientId: number) => {
  //   console.log(`Debit Term Deposit Account for client ID: ${clientId}`);
  // };

  const handleDeleteClient = (clientId: number) => {
    setClients(clients.filter(client => client.id !== clientId));
  };

  const handleEditClient = (clientId: number) => {
    console.log(`Edit Client Details for client ID: ${clientId}`);
  };

  const handleEditCheckingAccountDetails = (clientId: number) => {
    console.log(`Edit Checking Account Details for client ID: ${clientId}`);
  };

  const handleEditTermDepositDetails = (clientId: number) => {
    console.log(`Edit Term Deposit Details for client ID: ${clientId}`);
  };
  const handleViewCheckingAccountTransfers = (clientId: number)=>{
    console.log(`View Checking Account Transfers for client ID: ${clientId}`);
  }
  const handleViewTermDepositDetails = (clientId: number)=>{
    console.log(`View Checking Account Transfers for client ID: ${clientId}`);
  }
  const handleViewBenefeciaries =(clientId:number)=>{
    setShowBeneficiaryModal(true)
    console.log('View Beneficiaries');
  }
  <div>

</div>

  return (
    <div>
       <AddTransferForm clientId={0} show={true}/>
 
        <BeneficiaryModal show={showBeneficiaryModal} handleClose={() => setShowBeneficiaryModal(false)} clientId={0} />
      <h2>Admin Dashboard</h2>
      <Accordion defaultActiveKey="0">
        {clients.map((client, index) => (
          <Accordion.Item eventKey={index.toString()} key={client.id}>
            <Accordion.Header>{client.name}</Accordion.Header>
            <Accordion.Body>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Checking Balance:</strong> ${client.checkingBalance}</p>
              <p><strong>Term Deposit Balance:</strong> ${client.termDepositBalance}</p>

              <Row>
                <Col lg={3} md={4} sm={12}>
                  <Button variant="success" className="w-100 mb-2" onClick={() => handleCreditCheckingVisible(client.id)}>
                    Credit Checking (Visible)
                  </Button>
                </Col>
                <Col lg={3} md={4} sm={12}>
                  <Button variant="secondary" className="w-100 mb-2" onClick={() => handleCreditCheckingInvisible(client.id)}>
                    Credit Checking (Invisible)
                  </Button>
                </Col>
                <Col lg={3} md={4} sm={12}>
                  <Button variant="danger" className="w-100 mb-2" onClick={() => handleDebitCheckingVisible(client.id)}>
                    Debit Checking (Visible)
                  </Button>
                </Col>
                <Col lg={3} md={4} sm={12}>
                  <Button variant="warning" className="w-100 mb-2" onClick={() => handleDebitCheckingInvisible(client.id)}>
                    Debit Checking (Invisible)
                  </Button>
                </Col>
                <Col lg={3} md={4} sm={12}>
                  <Button variant="info" className="w-100 mb-2" onClick={() => handleViewCheckingAccountTransfers(client.id)}>
                    View Checking Account Transfers
                  </Button>
                </Col>
                <Col lg={3} md={4} sm={12}>
                  <Button variant="info" className="w-100 mb-2" onClick={() => handleViewTermDepositDetails(client.id)}>
                    View Term Deposit Account Details
                  </Button>
                </Col>
                <Col lg={3} md={4} sm={12}>
                  <Button variant="info" className="w-100 mb-2" onClick={() => handleEditClient(client.id)}>
                    Edit Client Details
                  </Button>
                </Col>

                <Col lg={3} md={4} sm={12}>
                  <Button variant="info" className="w-100 mb-2" onClick={() => handleViewBenefeciaries(client.id)}>
                     Beneficiaries
                  </Button>
                </Col>
               
                <Col lg={3} md={4} sm={12}>
                  <Button variant="info" className="w-100 mb-2" onClick={() => handleEditCheckingAccountDetails(client.id)}>
                    Edit Checking Account
                  </Button>
                </Col>
                <Col lg={3} md={4} sm={12}>
                  <Button variant="info" className="w-100 mb-2" onClick={() =>  handleEditTermDepositDetails(client.id)}>
                    Edit Term Deposit Account
                  </Button>
                </Col>
                <Col lg={3} md={4} sm={12}>
                  <Button variant="danger" className="w-100 mb-2" onClick={() => handleDeleteClient(client.id)}>
                    Delete Client
                  </Button>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default AdminDashboard;



