import { api } from './api';
import { API_ROUTES } from '../config/apiRoutes';
import { 
  BanksResponse, 
  BankResponse, 
  CreateBankResponse, 
  UpdateBankResponse,
  BulkCreateBanksExcelResponse 
} from '../types/api';
import { BanksQueryParams, CreateBankRequest, UpdateBankRequest } from '../types';

export const banksService = {
  getBanks: async (params: BanksQueryParams): Promise<BanksResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.name) queryParams.append('name', params.name);
    
    const response = await api.get(`${API_ROUTES.ADMIN.BANKS.BASE}?${queryParams}`);
    return response.data;
  },

  getBank: async (id: number): Promise<BankResponse> => {
    const response = await api.get(API_ROUTES.ADMIN.BANKS.BY_ID(id));
    return response.data;
  },

  createBank: async (data: CreateBankRequest): Promise<CreateBankResponse> => {
    const response = await api.post(API_ROUTES.ADMIN.BANKS.BASE, data);
    return response.data;
  },

  updateBank: async (id: number, data: UpdateBankRequest): Promise<UpdateBankResponse> => {
    const response = await api.put(API_ROUTES.ADMIN.BANKS.BY_ID(id), data);
    return response.data;
  },

  deleteBank: async (id: number): Promise<void> => {
    await api.delete(API_ROUTES.ADMIN.BANKS.BY_ID(id));
  },

  bulkCreateBanks: async (file: File): Promise<BulkCreateBanksExcelResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(API_ROUTES.ADMIN.BANKS.BULK_EXCEL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  bulkCreateBanksFromForm: async (banks: CreateBankRequest[]): Promise<CreateBankResponse> => {
    const response = await api.post(API_ROUTES.ADMIN.BANKS.BULK_FORM, { banks });
    return response.data;
  },
};