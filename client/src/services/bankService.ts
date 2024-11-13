import axiosClient from "../api/axiosClient";
import { createBankUrl, getAllBanksUrl } from "../data/routes";
import { CreateBank, EditBank } from "../types/Bank";

export const getAllBanks = async () => {
    const url = `${axiosClient.defaults.baseURL}${getAllBanksUrl}`
  try {
    const response = await axiosClient.get(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch banks');
  }
};


export const createBank = async (data: CreateBank) => {
  const url = `${axiosClient.defaults.baseURL}${createBankUrl}`
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('logo', data.logo);

    const response = await axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create bank');
  }
};


export const updateBank = async (id: number, data: EditBank) => {
  try {
    const formData = new FormData();
    formData.append('name', data.name);
    if (data.logo) {
      formData.append('logo', data.logo);
    }

    const response = await axiosClient.patch(`/banks/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update bank');
  }
};

export const deleteBank = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/banks/${id}`);
    return response.status === 204;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete bank');
  }
};
