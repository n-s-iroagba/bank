import { AccountHolder, AccountHolderCreationAttributes } from '../models/accountHolder';
import { BaseRepository } from './baseRepository';
import { FindOptions, Includeable } from 'sequelize';

export class AccountHolderRepository extends BaseRepository<AccountHolder> {
  constructor() {
    super(AccountHolder);
  }

  async findByUserId(userId: number, options?: FindOptions): Promise<AccountHolder | null> {
    return await this.findOne({ userId }, options);
  }

  async findBySsn(ssn: string): Promise<AccountHolder | null> {
    return await this.findOne({ ssn });
  }

  async findAllWithUserDetails(options?: FindOptions): Promise<AccountHolder[]> {
    const include: Includeable[] = [
      // {
      //   association: 'user',
      //   attributes: ['email', 'role', 'isActive', 'lastLogin'],
      // },
    ];

    return await this.findAll({
      include,
      ...options,
    });
  }

  async findByIdWithDetails(id: number): Promise<AccountHolder | null> {
    const include: Includeable[] = [
      // {
      //   association: 'user',
      //   attributes: ['email', 'role', 'isActive', 'lastLogin'],
      // },
      // {
      //   association: 'checkingAccounts',
      //   attributes: ['id', 'accountNumber', 'balance', 'isActive'],
      // },
      // {
      //   association: 'fixedTermDeposits',
      //   attributes: ['id', 'accountNumber', 'balance', 'term', 'interestRate', 'maturityDate', 'isActive'],
      // },
    ];

    return await this.findById(id, { include });
  }
}