// services/TermDepositAccountService.ts
import { TermDepositAccount } from '../models/TermDepositAccount';
import { UpdateTermDepositAccount } from '../types/TermDepositAccountTypes';

export class TermDepositAccountService {
  // Update a Term Deposit Account
  static async updateTermDepositAccount(id: number, data: UpdateTermDepositAccount) {
    const account = await TermDepositAccount.findByPk(id);
    if (!account) {
      throw new Error('Term Deposit Account not found');
    }
    await account.update(data);
    return account;
  }

  // Delete a Term Deposit Account
  static async deleteTermDepositAccount(id: number) {
    const account = await TermDepositAccount.findByPk(id);
    if (!account) {
      throw new Error('Term Deposit Account not found');
    }
    await account.destroy();
    return { message: 'Term Deposit Account deleted successfully' };
  }
}
