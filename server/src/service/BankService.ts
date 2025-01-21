// services/BankService.ts
import Bank, { BankAttributes, CreateBankAttributes } from '../models/Bank';
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import fs from "fs";
import sharp from "sharp"

class BankService {
  public async createBanks(banksData: { name: string; logo: Express.Multer.File }[]) {
    const uploadDir = path.resolve(__dirname, '../uploads/images'); // Directory to save images

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
console.log(' BANNNN',banksData)
    const createdBanks = await Promise.all(
      banksData.map(async (bank, index) => {
        const { name, logo } = bank;
        
        if (!name || !logo) {
          throw new Error(`Row ${index + 1} is missing required fields: name or logo.`);
        }

        // Generate a unique file name for the logo
        const imageFileName = `${uuidv4()}_${index}.png`;
        const imagePath = path.join(uploadDir, imageFileName);

        // Process the logo image (resize it to 300x300)
        const imageBuffer = logo.buffer;
      

        // Save bank data with the processed logo path
        const createdBank = await Bank.create({
          name,
          logo: imageFileName,
        });

        return createdBank;
      })
    );

    return { count: createdBanks.length };
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
