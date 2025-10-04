import { CheckingAccount, CheckingAccountCreationAttributes } from '../models/checkingAccount';
import { BaseRepository } from './baseRepository';
import { FindOptions, Includeable } from 'sequelize';

export class CheckingAccountRepository extends BaseRepository<CheckingAccount> {
  constructor() {
    super(CheckingAccount);
  }

  async findByAccountNumber(accountNumber: string): Promise<CheckingAccount | null> {
    return await this.findOne({ accountNumber });
  }

  async findByAccountHolderId(accountHolderId: number, options?: FindOptions): Promise<CheckingAccount[]> {
    return await this.findAll({
      where: { accountHolderId },
      ...options,
    });
  }

  async findByIdWithDetails(id: number): Promise<CheckingAccount | null> {
    const include: Includeable[] = [
      {
        association: 'accountHolder',
        include: [{
          association: 'user',
        }],
      },
      {
        association: 'transactions',
        limit: 10,
        order: [['createdAt', 'DESC']],
      },
    ];

    return await this.findById(id, { include });
  }

  async updateBalance(
    id: number, 
    amount: number, 
    transaction?: any
  ): Promise<[number, CheckingAccount[]]> {
    try {
      const account = await this.findById(id);
      if (!account) {
        throw new Error('Account not found');
      }

      const newBalance = parseFloat(account.balance.toString()) + amount;
      if (newBalance < 0) {
        throw new Error('Insufficient funds');
      }

      return await this.update(id, { balance: newBalance }, transaction);
    } catch (error) {
      throw new Error(`Error updating balance: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}