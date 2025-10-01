// controllers/bankController.ts
import { Request, Response, NextFunction } from "express";
import { bankService } from "../services";



export class BankController {
  async createBank(req: Request, res: Response, next: NextFunction) {
    try {
      const bank = await bankService.createBank(req.body);
      res.status(201).json(bank);
    } catch (error) {
      console.error(error)
       next(error);
    }
  }

  async getBankById(req: Request, res: Response, next: NextFunction) {
    try {
      const bank = await bankService.getBankById(Number(req.params.id));
      res.json(bank);
    } catch (error) {
      console.error(error)
       next(error);
    }
  }

  async getAllBanks(req: Request, res: Response, next: NextFunction) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await bankService.getAllBanks(Number(page), Number(limit));
      res.json(result);
    } catch (error) {
      console.error(error)
       next(error);
    }
  }

  async updateBank(req: Request, res: Response, next: NextFunction) {
    try {
      const bank = await bankService.updateBank(Number(req.params.id), req.body);
      res.json(bank);
    } catch (error) {
      console.error(error)
       next(error);
    }
  }

  async deleteBank(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await bankService.deleteBank(Number(req.params.id));
      res.json(result);
    } catch (error) {
      console.error(error)
       next(error);
    }
  }

  async bulkCreateBanksFromForm(req: Request, res: Response, next: NextFunction) {
    try {
      const banks = await bankService.bulkCreateBanksFromForm(req.body);
      res.status(201).json(banks);
    } catch (error) {
      console.error(error)
       next(error);
    }
  }

  async bulkCreateBanksFromExcel(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Excel file is required" });
      }

      const banks = await bankService.bulkCreateBanksFromExcel(req.file.buffer);
      res.status(201).json(banks);
    } catch (error) {
      console.error(error)
       next(error);
    }
  }
}
