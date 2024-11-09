import axiosClient from '../api/axiosClient';
import { LoginData } from '../features/auth/types/authTypes';

export const registerSuperAdmin = async (username: string, password: string, email: string) => {
  try {
    const response = await axiosClient.post('/superadmin/register', { username, password, email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to register SuperAdmin');
  }
};


export const verifySuperAdminEmail = async (username: string, code: string) => {
  try {
    const response = await axiosClient.post('/superadmin/verify-email', { username, code });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to verify email');
  }
};


export const loginSuperAdmin = async (data:LoginData) => {
  try {
    const response = await axiosClient.post('/superadmin/login', {...data });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to log in');
  }
};

export const changeSuperAdminPassword = async (superAdminId: number, newPassword: string) => {
  try {
    const response = await axiosClient.put(`/superadmin/${superAdminId}/change-password`, { newPassword });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to change SuperAdmin password');
  }
};


export const requestSuperAdminPasswordReset = async (email: string) => {
  try {
    const response = await axiosClient.post('/superadmin/request-password-reset', { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to request password reset');
  }
};
