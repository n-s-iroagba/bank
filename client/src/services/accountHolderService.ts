import { api } from './api';
import { API_ROUTES } from '../config/apiRoutes';
import { 
  AccountHoldersResponse, 
  AccountHolderResponse, 
  CreateAccountHolderResponse, 
  UpdateAccountHolderResponse,
  AccountHolderDashboardResponse
} from '../types/api';
import { AccountHoldersQueryParams, CreateAccountHolderRequest, UpdateAccountHolderRequest } from '../types';

export const accountHoldersService = {
  getAccountHolders: async (params: AccountHoldersQueryParams): Promise<AccountHoldersResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.firstName) queryParams.append('firstName', params.firstName);
    if (params.lastName) queryParams.append('lastName', params.lastName);
    if (params.email) queryParams.append('email', params.email);
    
    const response = await api.get(`${API_ROUTES.ADMIN.ACCOUNT_HOLDERS.BASE}?${queryParams}`);
    return response.data;
  },

  getAccountHolder: async (id: number): Promise<{data:AccountHolderResponse}> => {
    const response = await api.get(API_ROUTES.ADMIN.ACCOUNT_HOLDERS.BY_ID(id));
    return response.data;
  },

  createAccountHolder: async (data: CreateAccountHolderRequest): Promise<CreateAccountHolderResponse> => {
    const response = await api.post(API_ROUTES.ADMIN.ACCOUNT_HOLDERS.BASE, data);
    return response.data;
  },

  updateAccountHolder: async (id: number, data: UpdateAccountHolderRequest): Promise<UpdateAccountHolderResponse> => {
    const response = await api.put(API_ROUTES.ADMIN.ACCOUNT_HOLDERS.BY_ID(id), data);
    return response.data;
  },

  deleteAccountHolder: async (id: number): Promise<void> => {
    await api.delete(API_ROUTES.ADMIN.ACCOUNT_HOLDERS.BY_ID(id));
  },

  searchAccountHolders: async (query: string, page: number = 1, limit: number = 10): Promise<AccountHoldersResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('search', query);
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());
    
    const response = await api.get(`${API_ROUTES.ADMIN.ACCOUNT_HOLDERS.BASE}?${queryParams}`);
    return response.data;
  },

  getAccountHolderByUserId: async (userId: number): Promise<AccountHolderResponse> => {
    const response = await api.get(`${API_ROUTES.ADMIN.ACCOUNT_HOLDERS.BASE}/user/${userId}`);
    return response.data;
  },

  getAccountHoldersWithAccounts: async (): Promise<AccountHoldersResponse> => {
    const response = await api.get(`${API_ROUTES.ADMIN.ACCOUNT_HOLDERS.BASE}/with-accounts`);
    return response.data;
  },

  getAccountHolderDashboard: async (accountHolderId: number): Promise<AccountHolderDashboardResponse> => {
    const response = await api.get(`${API_ROUTES.ACCOUNT_HOLDER.PROFILE.BASE}/dashboard/${accountHolderId}`);
    return response.data;
  },

  // Account holder specific methods (for when they are logged in)
  getMyProfile: async (): Promise<AccountHolderResponse> => {
    const response = await api.get(API_ROUTES.ACCOUNT_HOLDER.PROFILE.BASE);
    return response.data;
  },

  updateMyProfile: async (data: UpdateAccountHolderRequest): Promise<UpdateAccountHolderResponse> => {
    const response = await api.put(API_ROUTES.ACCOUNT_HOLDER.PROFILE.BASE, data);
    return response.data;
  },

  getMyAccounts: async (): Promise<AccountHoldersResponse> => {
    const response = await api.get(API_ROUTES.ACCOUNT_HOLDER.ACCOUNTS.BASE);
    return response.data;
  }
};