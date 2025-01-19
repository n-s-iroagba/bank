// api.ts
import { AxiosRequestConfig } from 'axios';
import axiosClient from './axiosClient';

// Define a generic type for API response
type ApiResponse<T> = {
  data: T;
  status: number;
};

// GET request
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  const response = await axiosClient.get<T>(url, config);
  return { data: response.data, status: response.status };
}

// POST request
export async function apiPost<T, U>(url: string, data: U, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {

  const response = await axiosClient.post<T>(url, data, config);
  return { data: response.data, status: response.status };
}

// PATCH request
export async function apiPatch<T, U>(url: string, data: U, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  alert(data)
  const response = await axiosClient.patch<T>(url, data, config);
  return { data: response.data, status: response.status };
}

// DELETE request
export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  const response = await axiosClient.delete<T>(url, config);
  return { data: response.data, status: response.status };
}
