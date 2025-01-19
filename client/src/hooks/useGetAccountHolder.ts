import { useState, useEffect } from "react";
import { getAccountHolder } from "../services/accountHolderService";
import { BaseAccountHolder } from "../types/AccountHolder";

interface UseGetAccountHolderResult {
  accountHolder: BaseAccountHolder | null;
  loading: boolean;
  error: string | null;
}

const useGetAccountHolder = (id: string): UseGetAccountHolderResult => {
  const [accountHolder, setAccountHolder] = useState<BaseAccountHolder | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccountHolder = async () => {
      try {
        setLoading(true);
        const response = await getAccountHolder(id);
        setAccountHolder(response);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching the account holder.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountHolder();
  }, [id]);

  return { accountHolder, loading, error };
};

export default useGetAccountHolder;
