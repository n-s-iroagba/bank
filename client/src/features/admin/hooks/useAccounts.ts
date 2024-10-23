import { useState } from 'react';
import { creditAccountWithoutTransfer, debitAccountWithoutTransfer, createAccount, editTransfers } from '../../common/utils/accountApi.';



export const useAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreditAccount = async (accountId: number, amount: number, token: string) => {
    try {
      setLoading(true);
      await creditAccountWithoutTransfer(accountId, amount, token);
    } catch (err) {
      setError('Failed to credit account');
    } finally {
      setLoading(false);
    }
  };

  const handleDebitAccount = async (accountId: number, amount: number, token: string) => {
    try {
      setLoading(true);
      await debitAccountWithoutTransfer(accountId, amount, token);
    } catch (err) {
      setError('Failed to debit account');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (accountData: any, token: string) => {
    try {
      setLoading(true);
      await createAccount(accountData, token);
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTransfers = async (accountId: number, transferData: any, token: string) => {
    try {
      setLoading(true);
      await editTransfers(accountId, transferData, token);
    } catch (err) {
      setError('Failed to edit transfers');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleCreditAccount,
    handleDebitAccount,
    handleCreateAccount,
    handleEditTransfers,
  };
};
