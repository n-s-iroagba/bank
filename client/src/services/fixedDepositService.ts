import { api } from './api';
import { API_ROUTES } from '../config/apiRoutes';
import { 
  FixedDepositsResponse, 
  FixedDepositResponse, 
  CreateFixedDepositResponse, 
  UpdateFixedDepositResponse,
  MatureDepositsResponse
} from '../types/api';
import { FixedDepositsQueryParams, CreateFixedDepositRequest, UpdateFixedDepositRequest, buildQueryString, PaginatedResponse, FixedTermDeposit } from '../types';


export const fixedDepositsService = {
  /**
   * Get all fixed deposits with optional filtering and pagination
   */
  getFixedDeposits: async (params: FixedDepositsQueryParams = {}): Promise<PaginatedResponse<FixedTermDeposit>> => {
    const queryParams = buildQueryString(params);
    const response = await api.get(`${API_ROUTES.ADMIN.FIXED_DEPOSITS.BASE}?${queryParams}`);
    return response.data;
  },

  /**
   * Get a specific fixed deposit by ID
   */
  getFixedDeposit: async (id: number): Promise<FixedDepositResponse> => {
    const response = await api.get(API_ROUTES.ADMIN.FIXED_DEPOSITS.BY_ID(id));
    return response.data;
  },

  /**
   * Create a new fixed deposit account
   */
  createFixedDeposit: async (data: CreateFixedDepositRequest): Promise<CreateFixedDepositResponse> => {
    const response = await api.post(API_ROUTES.ADMIN.FIXED_DEPOSITS.BASE, data);
    return response.data;
  },

  /**
   * Update an existing fixed deposit account
   */
  updateFixedDeposit: async (id: number, data: UpdateFixedDepositRequest): Promise<UpdateFixedDepositResponse> => {
    const response = await api.put(API_ROUTES.ADMIN.FIXED_DEPOSITS.BY_ID(id), data);
    return response.data;
  },

  /**
   * Delete a fixed deposit account
   */
  deleteFixedDeposit: async (id: number): Promise<void> => {
    await api.delete(API_ROUTES.ADMIN.FIXED_DEPOSITS.BY_ID(id));
  },

  /**
   * Get fixed deposits for a specific account holder
   */
  getFixedDepositsByAccountHolder: async (
    accountHolderId: number, 
    params: FixedDepositsQueryParams = {}
  ): Promise<FixedDepositsResponse> => {
    const queryParams = buildQueryString(params);
    const response = await api.get(
      `${API_ROUTES.ADMIN.FIXED_DEPOSITS.BY_ACCOUNT_HOLDER(accountHolderId)}?${queryParams}`
    );
    return response.data;
  },

  /**
   * Get mature fixed deposits (deposits that have reached maturity date)
   */
  getMatureDeposits: async (params: FixedDepositsQueryParams = {}): Promise<MatureDepositsResponse> => {
    const queryParams = buildQueryString(params);
    const response = await api.get(`${API_ROUTES.ADMIN.FIXED_DEPOSITS.MATURE_DEPOSITS}?${queryParams}`);
    return response.data;
  },

  /**
   * Get fixed deposits by account number
   */
  getFixedDepositByAccountNumber: async (accountNumber: string): Promise<FixedDepositResponse> => {
    const response = await api.get(`${API_ROUTES.ADMIN.FIXED_DEPOSITS.BASE}/account-number/${accountNumber}`);
    return response.data;
  },

  /**
   * Get fixed deposits that will mature within a specific date range
   */
  getDepositsMaturingBetween: async (startDate: Date, endDate: Date, params: FixedDepositsQueryParams = {}): Promise<FixedDepositsResponse> => {
    const queryParams = buildQueryString({
      ...params,
      maturityFrom: startDate,
      maturityTo: endDate
    });
    const response = await api.get(`${API_ROUTES.ADMIN.FIXED_DEPOSITS.BASE}/maturing-between?${queryParams}`);
    return response.data;
  },

  /**
   * Get fixed deposits by interest rate range
   */
  getDepositsByInterestRate: async (minRate: number, maxRate: number, params: FixedDepositsQueryParams = {}): Promise<FixedDepositsResponse> => {
    const queryParams = buildQueryString({
      ...params,
      minInterestRate: minRate,
      maxInterestRate: maxRate
    });
    const response = await api.get(`${API_ROUTES.ADMIN.FIXED_DEPOSITS.BASE}/by-interest-rate?${queryParams}`);
    return response.data;
  },

  /**
   * Get fixed deposits by term range
   */
  getDepositsByTerm: async (minTerm: number, maxTerm: number, params: FixedDepositsQueryParams = {}): Promise<FixedDepositsResponse> => {
    const queryParams = buildQueryString({
      ...params,
      minTerm,
      maxTerm
    });
    const response = await api.get(`${API_ROUTES.ADMIN.FIXED_DEPOSITS.BASE}/by-term?${queryParams}`);
    return response.data;
  },

  /**
   * Close a fixed deposit account (mark as inactive)
   */
  closeFixedDeposit: async (id: number): Promise<UpdateFixedDepositResponse> => {
    const response = await api.patch(`${API_ROUTES.ADMIN.FIXED_DEPOSITS.BY_ID(id)}/close`);
    return response.data;
  },

  /**
   * Renew a matured fixed deposit
   */
  renewFixedDeposit: async (id: number, term: number, interestRate: number): Promise<UpdateFixedDepositResponse> => {
    const response = await api.post(`${API_ROUTES.ADMIN.FIXED_DEPOSITS.BY_ID(id)}/renew`, {
      term,
      interestRate
    });
    return response.data;
  },

  /**
   * Calculate maturity amount for a fixed deposit
   */
  calculateMaturityAmount: async (principal: number, term: number, interestRate: number): Promise<{ maturityAmount: number }> => {
    const response = await api.post(`${API_ROUTES.ADMIN.FIXED_DEPOSITS.BASE}/calculate-maturity`, {
      principal,
      term,
      interestRate
    });
    return response.data;
  },

  /**
   * Get fixed deposit statistics
   */
  getStatistics: async (): Promise<{
    totalDeposits: number;
    totalAmount: number;
    activeDeposits: number;
    maturedDeposits: number;
    averageInterestRate: number;
    averageTerm: number;
  }> => {
    const response = await api.get(`${API_ROUTES.ADMIN.FIXED_DEPOSITS.BASE}/statistics`);
    return response.data;
  },

  /**
   * Export fixed deposits to CSV or Excel
   */
  exportFixedDeposits: async (params: FixedDepositsQueryParams = {}, format: 'csv' | 'excel' = 'excel'): Promise<Blob> => {
    const queryParams = buildQueryString({
      ...params,
      format
    });
    const response = await api.get(`${API_ROUTES.ADMIN.FIXED_DEPOSITS.BASE}/export?${queryParams}`, {
      responseType: 'blob'
    });
    return response.data;
  },

  /**
   * Get fixed deposits for the currently logged-in account holder
   */
  getMyFixedDeposits: async (params: FixedDepositsQueryParams = {}): Promise<FixedDepositsResponse> => {
    const queryParams = buildQueryString(params);
    const response = await api.get(`${API_ROUTES.ACCOUNT_HOLDER.ACCOUNTS.FIXED_DEPOSITS}?${queryParams}`);
    return response.data;
  },

  /**
   * Get a specific fixed deposit for the currently logged-in account holder
   */
  getMyFixedDeposit: async (id: number): Promise<FixedDepositResponse> => {
    const response = await api.get(`${API_ROUTES.ACCOUNT_HOLDER.ACCOUNTS.FIXED_DEPOSITS}/${id}`);
    return response.data;
  },

  /**
   * Create a new fixed deposit for the currently logged-in account holder
   */
  createMyFixedDeposit: async (data: CreateFixedDepositRequest): Promise<CreateFixedDepositResponse> => {
    const response = await api.post(API_ROUTES.ACCOUNT_HOLDER.ACCOUNTS.FIXED_DEPOSITS, data);
    return response.data;
  }
};