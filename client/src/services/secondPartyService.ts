import axiosClient from "../api/axiosClient";
import { createSecondPartyUrl, deleteSecondPartyUrl, getAllSecondPartyUrl, updateSecondPartyUrl } from "../data/routes";
import { CreateSecondParty, EditSecondParty } from "../types/SecondParty";


export const createSecondParty = async (adminId:number,data: CreateSecondParty) => {
  const url = `${axiosClient.defaults.baseURL}${createSecondPartyUrl}/${adminId}`;

  try {
    const response = await axiosClient.post(url, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to create SecondParty');
  }
};


export const getAllSecondParties = async (id:number) => {
  try {
    const response = await axiosClient.get(`${axiosClient.defaults.baseURL}${getAllSecondPartyUrl}/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to retrieve SecondParties');
  }
};


export const updateSecondParty = async (id: number, data: EditSecondParty) => {
  const url = `${axiosClient.defaults.baseURL}${updateSecondPartyUrl}/${id}`
  try {
    const response = await axiosClient.patch(url, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update SecondParty');
  }
};


export const deleteSecondParty = async (id: number) => {
  const url = `${axiosClient.defaults.baseURL}${deleteSecondPartyUrl}/${id}`
  try {
    const response = await axiosClient.delete(url);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete SecondParty');
  }
};
