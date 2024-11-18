import axiosClient from "../api/axiosClient";
import {  deleteTransactionUrl, putTransactionsUrl } from "../data/routes";
import {  CreateTransactionSystem } from "../types/Transaction";

export const updateCheckingAccountTransactions = async (checkingAccountId: number, data: CreateTransactionSystem) => {
  const url = `${axiosClient.defaults.baseURL}${putTransactionsUrl}/${checkingAccountId}`;
try {
const response = await axiosClient.put(url, data);
return response.data;
} catch (error: any) {
throw new Error(error.response?.data?.message || 'Failed to update checking account');
}
};



export const deleteTransfer = async (id: number) => {
  const url = `${axiosClient.defaults.baseURL}${deleteTransactionUrl}/${id}`;
  try {
    const response = await axiosClient.delete(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete transfer');
  }
};


