import { Request, Response } from 'express';
import BankService from '../service/BankService';
import path from "path";
import fs from "fs";

class BankController {
  async getAllBanks(req: Request, res: Response) {
    try{
    const banks = await BankService.getAllBanks();
    res.status(200).json(banks);
    }catch(error:any){
      res.status(500).json({ message: error.message });
    }
  }
  async handleBulkUpload (req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded." });
        return;
      }
  
      const filePath = path.resolve(req.file.path);
  
      const result = await BankService.uploadBulkBanks(filePath);
  
      // Delete the uploaded file after processing
      fs.unlinkSync(filePath);
  
      res.status(201).json({
        message: `Successfully uploaded ${result.count} banks.`,
      });
    } catch (error:any) {
      console.error("Bulk upload failed:", error);
      res.status(500).json({ message: error.message });
    }
  };

  async createBank(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const logo = req.file?.path; // Assume a file upload middleware like multer is used
  
      if (!name || !logo) {
        res.status(400).json({ message: 'Name and logo are required' });
        return;
      }
  
      const bank = await BankService.createBank({ name, logo });
      res.status(201).json(bank);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  }
  

  async updateBank(req: Request, res: Response) {
    const { name } = req.body;
    const logo = req.file?.path;
    const bank = await BankService.updateBank(Number(req.params.id), { name, logo });

    if (bank) {
      res.json(bank);
    } else {
      res.status(404).json({ message: 'Bank not found' });
    }
  }

  async deleteBank(req: Request, res: Response) {
    const success = await BankService.deleteBank(Number(req.params.id));
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Bank not found' });
    }
  }
}

export default new BankController();