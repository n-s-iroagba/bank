import { useEffect, useState } from 'react';
import axios from 'axios';

interface Bank {
  id: number;
  name: string;
  logo: string; // assuming this is a URL string
}

interface UseBanksResult {
  banks: Bank[];
  loading: boolean;
  error: string | null;
}

const useBanks = (): UseBanksResult => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get<Bank[]>('/api/banks'); // Adjust the URL to your API endpoint
        setBanks(response.data);
      } catch (err) {
        setError('Failed to fetch banks');
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  return { banks, loading, error };
};

export default useBanks;
