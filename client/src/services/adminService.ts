import axiosClient from "../api/axiosClient";
import { LoginData } from "../features/auth/types/authTypes";
import { CreateAdmin } from "../types/Admin";

export const loginAdmin = async (data:LoginData) => {
    try {
      const response = await axiosClient.post('/admin/login', { ...data });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to log in');
    }
  };


export const createAdmin = async (superAdminId: number, data: CreateAdmin) => {
  try {
    const response = await axiosClient.post(`/superadmin/${superAdminId}/admin`, data);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw new Error(error.response?.data?.message || 'Failed to create Admin');
  }
};


export const getAllAdmins = async (id:number) => {
  try {
    const response = await axiosClient.get(`http://localhost:8000/admins/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw new Error(error.response?.data?.message || 'Failed to retrieve Admins');
  }
};


export const updateAdmin = async (adminId: number, data: CreateAdmin) => {
  try {
    const response = await axiosClient.put(`/superadmin/admins/${adminId}`, data);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw new Error(error.response?.data?.message || 'Failed to update Admin');
  }
};


export const deleteAdmin = async (adminId: number) => {
  try {
    const response = await axiosClient.delete(`/superadmin/admins/${adminId}`);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw new Error(error.response?.data?.message || 'Failed to delete Admin');
  }
};