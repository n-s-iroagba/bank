// src/hooks/useTransfers.ts
import { useEffect, useState } from 'react';
import { fetchTransactions } from '../../../services/transferService';

interface Transfer {
  id: number;
  amount: number;
  date: string;
  description: string;
}

const useTransfers = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = 'a'
  useEffect(() => {
    // const loadTransfers = async () => {
    //   setLoading(true);
    //   setError(null); // Reset error state

    //   try {
    //     const data = await fetchTransactions(token);
    //     setTransfers(data);
    //   } catch (err) {
    //     setError('Error fetching transfers');
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // loadTransfers();
    setLoading(false)
    const dummyData: Transfer[] = [
        { id: 1, amount: -100, date: '2022-01-01', description: 'Transfer 1' },
        { id: 2, amount: 200, date: '2022-01-01', description: 'Transfer 2' },
        { id: 3, amount: -300, date: '2022-02-01', description: 'Transfer 3'},
        { id: 4, amount: 150, date: '2022-03-01', description: 'Transfer 4' },
        { id: 5, amount: -250, date: '2022-03-01', description: 'Transfer 5'},
      ];
       setTransfers(dummyData)
  }, []);

  return { transfers, loading, error };
};

export default useTransfers;
