// services/BankService.ts
import Bank, { BankAttributes, CreateBankAttributes } from '../models/Bank';
import path from "path";
import xlsx from "xlsx";
import fs from "fs";
import sharp from "sharp"

class BankService {
  async createBank(data: CreateBankAttributes): Promise<Bank> {
    return await Bank.create(data);
  }

  async uploadBulkBanks (filePath: string): Promise<{ success: boolean; count: number }>  {
    try {
      const workbook = xlsx.readFile(filePath, { cellStyles: true });
      const sheetName = workbook.SheetNames[0];
      const sheetData: any[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
      if (!sheetData || sheetData.length === 0) {
        throw new Error("The uploaded file is empty or invalid.");
      }
  
      const banks = await Promise.all(
        sheetData.map(async (row, index) => {
          const { name, logo } = row;
  
          if (!name || !logo) {
            throw new Error(`Row ${index + 1} is missing required fields: name or logo.`);
          }
  
     
          const imageBuffer = Buffer.from(logo.replace(/^data:image\/\w+;base64,/, ""), "base64");
          const imageFileName = `${Date.now()}_${index}.png`;
          const imagePath = path.resolve(__dirname, "../uploads/images", imageFileName);
  

          await sharp(imageBuffer).resize(300, 300).toFile(imagePath);
  
    
          return await Bank.create({ name, logo: imageFileName });
        })
      );
  
      return { success: true, count: banks.length };
    } catch (error:any) {
      console.error("Error processing bulk upload:", error.message);
      throw error;
    }
  };

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
