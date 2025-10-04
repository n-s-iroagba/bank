// authService.ts
import { api } from './api';
import { API_ROUTES } from '../config/apiRoutes';

export interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: any;
  accountHolder?: any;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
  // extend as needed
}

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post(API_ROUTES.AUTH.LOGIN, credentials);
    const data: LoginResponse = response.data;
    storeAuthData(data);
    return data;
  },

    loginAcountHolder: async (credentials: {username:string, password:string}): Promise<LoginResponse> => {
    const response = await api.post(API_ROUTES.AUTH.ACC_LOGIN, credentials);
    const data: LoginResponse = response.data;
    storeAuthData(data);
    return data;
  },

  register: async (userData: RegisterData): Promise<LoginResponse> => {
    const response = await api.post(API_ROUTES.AUTH.SIGNUP_ADMIN, userData);
    const data: LoginResponse = response.data;
    storeAuthData(data);
    return data;
  },

  getCurrentUser: async (): Promise<any> => {
    const response = await api.get(API_ROUTES.AUTH.ME, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    return response.data;
  },



  verifyToken: async (): Promise<boolean> => {
    try {
      const response = await api.post(API_ROUTES.AUTH.VERIFY_EMAIL, null, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
      return response.status === 200;
    } catch {
      return false;
    }
  },



  logout: async (): Promise<void> => {
    try {
      await api.post(API_ROUTES.AUTH.LOGOUT, null, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
    } catch {
      // Ignore logout errors
    } finally {
      authService.clearAuthData();
    }
  },

  initializeAuthState: (): { isAuthenticated: boolean; user: any } => {
    const token = authService.getToken();
    const userData = authService.getUserData();
    return {
      isAuthenticated: !!token,
      user: userData,
    };
  },

  isAdmin: (): boolean => {
    const userData = authService.getUserData();
    return userData?.role === 'admin' || userData?.isAdmin || false;
  },

  isAccountHolder: (): boolean => {
    const userData = authService.getUserData();
    return userData?.role === 'account_holder' || userData?.isAccountHolder || false;
  },

  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),

  getRefreshToken: (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY),

  getUserData: (): any => {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  clearAuthData: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

// Helper
function storeAuthData(data: LoginResponse): void {
  localStorage.setItem(TOKEN_KEY, data.accessToken);
  if (data.refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
  }
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}
