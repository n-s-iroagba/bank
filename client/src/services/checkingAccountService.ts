import axiosClient from '../api/axiosClient';
import { EditCheckingAccount } from '../types/CheckingAccount';
import { CreateTransaction } from '../types/Transaction';

export const editBalanceAccountWithoutTransaction = async (adminId: number, data: EditCheckingAccount) => {
  try {
    const response = await axiosClient.patch(`/accounts/${adminId}/editBalanceWithoutTransaction`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to edit balance without transaction');
  }
};


export const editBalanceAccountWithTransaction = async (clientId: number, data: EditCheckingAccount) => {
  try {
    const response = await axiosClient.patch(`/accounts/${clientId}/editBalanceWithTransaction`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to edit balance with transaction');
  }
};

export const updateCheckingAccount = async (id: number, data: CreateTransaction) => {
  try {
    const response = await axiosClient.put(`/accounts/${id}/updateCheckingAccount`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update checking account');
  }
};
