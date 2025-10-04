import { api } from './api';
import { API_ROUTES } from '../config/apiRoutes';
import { 
  TransactionsResponse, 
  TransactionResponse, 
  CreateTransactionResponse, 
  UpdateTransactionResponse,
  AccountStatementResponse
} from '../types/api';
import {  CreateTransactionRequest, TransactionsQueryParams, UpdateTransactionRequest } from '../types';

export const transactionsService = {
  getTransactions: async (params: TransactionsQueryParams): Promise<TransactionsResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.type) queryParams.append('type', params.type);
    if (params.checkingAccountId) queryParams.append('checkingAccountId', params.checkingAccountId.toString());
    if (params.secondPartyId) queryParams.append('secondPartyId', params.secondPartyId.toString());
    if (params.startDate) queryParams.append('startDate', params.startDate.toISOString());
    if (params.endDate) queryParams.append('endDate', params.endDate.toISOString());
    
    const response = await api.get(`${API_ROUTES.ADMIN.TRANSACTIONS.BASE}?${queryParams}`);
    return response.data;
  },

  getTransaction: async (id: number): Promise<TransactionResponse> => {
    const response = await api.get(API_ROUTES.ADMIN.TRANSACTIONS.BY_ID(id));
    return response.data;
  },

  createTransaction: async (data: CreateTransactionRequest): Promise<CreateTransactionResponse> => {
    const response = await api.post(API_ROUTES.ADMIN.TRANSACTIONS.BASE, data);
    return response.data;
  },

  updateTransaction: async (id: number, data: UpdateTransactionRequest): Promise<UpdateTransactionResponse> => {
    const response = await api.put(API_ROUTES.ADMIN.TRANSACTIONS.BY_ID(id), data);
    return response.data;
  },

  deleteTransaction: async (id: number): Promise<void> => {
    await api.delete(API_ROUTES.ADMIN.TRANSACTIONS.BY_ID(id));
  },

  getAccountStatement: async (accountId: number, startDate: Date, endDate: Date): Promise<AccountStatementResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('startDate', startDate.toISOString());
    queryParams.append('endDate', endDate.toISOString());
    
    const response = await api.get(`${API_ROUTES.ADMIN.TRANSACTIONS.STATEMENT(accountId)}?${queryParams}`);
    return response.data;
  },

  getTransactionsByCheckingAccount: async (checkingAccountId: number, params: TransactionsQueryParams): Promise<TransactionsResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const response = await api.get(`${API_ROUTES.ADMIN.TRANSACTIONS.BY_CHECKING_ACCOUNT(checkingAccountId)}?${queryParams}`);
    return response.data;
  },

  getTransactionsBySecondParty: async (secondPartyId: number, params: TransactionsQueryParams): Promise<TransactionsResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const response = await api.get(`${API_ROUTES.ADMIN.TRANSACTIONS.BY_SECOND_PARTY(secondPartyId)}?${queryParams}`);
    return response.data;
  },

  // Account holder specific methods
  getAccountHolderTransactions: async (params: TransactionsQueryParams): Promise<TransactionsResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    
    const response = await api.get(`${API_ROUTES.ACCOUNT_HOLDER.TRANSACTIONS.BASE}?${queryParams}`);
    return response.data;
  },

  createAccountHolderTransaction: async (data: CreateTransactionRequest): Promise<CreateTransactionResponse> => {
    const response = await api.post(API_ROUTES.ACCOUNT_HOLDER.TRANSACTIONS.BASE, data);
    return response.data;
  },

  getAccountHolderAccountStatement: async (accountId: number, startDate: Date, endDate: Date): Promise<AccountStatementResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('startDate', startDate.toISOString());
    queryParams.append('endDate', endDate.toISOString());
    
    const response = await api.get(`${API_ROUTES.ACCOUNT_HOLDER.TRANSACTIONS.STATEMENT(accountId)}?${queryParams}`);
    return response.data;
  },
};