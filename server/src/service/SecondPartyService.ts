
import Bank from '../models/Bank';
import { SecondParty } from '../models/SecondParty';
import { CreateSecondParty } from '../types/SecondPartyTypes';

export class SecondPartyService {
  // Create a new SecondParty
  static async createSecondParty(adminId:number,data: CreateSecondParty) {
    return await SecondParty.create({
      firstName: data.firstName,
      surname: data.surname,
      accountNumber: Math.random()*10000000000,
      bankId: data.bankId,
      adminId: adminId
    });
  }static async bulkCreateSecondParties(data: { firstName: string; surname: string }[],adminId:number): Promise<SecondParty[]> {
    // Fetch all banks
    const banks = await Bank.findAll();
    if (banks.length === 0) {
      throw new Error('No banks found to assign to second parties.');
    }
  
    // Get bank IDs
    const bankIds = banks.map((bank) => bank.id);
  
    // Map data to include random bank IDs
    const secondParties = data.map((entry) => ({
      ...entry,
      bankId: bankIds[Math.floor(Math.random() * bankIds.length)], // Randomly assign bank
      accountNumber: Math.floor(100000000 + Math.random() * 900000000), // Random 9-digit account number

      adminId: adminId, // Replace with actual adminId logic
    }));
  
    // Bulk create the second parties
    try {
      return await SecondParty.bulkCreate(secondParties);
    } catch (error) {
      console.error('Error creating second parties:', error);
      throw error;
    }
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
