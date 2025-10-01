import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { CheckingAccountsQueryParams, CreateCheckingAccountRequest, UpdateCheckingAccountRequest } from '../types';
import { checkingAccountsService } from '../services/checkingAccountService';

export const useCheckingAccounts = (params: CheckingAccountsQueryParams) => {
  return useQuery({
    queryKey: ['checkingAccounts', params],
    queryFn: () => checkingAccountsService.getCheckingAccounts(params),

  });
};

export const useCheckingAccount = (id: number) => {
  return useQuery({
    queryKey: ['checkingAccount', id],
    queryFn: () => checkingAccountsService.getCheckingAccount(id),
    enabled: !!id,
  });
};

export const useCreateCheckingAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCheckingAccountRequest) => checkingAccountsService.createCheckingAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkingAccounts'] });
    },
  });
};

export const useUpdateCheckingAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCheckingAccountRequest }) =>
      checkingAccountsService.updateCheckingAccount(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkingAccounts'] });
    },
  });
};

export const useDeleteCheckingAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => checkingAccountsService.deleteCheckingAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkingAccounts'] });
    },
  });
};