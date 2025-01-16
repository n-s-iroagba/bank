import { apiPost } from '../api/api';
import { API_ENDPOINTS } from '../api/urls';
import { CreateSuperAdmin } from '../types/SuperAdmin';

export const createSuperAdmin = async (data: CreateSuperAdmin):Promise<string>=> {
  const url = API_ENDPOINTS.superAdmin.register;

  try {
    const responseData = await apiPost(url, data);
    return responseData.data as string;

  } catch (error: any) {
    console.error('Error during Super Admin registration:', error);
    throw new Error(error.response?.data?.message || 'Failed to register Super Admin');
  }
};
