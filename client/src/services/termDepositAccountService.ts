import axiosClient from '../api/axiosClient';
import { updateTermDepositAccountUrl } from '../data/routes';
import { EditTermDepositAccount } from '../types/TermDepositAccount';



export const updateTermDepositAccount = async (id: number, accountData: EditTermDepositAccount ) => {
    const url = `${axiosClient.defaults.baseURL}${updateTermDepositAccountUrl}/${id}`
  try {
    const response = await axiosClient.patch(url, accountData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update Term Deposit Account');
  }
};



