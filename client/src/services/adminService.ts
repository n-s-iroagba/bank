import axiosClient from "../api/axiosClient";
import { LoginData } from "../features/auth/types/authTypes";

export const loginAdmin = async (data:LoginData) => {
    try {
      const response = await axiosClient.post('/admin/login', { ...data });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to log in');
    }
  };