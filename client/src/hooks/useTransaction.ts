import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { TransactionsQueryParams, CreateTransactionRequest, UpdateTransactionRequest } from '../types';
import { transactionsService } from '../services/transactionService';

export const useTransactions = (params: TransactionsQueryParams) => {
  return useQuery({
    queryKey: ['transactions', params],
    queryFn: () => transactionsService.getTransactions(params),
  });
};

export const useTransaction = (id: number) => {
  return useQuery({
    queryKey: ['transaction', id],
    queryFn: () => transactionsService.getTransaction(id),
    enabled: !!id,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTransactionRequest) => transactionsService.createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['checkingAccounts'] });
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTransactionRequest }) =>
      transactionsService.updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['checkingAccounts'] });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => transactionsService.deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['checkingAccounts'] });
    },
  });
};

export const useAccountStatement = (accountId: number, startDate: Date, endDate: Date) => {
  return useQuery({
    queryKey: ['accountStatement', accountId, startDate, endDate],
    queryFn: () => transactionsService.getAccountStatement(accountId, startDate, endDate),
    enabled: !!accountId && !!startDate && !!endDate,
  });
};