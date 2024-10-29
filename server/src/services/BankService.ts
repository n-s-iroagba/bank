import Bank from '../models/Bank';

class BankService {
  async getAllBanks() {
    return await Bank.findAll();
  }


  async createBank(data: { name: string; logo: string }) {
    return await Bank.create(data);
  }

  async updateBank(id: number, data: { name?: string; logo?: string }) {
    const bank = await Bank.findByPk(id);
    if (bank) {
      await bank.update(data);
      return bank;
    }
    return null;
  }

  async deleteBank(id: number) {
    const bank = await Bank.findByPk(id);
    if (bank) {
      await bank.destroy();
      return true;
    }
    return false;
  }
}

export default new BankService();
