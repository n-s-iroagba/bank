// services/BankService.ts
import Bank, { BankAttributes, CreateBankAttributes } from '../models/Bank';

class BankService {
  async createBank(data: CreateBankAttributes): Promise<Bank> {
    return await Bank.create(data);
  }

  async getAllBanks(): Promise<Bank[]> {
    return await Bank.findAll();
  }



  async updateBank(id: number, data: Partial<BankAttributes>): Promise<[number, Bank[]]> {
    return await Bank.update(data, {
      where: { id },
      returning: true,
    });
  }

  async deleteBank(id: number): Promise<number> {
    return await Bank.destroy({
      where: { id },
    });
  }
}

export default new BankService();
