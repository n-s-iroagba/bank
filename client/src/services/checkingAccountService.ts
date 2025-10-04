import { api } from './api';
import { API_ROUTES } from '../config/apiRoutes';
import { 
  CheckingAccountsResponse, 
  CheckingAccountResponse, 
  CreateCheckingAccountResponse, 
  UpdateCheckingAccountResponse
} from '../types/api';
import { CheckingAccountsQueryParams, CreateCheckingAccountRequest, UpdateCheckingAccountRequest } from '../types';

export const checkingAccountsService = {
  getCheckingAccounts: async (params: CheckingAccountsQueryParams): Promise<CheckingAccountsResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.accountHolderId) queryParams.append('accountHolderId', params.accountHolderId.toString());
    if (params.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
    
    const response = await api.get(`${API_ROUTES.ADMIN.CHECKING_ACCOUNTS.BASE}?${queryParams}`);
    return response.data;
  },

  getCheckingAccount: async (id: number): Promise<CheckingAccountResponse> => {
    const response = await api.get(API_ROUTES.ADMIN.CHECKING_ACCOUNTS.BY_ID(id));
    return response.data;
  },

  createCheckingAccount: async (data: CreateCheckingAccountRequest): Promise<CreateCheckingAccountResponse> => {
    const response = await api.post(API_ROUTES.ADMIN.CHECKING_ACCOUNTS.BASE, data);
    return response.data;
  },

  updateCheckingAccount: async (id: number, data: UpdateCheckingAccountRequest): Promise<UpdateCheckingAccountResponse> => {
    const response = await api.put(API_ROUTES.ADMIN.CHECKING_ACCOUNTS.BY_ID(id), data);
    return response.data;
  },

  deleteCheckingAccount: async (id: number): Promise<void> => {
    await api.delete(API_ROUTES.ADMIN.CHECKING_ACCOUNTS.BY_ID(id));
  },

  getCheckingAccountsByAccountHolder: async (accountHolderId: number, params: CheckingAccountsQueryParams): Promise<CheckingAccountsResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const response = await api.get(`${API_ROUTES.ADMIN.CHECKING_ACCOUNTS.BY_ACCOUNT_HOLDER(accountHolderId)}?${queryParams}`);
    return response.data;
  },
};