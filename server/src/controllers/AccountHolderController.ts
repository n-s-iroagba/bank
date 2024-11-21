import { Request, Response } from 'express';
import { AccountHolderService } from '../service/AccountHolderService';

import { AccountHolder } from '../models/AccountHolder';
import { CreateAccountHolder, UpdateAccountHolder } from '../types/AccountHolderTypes';


export class AccountHolderController {
  static async createAccountHolder(req: Request, res: Response) {
    const id = parseInt(req.params.id)
    try {
      const data:CreateAccountHolder = req.body;
      const newAccountHolder = await AccountHolderService.createAccountHolder(id, data);
      res.status(201).json(newAccountHolder);
    } catch (error: any) {
      res.status(error.status||500).json({ message: error.message });
    }
  }

  static async getByAdminId(req: Request, res: Response) {
    const adminId = parseInt(req.params.id);

    try {
      const accountHolders = await AccountHolderService.getByAdminId(adminId);
      res.status(200).json(accountHolders);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }


  static async update(req: Request, res: Response) {
    const id = req.params.id;
    const { firstname, surname, middlename, username, password }: UpdateAccountHolder = req.body;

    try {
      const updatedAccountHolder = await AccountHolderService.update(Number(id),{
        
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
