import { FixedTermDeposit, FixedTermDepositCreationAttributes } from '../models/fixedTermDeposit';
import { BaseRepository } from './baseRepository';
import { FindOptions, Includeable } from 'sequelize';

export class FixedDepositRepository extends BaseRepository<FixedTermDeposit> {
  constructor() {
    super(FixedTermDeposit);
  }

  async findByAccountNumber(accountNumber: string): Promise<FixedTermDeposit | null> {
    return await this.findOne({ accountNumber });
  }

  async findByAccountHolderId(accountHolderId: number, options?: FindOptions): Promise<FixedTermDeposit[]> {
    return await this.findAll({
      where: { accountHolderId },
      ...options,
    });
  }

  async findActiveDeposits(): Promise<FixedTermDeposit[]> {
    return await this.findAll({
      where: { isActive: true },
      order: [['maturityDate', 'ASC']],
    });
  }

  async findMatureDeposits(): Promise<FixedTermDeposit[]> {
    const currentDate = new Date();
    return await this.findAll({
      where: {
        isActive: true,
        maturityDate: { [Symbol.for('lte')]: currentDate },
      },
    });
  }

  async findByIdWithDetails(id: number): Promise<FixedTermDeposit | null> {
    const include: Includeable[] = [
      {
        association: 'accountHolder',
        include: [{
          association: 'user',
        }],
      },
    ];

    return await this.findById(id, { include });
  }
}