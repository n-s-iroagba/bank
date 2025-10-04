import { SecondParty, SecondPartyCreationAttributes } from '../models/secondParty';
import { BaseRepository } from './baseRepository';
import { FindOptions } from 'sequelize';

export class SecondPartyRepository extends BaseRepository<SecondParty> {
  constructor() {
    super(SecondParty);
  }

  async findByBankId(bankId: number, options?: FindOptions): Promise<SecondParty[]> {
    return await this.findAll({
      where: { bankId },
      ...options,
    });
  }

  async findByNameAndBankId(name: string, bankId: number): Promise<SecondParty | null> {
    return await this.findOne({ name, bankId });
  }

  async bulkCreate(secondParties: SecondPartyCreationAttributes[]): Promise<SecondParty[]> {
    try {
      return await SecondParty.bulkCreate(secondParties);
    } catch (error) {
      throw new Error(`Error bulk creating second parties: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}