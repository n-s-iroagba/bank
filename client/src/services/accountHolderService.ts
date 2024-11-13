
import axiosClient from '../api/axiosClient';
import { accountHolderLoginUrl, createAccountHolderUrl, deleteAccountHolderUrl, getAccountHolderUrl, updateAccountHolderUrl } from '../data/routes';
import { LoginData } from '../features/auth/types/authTypes';
import {  CreateAccountHolder, EditAccountHolder } from '../types/AccountHolder';

export const createAccountHolder = async (adminId:number,data: CreateAccountHolder) => {
  const url = `${axiosClient.defaults.baseURL}${createAccountHolderUrl}/${adminId}`
    try {
      const response = await axiosClient.post(url, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update account holder');
    }
  };
  

export const getAccountHoldersByAdminId = async (adminId: number) => {
    const url = `${axiosClient.defaults.baseURL}${getAccountHolderUrl}/${adminId}`
  try {
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch account holders for admin');
  }
};


export const updateAccountHolder = async (accountHolderId:number,data: EditAccountHolder) => {
    const url = `${axiosClient.defaults.baseURL}${updateAccountHolderUrl}/${accountHolderId}`
  try {
    const response = await axiosClient.patch(url, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update account holder');
  }
};


export const deleteAccountHolder = async (accountHolderId: number) => {
    const url = `${axiosClient.defaults.baseURL}${deleteAccountHolderUrl}/${accountHolderId}`
  try {
    const response = await axiosClient.delete(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete account holder');
  }
};


export const loginAccountHolder = async (data:LoginData) => {
  const url = `${axiosClient.defaults.baseURL}${accountHolderLoginUrl}`
  try {
    const response = await axiosClient.post(url, data);
  
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to log in');
    }
  };