
import axiosClient from '../api/axiosClient';
import { BaseAccountHolder, CreateAccountHolder } from '../types/AccountHolder';

export const createAccountHolder = async (data: CreateAccountHolder) => {
    try {
      const response = await axiosClient.post(`/account-holders/`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update account holder');
    }
  };
  

export const getAccountHoldersByAdminId = async (adminId: number) => {
  try {
    const response = await axiosClient.get(`/account-holders/admin/${adminId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch account holders for admin');
  }
};


export const updateAccountHolder = async (data: BaseAccountHolder) => {
  try {
    const response = await axiosClient.patch(`/account-holders/${data.id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update account holder');
  }
};


export const deleteAccountHolder = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/account-holders/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete account holder');
  }
};


export const loginAccountHolder = async (username: string, password: string) => {
    try {
      const response = await axiosClient.post('/account-holders/login', { username, password });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to log in');
    }
  };