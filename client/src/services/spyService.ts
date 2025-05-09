
import { apiPost } from '../api/api';
import { API_ENDPOINTS } from '../api/urls';

export const startSpyingOnAdmin = async (superAdminId: number, adminId: number) => {
  try {
    const response = await apiPost(API_ENDPOINTS.superAdmin.startSpying, { superAdminId, adminId });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to start spying');
  }
};

export const stopSpyingOnAdmin = async (superAdminId: number) => {
  try {
    const response = await apiPost(API_ENDPOINTS.superAdmin.stopSpying, { superAdminId });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to stop spying');
  }
};
