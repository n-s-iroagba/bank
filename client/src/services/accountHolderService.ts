import { apiDelete, apiGet, apiPatch, apiPost } from '../api/api';
import { API_ENDPOINTS } from '../api/urls';
import {  AccountHolder, CreateAccountHolder, UpdateAccountHolder } from '../types/AccountHolder';

export const createAccountHolder = async (adminId:number,data: CreateAccountHolder) => {
  const url = `${API_ENDPOINTS.accountHolder.create}/${adminId}`
    try {
      const response = await apiPost<AccountHolder,CreateAccountHolder>(url, data);
      return response.data;
    } catch (error: any) {
      console.error(error)
      throw new Error(error.response?.data?.message || 'Failed to update account holder');
    }
  };
  

export const getAccountHoldersByAdminId = async (adminId: number) => {
    const url = `${API_ENDPOINTS.accountHolder.get}/${adminId}`
  try {
    const response = await apiGet<AccountHolder[]>(url);
    console.log('RESPONSE', response.data);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw new Error(error.response?.data?.message || 'Failed to fetch account holders for admin');
  }
};


export const updateAccountHolder = async (accountHolderId:number,data: UpdateAccountHolder) => {
    const url = `${API_ENDPOINTS.accountHolder.update}/${accountHolderId}`
  try {
    const response = await apiPatch<AccountHolder,UpdateAccountHolder>(url, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update account holder');
  }
};


export const deleteAccountHolder = async (accountHolderId: number) => {
      const url = `${API_ENDPOINTS.accountHolder.delete}/${accountHolderId}`
  try {
    const response = await apiDelete<string>(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete account holder');
  }
};


