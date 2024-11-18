import { apiPatch } from '../api/api';  // Assuming apiPatch is a centralized utility for PATCH requests
import { API_ENDPOINTS } from '../api/urls';
import { AccountHolder } from '../types/AccountHolder';

import { UpdateTermDepositAccount } from '../types/TermDepositAccount';

export const updateTermDepositAccount = async (id: number, accountData: UpdateTermDepositAccount) => {
  const url = `${API_ENDPOINTS.termDepositAccount.update}/${id}`;

  try {
    const response = await apiPatch<AccountHolder,UpdateTermDepositAccount>(url, accountData);
    return response.data;
  } catch (error: any) {
    console.error('Error updating Term Deposit Account:', error);
    throw new Error(error.response?.data?.message || 'Failed to update Term Deposit Account');
  }
};


