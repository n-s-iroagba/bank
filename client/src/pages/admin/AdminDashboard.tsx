import React from 'react';
import { Accordion } from 'react-bootstrap';

import AccountHolderDetails from '../../features/admin/components/AccountHolderDetails';
import CheckingAccountDetails from '../../features/admin/components/CheckingAccountDetails';
import TransferDetails from '../../features/admin/components/TransferDetails';
import TermDepositAccountDetails from '../../features/admin/components/TermDepositAccountDetails';
import SecondPartySection from '../../features/admin/components/SecondPartySection';


;


interface Client {
  id: number;
  name: string;
  checkingBalance: number;
  termDepositBalance: number;
  email: string;
}

const clients: Client[] = [
  { id: 1, name: 'John Doe', checkingBalance: 5000, termDepositBalance: 20000, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', checkingBalance: 3000, termDepositBalance: 15000, email: 'jane@example.com' },
];

const AdminDashboard = () => {


  return (
    <div>
       
      <h2 className='text-center'>Admin Dashboard</h2>
      <Accordion defaultActiveKey="0">
        {clients.map((client, index) => (
          <Accordion.Item eventKey={index.toString()} key={client.id}>
            <Accordion.Header>{client.name}</Accordion.Header>
            <Accordion.Body>
              <p><strong>Email:</strong> {client.email}</p>
              <p><strong>Checking Balance:</strong> ${client.checkingBalance}</p>
              <p><strong>Term Deposit Balance:</strong> ${client.termDepositBalance}</p>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Account Holder Details</Accordion.Header>
                  <Accordion.Body>
                    <AccountHolderDetails clientId={client.id} />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>Checking Account</Accordion.Header>
                  <Accordion.Body>
                    <CheckingAccountDetails clientId={client.id} />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>Transfers</Accordion.Header>
                  <Accordion.Body>
                    <TransferDetails clientId={client.id} />
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Recievers and Senders</Accordion.Header>
                  <Accordion.Body>
                    <SecondPartySection id={client.id} show={false} setShow={function (): void {
                      throw new Error('Function not implemented.');
                    } } />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>Term Deposit Account</Accordion.Header>
                  <Accordion.Body>
                    <TermDepositAccountDetails clientId={client.id} />
                  </Accordion.Body>
                </Accordion.Item>

            
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default AdminDashboard;



