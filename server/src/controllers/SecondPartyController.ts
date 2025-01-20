// controllers/SecondPartyController.ts
import { Request, Response } from 'express';

import { SecondPartyService } from '../service/SecondPartyService';
import { CreateSecondParty } from '../types/SecondPartyTypes';
import xlsx from "xlsx";

export class SecondPartyController {
  // Create a new SecondParty
  static async createSecondParty(req: Request, res: Response) {
    const adminId = parseInt(req.params.id)
    try {
      const data: CreateSecondParty = req.body;
      const newSecondParty = await SecondPartyService.createSecondParty(adminId,data);
      res.status(201).json(newSecondParty);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async uploadBulkSecondParties(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    if (!req.file) {
      res.status(400).json({ message: "No file uploaded." });
      return; // Ensure void is returned here
    }

    try {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheetData: any[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const result = await SecondPartyService.bulkCreateSecondParties(sheetData, id);

      res.status(201).json({ message: `Successfully uploaded ${result.length} second parties.` });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllSecondParties(req: Request, res: Response): Promise<void> {
    try {
      const secondParties = await SecondPartyService.getAllSecondParties();
      res.status(200).json(secondParties);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  // Update a SecondParty by ID
  static async updateSecondParty(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const data: Partial<CreateSecondParty> = req.body;

    try {
      const updatedSecondParty = await SecondPartyService.updateSecondParty(id, data);
      res.status(200).json(updatedSecondParty);
    } catch (error: any) {
      console.error(error)
      res.status(error.message === 'SecondParty not found' ? 404 : 500).json({ message: error.message });
    }
  }

  // Delete a SecondParty by ID
  static async deleteSecondParty(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const deletedSecondParty = await SecondPartyService.deleteSecondParty(id);
      res.status(200).json({ message: 'SecondParty deleted successfully', deletedSecondParty });
    } catch (error: any) {
      console.error(error)
      res.status(error.message === 'SecondParty not found' ? 404 : 500).json({ message: error.message });
    }
  }
}
