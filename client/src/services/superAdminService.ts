import axiosClient from '../api/axiosClient';
import { superadminAdminRequestNewCodeUrl, SuperAdminLoginUrl, superAdminRegisterUrl, superAdminRequestPasswordChange, superAdminResetPasswordUrl, superAdminVerifyUrl } from '../data/routes';
import { ChangePasswordRequest, NewPassword, SuperAdminLoginData } from '../features/auth/types/authTypes';
import { CreateSuperAdmin } from '../types/SuperAdmin';

export const registerSuperAdmin = async (data:CreateSuperAdmin) => {
    const url = `${axiosClient.defaults.baseURL}${superAdminRegisterUrl}`
  try {
    const response = await axiosClient.post(url, { data });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to register SuperAdmin');
  }
};

export const requestNewCode = async (id:number)=>{
    const url = `${axiosClient.defaults.baseURL}${superadminAdminRequestNewCodeUrl}/${id}`;
  try {
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to request verification code');
  }
}


export const verifySuperAdminEmail = async (id:number, code:number) => {
  const url = `${axiosClient.defaults.baseURL}${superAdminVerifyUrl}/${id}`;
  try {
    const response = await axiosClient.post(url,  code );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to verify email');
  }
};


export const loginSuperAdmin = async (data:SuperAdminLoginData) => {
  const url = `${axiosClient.defaults.baseURL}${SuperAdminLoginUrl}`;
  try {
    const response = await axiosClient.post(url, {...data });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to log in');
  }
};

export const changeSuperAdminPassword = async (id:number,data:NewPassword) => {
    const url = `${axiosClient.defaults.baseURL}${superAdminResetPasswordUrl}/${id}`
  try {
    const response = await axiosClient.put(url, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to change SuperAdmin password');
  }
};


export const requestSuperAdminPasswordChange = async (data:ChangePasswordRequest) => {
    const url = `${axiosClient.defaults.baseURL}${superAdminRequestPasswordChange}/`
  try {
    const response = await axiosClient.post(url, { data });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to request password reset');
  }
};
