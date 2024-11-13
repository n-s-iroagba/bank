import axiosClient from '../api/axiosClient';
import { editCheckingAccountBalanceNoTransactionUrl, editCheckingAccountBalanceWithTransactionUrl } from '../data/routes';
import { CreateCheckingAccount, EditCheckingAccount } from '../types/CheckingAccount';

export const editBalanceWithoutTransaction = async (adminId: number, data: EditCheckingAccount) => {
    const url = `${axiosClient.defaults.baseURL}${editCheckingAccountBalanceNoTransactionUrl}/${adminId}`;
  try {
    const response = await axiosClient.patch(url, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to edit balance without transaction');
  }
};


export const editBalanceWithTransaction = async (adminId: number, data: EditCheckingAccount) => {
    const url = `${axiosClient.defaults.baseURL}${editCheckingAccountBalanceWithTransactionUrl}/${adminId}`
  
  try {
    const response = await axiosClient.patch(url, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to edit balance with transaction');
  }
};


export const updateCheckingAccount = async (id:number,data: CreateCheckingAccount)=>{
  const url = `${axiosClient.defaults.baseURL}/checking-account/${id}`;
  try {
    const response = await axiosClient.put(url, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update checking account');
  }
}