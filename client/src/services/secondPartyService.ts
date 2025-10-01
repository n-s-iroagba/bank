import { api } from './api';
import { API_ROUTES } from '../config/apiRoutes';
import { 
  SecondPartiesResponse, 
  SecondPartyResponse, 
  CreateSecondPartyResponse, 
  UpdateSecondPartyResponse,
  BulkCreateSecondPartiesExcelResponse, 
} from '../types/api';
import { SecondPartiesQueryParams, CreateSecondPartyRequest, UpdateSecondPartyRequest, PaginatedResponse, SecondPartyWithBank } from '../types';

export const secondPartiesService = {
  getSecondParties: async (params: SecondPartiesQueryParams): Promise<SecondPartiesResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.bankId) queryParams.append('bankId', params.bankId.toString());
    
    const response = await api.get(`${API_ROUTES.ADMIN.SECOND_PARTIES.BASE}?${queryParams}`);
    return response.data;
  },

  getSecondParty: async (id: number): Promise<SecondPartyResponse> => {
    const response = await api.get(API_ROUTES.ADMIN.SECOND_PARTIES.BY_ID(id));
    return response.data;
  },

  createSecondParty: async (data: CreateSecondPartyRequest): Promise<CreateSecondPartyResponse> => {
    const response = await api.post(API_ROUTES.ADMIN.SECOND_PARTIES.BASE, data);
    return response.data;
  },

  updateSecondParty: async (id: number, data: UpdateSecondPartyRequest): Promise<UpdateSecondPartyResponse> => {
    const response = await api.put(API_ROUTES.ADMIN.SECOND_PARTIES.BY_ID(id), data);
    return response.data;
  },

  deleteSecondParty: async (id: number): Promise<void> => {
    await api.delete(API_ROUTES.ADMIN.SECOND_PARTIES.BY_ID(id));
  },

  bulkCreateSecondParties: async (file: File): Promise<BulkCreateSecondPartiesExcelResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(API_ROUTES.ADMIN.SECOND_PARTIES.BULK_EXCEL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  bulkCreateSecondPartiesFromForm: async (secondParties: CreateSecondPartyRequest[]): Promise<CreateSecondPartyResponse> => {
    const response = await api.post(API_ROUTES.ADMIN.SECOND_PARTIES.BULK_FORM, { secondParties });
    return response.data;
  },

  getSecondPartiesByBank: async (bankId: number, params: SecondPartiesQueryParams): Promise<SecondPartiesResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const response = await api.get(`${API_ROUTES.ADMIN.SECOND_PARTIES.BY_BANK(bankId)}?${queryParams}`);
    return response.data;
  },

  searchSecondParties: async (query: string, page: number = 1, limit: number = 10): Promise<SecondPartiesResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('search', query);
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());
    
    const response = await api.get(`${API_ROUTES.ADMIN.SECOND_PARTIES.BASE}?${queryParams}`);
    return response.data;
  }
};