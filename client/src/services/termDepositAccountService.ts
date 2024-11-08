import axiosClient from '../api/axiosClient';
import { EditTermDepositAccount } from '../types/TermDepositAccount';



export const updateTermDepositAccount = async (id: number, accountData: EditTermDepositAccount ) => {
  try {
    const response = await axiosClient.patch(`/term-deposit-accounts/${id}`, accountData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update Term Deposit Account');
  }
};


export const deleteTermDepositAccount = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/term-deposit-accounts/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete Term Deposit Account');
  }
};
