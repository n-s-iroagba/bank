import { apiGet, apiPost, apiPatch, apiDelete } from '../api/api';
import { API_ENDPOINTS } from '../api/urls';

import { CreateBank, UpdateBank, Bank } from '../types/Bank';

// Get all banks
export const getAllBanks = async (): Promise<Bank[]> => {
  const url = API_ENDPOINTS.bank.getAll;
  try {
    const response = await apiGet<Bank[]>(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch banks');
  }
};

// Create a new bank
export const createBank = async (data: CreateBank): Promise<Bank> => {
  const url = API_ENDPOINTS.bank.create;
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('logo', data.logo);

    const response = await apiPost<Bank, FormData>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create bank');
  }
};

// Update a bank
export const updateBank = async (id: number, data: UpdateBank): Promise<Bank> => {
  const url = `${API_ENDPOINTS.bank.update}/${id}`;
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.logo) {
      formData.append('logo', data.logo);
    }

    const response = await apiPatch<Bank, FormData>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update bank');
  }
};

// Delete a bank
export const deleteBank = async (id: number): Promise<boolean> => {
  const url = `${API_ENDPOINTS.bank.delete}/${id}`;
  try {
    const response = await apiDelete<string>(url);
    return response.status === 204;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete bank');
  }
};
