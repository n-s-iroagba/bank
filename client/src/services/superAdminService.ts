import { apiPost } from '../api/api';
import { API_ENDPOINTS } from '../api/urls';
import { CreateSuperAdmin } from '../types/SuperAdmin';

export const createSuperAdmin = async (data: CreateSuperAdmin) => {
  const url = API_ENDPOINTS.superAdmin.register;

  try {
    const response = await apiPost<string,CreateSuperAdmin>(url, data);
    return response.data;
  } catch (error: any) {
    console.error('Error during Super Admin registration:', error);
    throw new Error(error.response?.data?.message || 'Failed to register Super Admin');
  }
};
