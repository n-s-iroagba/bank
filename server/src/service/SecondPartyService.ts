
import { SecondParty } from '../models/SecondParty';
import { CreateSecondParty } from '../types/SecondPartyTypes';

export class SecondPartyService {
  // Create a new SecondParty
  static async createSecondParty(data: CreateSecondParty) {
    return await SecondParty.create(data);
  }

  // Get all SecondParties
  static async getAllSecondParties() {
    return await SecondParty.findAll();
  }

  // Update a SecondParty by ID
  static async updateSecondParty(id: number, data: Partial<CreateSecondParty>) {
    const secondParty = await SecondParty.findByPk(id);
    if (!secondParty) throw new Error('SecondParty not found');

    return await secondParty.update(data);
  }

  // Delete a SecondParty by ID
  static async deleteSecondParty(id: number) {
    const secondParty = await SecondParty.findByPk(id);
    if (!secondParty) throw new Error('SecondParty not found');

    await secondParty.destroy();
    return secondParty;
  }
}
