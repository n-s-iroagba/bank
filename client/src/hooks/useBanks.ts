import { useState, useEffect } from 'react';
import { getAllBanks } from '../services/bankService';
import { Bank } from '../types/Bank';


interface UseBanksResult {
  banks: Bank[];
  bankError: string | null;
  bankLoading: boolean;
}

const useBanks = (): UseBanksResult => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [bankError, setbankError] = useState<string | null>(null);
  const [bankLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBanks = async () => {
      setLoading(true);
      try {
        const data = await getAllBanks();
        setBanks(data);
      } catch (err: any) {
        setbankError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  return { banks, bankError, bankLoading };
};

export default useBanks;
