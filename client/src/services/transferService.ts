import axiosClient from "../api/axiosClient";
import { CreateTransactionSystem, CreateTransaction } from "../types/Transaction";

export const updateTransfer = async (
  id: number,
  data: CreateTransactionSystem
): Promise<{ message: string; updatedTransfer?: any }> => {
  try {
    const response = await axiosClient.patch(`/transactions/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update transfer');
  }
};



export const deleteTransfer = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/transactions/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete transfer');
  }
};

export const makeTransfer = async (data: CreateTransaction) => {
  try {
    const response = await axiosClient.post('/transactions', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create transfer');
  }
};
