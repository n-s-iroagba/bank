import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { SecondPartiesQueryParams, CreateSecondPartyRequest, UpdateSecondPartyRequest } from '../types';
import { secondPartiesService } from '../services/secondPartyService';

export const useSecondParties = (params: SecondPartiesQueryParams) => {
  return useQuery({
    queryKey: ['secondParties', params],
    queryFn: () => secondPartiesService.getSecondParties(params),
  });
};

export const useSecondParty = (id: number) => {
  return useQuery({
    queryKey: ['secondParty', id],
    queryFn: () => secondPartiesService.getSecondParty(id),
    enabled: !!id,
  });
};

export const useCreateSecondParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSecondPartyRequest) => secondPartiesService.createSecondParty(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['secondParties'] });
    },
  });
};

export const useUpdateSecondParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSecondPartyRequest }) =>
      secondPartiesService.updateSecondParty(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['secondParties'] });
    },
  });
};

export const useDeleteSecondParty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => secondPartiesService.deleteSecondParty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['secondParties'] });
    },
  });
};

export const useBulkCreateSecondParties = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => secondPartiesService.bulkCreateSecondParties(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['secondParties'] });
    },
  });
};