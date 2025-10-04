import { Bank, BankCreationAttributes } from '../models/bank';
import { BaseRepository } from './baseRepository';

export class BankRepository extends BaseRepository<Bank> {
  constructor() {
    super(Bank);
  }

  async findByName(name: string): Promise<Bank | null> {
    return await this.findOne({ name });
  }

  async bulkCreate(banks: BankCreationAttributes[]): Promise<Bank[]> {
    try {
      return await Bank.bulkCreate(banks);
    } catch (error) {
      throw new Error(`Error bulk creating banks: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}