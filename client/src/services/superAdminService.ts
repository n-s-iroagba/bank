import axiosClient from '../api/axiosClient';
import { LoginData } from '../features/auth/types/authTypes';
import { CreateAdmin } from '../types/Admin';




// Register SuperAdmin
export const registerSuperAdmin = async (username: string, password: string, email: string) => {
  try {
    const response = await axiosClient.post('/superadmin/register', { username, password, email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to register SuperAdmin');
  }
};

// Verify SuperAdmin Email
export const verifySuperAdminEmail = async (username: string, code: string) => {
  try {
    const response = await axiosClient.post('/superadmin/verify-email', { username, code });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to verify email');
  }
};

// SuperAdmin Login
export const loginSuperAdmin = async (data:LoginData) => {
  try {
    const response = await axiosClient.post('/superadmin/login', {...data });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to log in');
  }
};

// Create Admin by SuperAdmin
export const createAdmin = async (superAdminId: number, data: CreateAdmin) => {
  try {
    const response = await axiosClient.post(`/superadmin/${superAdminId}/admin`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create Admin');
  }
};

// Get All Admins
export const getAllAdmins = async () => {
  try {
    const response = await axiosClient.get('/superadmin/admins');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to retrieve Admins');
  }
};

// Update Admin by SuperAdmin
export const updateAdmin = async (adminId: number, data: CreateAdmin) => {
  try {
    const response = await axiosClient.put(`/superadmin/admins/${adminId}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update Admin');
  }
};

// Delete Admin by SuperAdmin
export const deleteAdmin = async (adminId: number) => {
  try {
    const response = await axiosClient.delete(`/superadmin/admins/${adminId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete Admin');
  }
};

// Change SuperAdmin Password
export const changeSuperAdminPassword = async (superAdminId: number, newPassword: string) => {
  try {
    const response = await axiosClient.put(`/superadmin/${superAdminId}/change-password`, { newPassword });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to change SuperAdmin password');
  }
};

// Request SuperAdmin Password Reset
export const requestSuperAdminPasswordReset = async (email: string) => {
  try {
    const response = await axiosClient.post('/superadmin/request-password-reset', { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to request password reset');
  }
};
