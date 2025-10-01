import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { AccountHoldersQueryParams, CreateAccountHolderRequest, UpdateAccountHolderRequest } from '../types';
import { accountHoldersService } from '../services/accountHolderService';

export const useAccountHolders = (params: AccountHoldersQueryParams) => {
  return useQuery({
    queryKey: ['accountHolders', params],
    queryFn: () => accountHoldersService.getAccountHolders(params),

  });
};

export const useAccountHolder = (id: number) => {
  return useQuery({
    queryKey: ['accountHolder', id],
    queryFn: () => accountHoldersService.getAccountHolder(id),
    enabled: !!id,
  });
};

export const useCreateAccountHolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAccountHolderRequest) => accountHoldersService.createAccountHolder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountHolders'] });
    },
  });
};

export const useUpdateAccountHolder = (id:number|string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateAccountHolderRequest }) =>
      accountHoldersService.updateAccountHolder(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountHolders'] });
      queryClient.invalidateQueries({ queryKey: ['accountHolder', id] });
    },
  });
};

export const useDeleteAccountHolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => accountHoldersService.deleteAccountHolder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accountHolders'] });
    },
  });
};

export const useSearchAccountHolders = (query: string, page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['accountHolders', 'search', query, page, limit],
    queryFn: () => accountHoldersService.searchAccountHolders(query, page, limit),
    enabled: !!query,
  });
};

export const useAccountHolderByUserId = (userId: number) => {
  return useQuery({
    queryKey: ['accountHolder', 'user', userId],
    queryFn: () => accountHoldersService.getAccountHolderByUserId(userId),
    enabled: !!userId,
  });
};

export const useAccountHoldersWithAccounts = () => {
  return useQuery({
    queryKey: ['accountHolders', 'with-accounts'],
    queryFn: () => accountHoldersService.getAccountHoldersWithAccounts(),
  });
};

export const useAccountHolderDashboard = (accountHolderId: number) => {
  return useQuery({
    queryKey: ['accountHolder', 'dashboard', accountHolderId],
    queryFn: () => accountHoldersService.getAccountHolderDashboard(accountHolderId),
    enabled: !!accountHolderId,
  });
};

// Account holder specific hooks (for when they are logged in)
export const useMyProfile = () => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: () => accountHoldersService.getMyProfile(),
  });
};

export const useUpdateMyProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAccountHolderRequest) => accountHoldersService.updateMyProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myProfile'] });
    },
  });
};

export const useMyAccounts = () => {
  return useQuery({
    queryKey: ['myAccounts'],
    queryFn: () => accountHoldersService.getMyAccounts(),
  });
};