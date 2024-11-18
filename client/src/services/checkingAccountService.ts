
import { apiPatch, apiPost } from '../api/api';
import { API_ENDPOINTS } from '../api/urls';
import { CreateCheckingAccount, UpdateCheckingAccount } from '../types/CheckingAccount';
import { CreateTransaction } from '../types/Transaction';

// Update balance without transaction
export const editBalanceWithoutTransaction = async (adminId: number, data: UpdateCheckingAccount) => {
  const url = `${API_ENDPOINTS.checkingAccount.noTransaction}/${adminId}`;
  try {
    const response = await apiPatch( url,data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to edit balance without transaction');
  }
};

// Update balance with transaction
export const editBalanceWithTransaction = async (adminId: number, data: UpdateCheckingAccount) => {
  const url = `${API_ENDPOINTS.checkingAccount.withTransaction}/${adminId}`;
  try {
    const response = await apiPatch( url,data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to edit balance with transaction');
  }
};

// Update checking account
export const updateCheckingAccount = async (id: number, data: CreateCheckingAccount) => {
  const url = `${API_ENDPOINTS.checkingAccount.update}/${id}`;
  try {
    const response = await apiPatch( url,data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update checking account');
  }
};

// Client debit
export const clientDebit = async (accountHolderId: number, data: CreateTransaction) => {
  const url = `${API_ENDPOINTS.checkingAccount.debit}/${accountHolderId}`;
  try {
    const response = await apiPost( url,data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to process client debit');
  }
};
