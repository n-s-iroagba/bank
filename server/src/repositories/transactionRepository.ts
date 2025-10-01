import { Transaction, TransactionCreationAttributes } from '../models/transaction';
import { BaseRepository } from './baseRepository';
import { FindOptions, Includeable, WhereOptions } from 'sequelize';

export class TransactionRepository extends BaseRepository<Transaction> {
  constructor() {
    super(Transaction);
  }

  async findByCheckingAccountId(checkingAccountId: number, options?: FindOptions): Promise<Transaction[]> {
    return await this.findAll({
      where: { checkingAccountId },
      order: [['createdAt', 'DESC']],
      ...options,
    });
  }

  async findBySecondPartyId(secondPartyId: number, options?: FindOptions): Promise<Transaction[]> {
    return await this.findAll({
      where: { secondPartyId },
      order: [['createdAt', 'DESC']],
      ...options,
    });
  }

  async findByAccountHolderId(accountHolderId: number, options?: FindOptions): Promise<Transaction[]> {
    const include: Includeable[] = [
      {
        association: 'checkingAccount',
        where: { accountHolderId },
        attributes: [],
      },
    ];

    return await this.findAll({
      include,
      order: [['createdAt', 'DESC']],
      ...options,
    });
  }

  async findWithDetails(where?: WhereOptions, options?: FindOptions): Promise<Transaction[]> {
    const include: Includeable[] = [
      {
        association: 'checkingAccount',
        attributes: ['accountNumber'],
        include: [{
          association: 'accountHolder',
          attributes: ['firstName', 'lastName'],
          include: [{
            association: 'user',
            attributes: ['email'],
          }],
        }],
      },
      {
        association: 'secondParty',
        attributes: ['name', 'details'],
        include: [{
          association: 'bank',
          attributes: ['name', 'logo'],
        }],
      },
    ];

    return await this.findAll({
      where,
      include,
      order: [['createdAt', 'DESC']],
      ...options,
    });
  }

  async getAccountStatement(
    checkingAccountId: number, 
    startDate: Date, 
    endDate: Date
  ): Promise<Transaction[]> {
    return await this.findAll({
      where: {
        checkingAccountId,
        createdAt: {
          [Symbol.for('between')]: [startDate, endDate],
        },
      },
      order: [['createdAt', 'DESC']],
      include: [{
        association: 'secondParty',
        attributes: ['name'],
      }],
    });
  }
}