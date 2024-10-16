// src/hooks/useAccountBalance.ts

import { useEffect, useState } from 'react';
import { Account } from '../types/accountTypes';
import { get } from '../../../utils/api';


const useAccountBalance = (token: string, accountId: number) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountBalance = async () => {
      try {
        const data = await get<Account>(`/accounts/${accountId}`, token); // Adjust the API endpoint accordingly
        setBalance(data.balance);
      } catch (err) {
        setError('Error fetching account balance');
      } finally {
        setLoading(false);
      }
    };

    fetchAccountBalance();
  }, [token, accountId]);

  return { balance, loading, error };
};

export default useAccountBalance;
