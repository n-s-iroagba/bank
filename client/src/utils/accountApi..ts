import api from './index';

// Credit account without transfer
export const creditAccountWithoutTransfer = async (accountId: number, amount: number, token: string) => {
  return await api.post(`/credit-no-transfer/${accountId}`, { amount }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Debit account without transfer
export const debitAccountWithoutTransfer = async (accountId: number, amount: number, token: string) => {
  return await api.post(`/debit-no-transfer/${accountId}`, { amount }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Edit transfers
export const editTransfers = async (accountId: number, transferData: any, token: string) => {
  return await api.post(`/update-transfer/${accountId}`, transferData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// Create account with transfers
export const createAccount = async (accountData: any, token: string) => {
  return await api.post(`/create/account`, accountData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

