// controllers/AdminController.ts
import { Request, Response } from 'express';
import { AdminService } from '../service/AdminService';


export class AdminController {
  // Login route for Admin
  static async login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const { token } = await AdminService.loginAdmin(username, password);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}

  