import axiosClient from "../api/axiosClient";
import { clientDebitUrl, putTransactionsUrl } from "../data/routes";
import { CreateTransaction, CreateTransactionSystem } from "../types/Transaction";

export const updateCheckingAccountTransactions = async (id: number, data: CreateTransactionSystem) => {
  const url = `${axiosClient.defaults.baseURL}${putTransactionsUrl}/${id}`;
try {
const response = await axiosClient.put(url, data);
return response.data;
} catch (error: any) {
throw new Error(error.response?.data?.message || 'Failed to update checking account');
}
};

export const clientDebit = async (id:number,data:CreateTransaction)=>{
  const url = `${axiosClient.defaults.baseURL}${clientDebitUrl}/${id}`
  try {
    const response = await axiosClient.post(url, data);
    return response.data;
  } catch (error: any) {
}
}

export const deleteTransfer = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/transaction/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete transfer');
  }
};


