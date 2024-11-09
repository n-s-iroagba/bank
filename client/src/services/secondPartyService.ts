import axiosClient from "../api/axiosClient";
import { getAllSecondPartyUrl } from "../data/routes";
import { CreateSecondParty } from "../types/SecondParty";

export const createSecondParty = async (data: CreateSecondParty) => {
  try {
    const response = await axiosClient.post('/second-parties', data);
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


export const updateSecondParty = async (id: number, data: CreateSecondParty) => {
  try {
    const response = await axiosClient.patch(`/second-parties/${id}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to update SecondParty');
  }
};


export const deleteSecondParty = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/second-parties/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete SecondParty');
  }
};
