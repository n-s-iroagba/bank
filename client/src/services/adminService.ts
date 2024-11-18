import { apiDelete, apiGet, apiPatch, apiPost } from "../api/api";
import { API_ENDPOINTS } from "../api/urls";
import { Admin, CreateAdmin, UpdateAdmin } from "../types/Admin";



export const createAdmin = async (superAdminId: number, data: CreateAdmin) => {
  const url = `${API_ENDPOINTS.admin.create}/${superAdminId}`
  try {
    const response = await apiPost<Admin,CreateAdmin>(url,data);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw new Error(error.response?.data?.message || 'Failed to create Admin');
  }
};


export const getAllAdmins = async (superAdminId:number) => {
  const url = `${API_ENDPOINTS.admin.get}/${superAdminId}`;
  try {
    const response = await apiGet<Admin[]>(url);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw new Error(error.response?.data?.message || 'Failed to retrieve Admins');
  }
};


export const updateAdmin = async (adminId: number, data: UpdateAdmin) => {
  const url = `${API_ENDPOINTS.admin.update}/${adminId}`;
  try {
    const response = await apiPatch<Admin, UpdateAdmin>(url, data);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw new Error(error.response?.data?.message || 'Failed to update Admin');
  }
};


export const deleteAdmin = async (adminId: number) => {
  const url = `${API_ENDPOINTS.admin.delete}/${adminId}`;
  try {
    const response = await apiDelete<string>(url);
    return response.data;
  } catch (error: any) {
    console.error(error)
    throw new Error(error.response?.data?.message || 'Failed to delete Admin');
  }
};