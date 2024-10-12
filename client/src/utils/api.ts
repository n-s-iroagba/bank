import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://your-api-url.com';



const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic GET request function
export const get = async <T>(url: string, token: string): Promise<T> => {
  const response = await api.get<T>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Return data directly
};


// Generic POST request function
export const post = async <T>(url: string, data: any, token: string): Promise<T> => {
  try {
    const response = await api.post<T>(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error during POST request');
  }
};

// Generic PUT request function
export const patch = async <T>(url: string, data: any, token: string): Promise<T> => {
  try {
    const response = await api.patch<T>(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error during PUT request');
  }
};

// Generic DELETE request function
export const del = async (url: string, token: string): Promise<void> => {
  try {
    await api.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error('Error during DELETE request');
  }
};


