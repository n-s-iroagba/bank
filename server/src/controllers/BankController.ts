import { Request, Response } from 'express';
import BankService from '../service/BankService';

class BankController {
  async getAllBanks(req: Request, res: Response) {
    const banks = await BankService.getAllBanks();
    res.json(banks);
  }



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