import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { FixedDepositsQueryParams, CreateFixedDepositRequest, UpdateFixedDepositRequest } from '../types';
import { fixedDepositsService } from '../services/fixedDepositService';

export const useFixedDeposits = (params: FixedDepositsQueryParams) => {
  return useQuery({
    queryKey: ['fixedDeposits', params],
    queryFn: () => fixedDepositsService.getFixedDeposits(params),
   
  });
};

export const useFixedDeposit = (id: string) => {
  return useQuery({
    queryKey: ['fixedDeposit', id],
    queryFn: () => fixedDepositsService.getFixedDeposit(Number(id)),
    enabled: !!id,
  });
};

export const useCreateFixedDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFixedDepositRequest) => fixedDepositsService.createFixedDeposit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fixedDeposits'] });
    },
  });
};

export const useUpdateFixedDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateFixedDepositRequest }) =>
      fixedDepositsService.updateFixedDeposit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fixedDeposits'] });
    },
  });
};

export const useDeleteFixedDeposit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => fixedDepositsService.deleteFixedDeposit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fixedDeposits'] });
    },
  });
};