import { apiPost, apiGet, apiPatch, apiDelete } from '../api/api';
import { API_ENDPOINTS } from '../api/urls';
import { CreateSecondParty, UpdateSecondParty } from '../types/SecondParty';


export const createSecondParty = async (adminId: number, data: CreateSecondParty) => {
  const url = `${API_ENDPOINTS.secondParty.create}/${adminId}`;
  try {
    const response = await apiPost(url, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create second party');
  }
};


export const getAllSecondParties = async (id: number) => {
  const url = `${API_ENDPOINTS.secondParty.getAll}`;
  try {
    const response = await apiGet(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to retrieve second parties');
  }
};


export const updateSecondParty = async (id: number, data: UpdateSecondParty) => {
  const url = `${API_ENDPOINTS.secondParty.update}/${id}`;
  try {
    const response = await apiPatch(url, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update second party');
  }
};

export const deleteSecondParty = async (id: number) => {
  const url = `${API_ENDPOINTS.secondParty.delete}/${id}`;
  try {
    const response = await apiDelete(url);
    return response.status === 204;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete second party');
  }
};
