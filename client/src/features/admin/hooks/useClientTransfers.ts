import { useState } from 'react';
import axios from 'axios';

interface Transfer {
  id: number;
  amount: number;
  date: string;
  description: string;
}

const useClientTransfers = (userId: number | null) => {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransfers = async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/clients/${userId}/transfers`);
      setTransfers(response.data);
    } catch (err) {
      setError('Error fetching transfers');
    } finally {
      setLoading(false);
    }
  };

  return { transfers, loading, error, fetchTransfers };
};

export default useClientTransfers;
