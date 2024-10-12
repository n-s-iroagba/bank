// /components/ClientAccountList.tsx
import React from 'react';
import { Table, Accordion, Card, Button } from 'react-bootstrap';
import { ClientAccount } from '../types/ClientAccount';
import ClientAccountEdit from './ClientAccountEdit';
import AddTransferForm from './AddTransferForm';


interface ClientAccountListProps {
  accounts: ClientAccount[];
  onAccountsUpdated: () => void;
}

const ClientAccountList: React.FC<ClientAccountListProps> = ({ accounts, onAccountsUpdated }) => {
  return (
    <Accordion>
      {accounts.map((account) => (
        <Card key={account.id}>
          <Card.Header>
            <Accordion.Header as={Button} variant="link" eventKey={`${account.id}`}>
              {account.username} - Checking Account: ${account.checkingAccountAmount}
            </Accordion.Header>
          </Card.Header>
          <Accordion.Collapse eventKey={`${account.id}`}>
            <Card.Body>
              <p><strong>Username:</strong> {account.username}</p>
              <p><strong>Password:</strong> {account.password}</p>
              <p><strong>Fixed Deposit:</strong> ${account.fixedDepositAmount}</p>

              <ClientAccountEdit account={account} onAccountUpdated={onAccountsUpdated} />

              <h5>Transfers</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Recipient Name</th>
                    <th>Recipient Account Number</th>
                  </tr>
                </thead>
                <tbody>
                  {account.transfers.length > 0 ? (
                    account.transfers.map((transfer) => (
                      <tr key={transfer.id}>
                        <td>{new Date(transfer.transferDate).toLocaleString()}</td>
                        <td>${transfer.amount}</td>
                        <td>{transfer.recipientName}</td>
                        <td>{transfer.recipientAccountNumber}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>No transfers made.</td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <h5>Add Transfer</h5>
              <AddTransferForm clientId={account.id} onTransferAdded={onAccountsUpdated} />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default ClientAccountList;

