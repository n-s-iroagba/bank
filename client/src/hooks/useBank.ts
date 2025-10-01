import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Bank, BanksQueryParams, CreateBankRequest, PaginatedResponse, UpdateBankRequest } from '../types';
import { banksService } from '../services/bankService';

export const useBanks = (params?: BanksQueryParams) => {
  return useQuery({
    queryKey: ['banks', params],
    queryFn: () => banksService.getBanks(params||{}),

  });
};

export const useBank = (id: number) => {
  return useQuery({
    queryKey: ['bank', id],
    queryFn: () => banksService.getBank(id),
    enabled: !!id,
  });
};

export const useCreateBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBankRequest) => banksService.createBank(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
    },
  });
};

export const useUpdateBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBankRequest }) =>
      banksService.updateBank(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
    },
  });
};

export const useDeleteBank = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => banksService.deleteBank(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
    },
  });
};

export const useBulkCreateBanks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => banksService.bulkCreateBanks(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['banks'] });
    },
  });
};