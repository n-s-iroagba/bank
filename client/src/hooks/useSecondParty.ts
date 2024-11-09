import { useState, useEffect } from 'react';
import { getAllSecondParties } from '../services/secondPartyService';
import { SecondParty } from '../types/SecondParty';

interface UseSecondPartyResult {
  secondParties: SecondParty[];
  secondPartyError: string | null;
  secondPartyLoading: boolean;
}

const useSecondParty = (): UseSecondPartyResult => {
  const [secondParties, setSecondParties] = useState<SecondParty[]>([]);
  const [secondPartyError, setSecondPartyError] = useState<string | null>(null);
  const [secondPartyLoading, setsecondPartyLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSecondParties = async () => {
      setsecondPartyLoading(true);
      try {
        const data = await getAllSecondParties();
        setSecondParties(data);
      } catch (err: any) {
        setSecondPartyError(err.message);
      } finally {
        setsecondPartyLoading(false);
      }
    };

    fetchSecondParties();
  }, []);

  return { secondParties, secondPartyError, secondPartyLoading };
};

export default useSecondParty;
