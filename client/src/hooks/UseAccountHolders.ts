import { useState, useEffect } from 'react';
import { AccountHolder } from '../types/AccountHolder';
import { getAccountHoldersByAdminId } from '../services/accountHolderService';


interface UseAccountHoldersResult {
  accountHolders: AccountHolder[];
  accountHoldersError: string | null;
  accountLoading: boolean;
}

const useAccountHolders = (adminId: number | null): UseAccountHoldersResult => {
  const [accountHolders, setAccountHolders] = useState<AccountHolder[]>([]);
  const [accountHoldersError, setaccountHoldersError] = useState<string | null>(null);
  const [accountLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (adminId !== null) {
      const fetchAccountHolders = async () => {
        setLoading(true);
        try {
          const data = await getAccountHoldersByAdminId(adminId);
          setAccountHolders(data);
        } catch (err: any) {
          setaccountHoldersError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAccountHolders();
    }
  }, [adminId]);

  return { accountHolders, accountHoldersError, accountLoading };
};

export default useAccountHolders;

