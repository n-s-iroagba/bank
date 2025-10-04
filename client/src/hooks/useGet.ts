import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "../services/api";

export const useGet = <T>(resourceUrl: string | null) => {
  const [apiError, setApiError] = useState('');

  const {
    data: resourceData,
    isLoading,
    isError,

    refetch,
  } = useQuery<T, unknown>({
    queryKey: [resourceUrl],
    queryFn: async () => {
      try {
        if (!resourceUrl) {
          return {
            resourceData: undefined,
            loading: false,
            error: '',
            refetch: async () => ({ data: undefined }) as any, // noop
          };
        }
        const response = await api.get(resourceUrl);
        return response.data;
      } catch (error) {
        if (error instanceof Error){
         setApiError(error.message)
        }
        throw error;
      }
    },
    retry: (failureCount, error) => {
      if (error && typeof error === 'object' && 'code' in error) {
        const axiosError = error as any;
        if (
          axiosError.code === 'ERR_NETWORK' ||
          (axiosError.response &&
            axiosError.response.status >= 400 &&
            axiosError.response.status < 500)
        ) {
          return false;
        }
      }
      return failureCount < 3;
    },
    staleTime: 0,
  });

  return {
    resourceData,
    loading: isLoading,
    error: apiError || (isError ? 'An error occurred while fetching data' : ''),
    refetch,
  };
};