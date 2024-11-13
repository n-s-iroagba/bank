import axiosClient from "../api/axiosClient";
import { createAdminUrl, deleteAdminUrl, getAdminUrl, loginUrlAdmin, updateAdminUrl } from "../data/routes";
import { LoginData } from "../features/auth/types/authTypes";
import { CreateAdmin, EditAdmin } from "../types/Admin";

export const loginAdmin = async (data:LoginData) => {
  const url = `${axiosClient.defaults.baseURL}${loginUrlAdmin}`

  try {
    const response = await axiosClient.post(url, data);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to log in');
    }
  };


export const createAdmin = async (superAdminId: number, data: CreateAdmin) => {
  const url = `${axiosClient.defaults.baseURL}${createAdminUrl}/${superAdminId}`

  try {
    const response = await axiosClient.post(url, data);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw new Error(error.response?.data?.message || 'Failed to create Admin');
  }
};


export const getAllAdmins = async (id:number) => {
  const url = `${axiosClient.defaults.baseURL}${getAdminUrl}/${id}`;
  try {
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw new Error(error.response?.data?.message || 'Failed to retrieve Admins');
  }
};


export const updateAdmin = async (adminId: number, data: EditAdmin) => {
  const url = `${axiosClient.defaults.baseURL}${updateAdminUrl}/${adminId}`;
  try {
    const response = await axiosClient.put(url, data);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw new Error(error.response?.data?.message || 'Failed to update Admin');
  }
};


export const deleteAdmin = async (adminId: number) => {
  const url = `${axiosClient.defaults.baseURL}${deleteAdminUrl}/${adminId}`;
  
  try {
    const response = await axiosClient.delete(url);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw new Error(error.response?.data?.message || 'Failed to delete Admin');
  }
};