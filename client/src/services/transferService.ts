// src/services/transactionService.ts
import { get } from '../utils/api';

export const fetchTransactions = async (token: string) => {
  return await get('/transfers', token); // Adjust the endpoint as needed
};
