import { Request, Response } from 'express';
import { AccountHolderService } from '../service/AccountHolderService';
import { BaseAccountHolder } from '../types/AccountHolder';


export class AccountHolderController {
  // Get all AccountHolders
  static async getAll(req: Request, res: Response) {
    try {
      const accountHolders = await AccountHolderService.getAll();
      res.status(200).json(accountHolders);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get AccountHolders by adminId
  static async getByAdminId(req: Request, res: Response) {
    const adminId = parseInt(req.params.adminId);

    try {
      const accountHolders = await AccountHolderService.getByAdminId(adminId);
      res.status(200).json(accountHolders);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Update AccountHolder
  static async update(req: Request, res: Response) {
    const { id, firstname, surname, middlename, username, password }: BaseAccountHolder = req.body;

    try {
      const updatedAccountHolder = await AccountHolderService.update({
        id,
        firstname,
        surname,
        middlename,
        username,
        password,
      });
      res.status(200).json(updatedAccountHolder);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  // Delete AccountHolder by id
  static async delete(req: Request, res: Response) {
    const accountHolderId = parseInt(req.params.id);

    try {
      await AccountHolderService.delete(accountHolderId);
      res.status(200).json({ message: 'Account holder deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async loginAccountHolder(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const accountHolder = await AccountHolderService.loginAccountHolder(username, password);
      if (accountHolder) {
        res.status(200).json({ message: 'Login successful', accountHolder });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
