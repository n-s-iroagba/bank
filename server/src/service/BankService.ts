import Bank, { BankAttributes, CreateBankAttributes } from '../models/Bank';
import path from "path";
import fs from "fs";

const BASE_URL = "http://localhost:5000"
class BankService {


public async createBanks(banksData: { name: string; logo: Express.Multer.File }[],listerId: string) {
  const uploadDir = path.resolve(__dirname, "../uploads/images"); 


  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const createdBanks = await Promise.all(
    banksData.map(async (bank, index) => {
      const { name, logo } = bank;

      if (!name || !logo) {
        throw new Error(`Row ${index + 1} is missing required fields: name or logo.`);
      }

      const logoUrl = `${BASE_URL}/uploads/images/${logo.filename}`;
      const createdBank = await Bank.create({
        name,
        logo: logoUrl,
        listerId
      });

      return createdBank;
    })
  );

  return { count: createdBanks.length };
}
  async getAllBanks(): Promise<Bank[]> {
    return await Bank.findAll();
  }



  async updateBank(id: number, data: any) {
   let bank = await Bank.findOne({
      where: { id },
    });
    const logoUrl =data.logo?.filename? `${BASE_URL}/uploads/images/${data.logo.filename}`:null
    if(bank){
    bank.name = data.name||bank.name;
    bank.logo = logoUrl||bank.logo;
    await bank.save();
    }
    return bank;

  }

  async deleteBank(id: number): Promise<number> {
    return await Bank.destroy({
      where: { id },
    });
  }
}

export default new BankService();
