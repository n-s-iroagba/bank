
import { ClientAccount, CreateClientAccount, Transfer } from '../types/ClientAccount';

let clientAccounts: ClientAccount[] = [];

export const createClientAccount = (account: CreateClientAccount) => {
  return;
};

export const getClientAccounts = (): ClientAccount[] => {
  return clientAccounts;
};

export const updateClientAccount = (id: number, updatedAccount: Partial<ClientAccount>) => {
  const accountIndex = clientAccounts.findIndex(account => account.id === id);
  if (accountIndex !== -1) {
    clientAccounts[accountIndex] = { ...clientAccounts[accountIndex], ...updatedAccount };
  }
};

export const deleteClientAccount = (id: number) => {
  clientAccounts = clientAccounts.filter(account => account.id !== id);
};





export const addTransfer = (clientId: number, transfer: Transfer) => {
  const client = clientAccounts.find(account => account.id === clientId);
  if (client) {
    transfer.id = client.transfers.length + 1;
    client.transfers.push(transfer);
  }
};

