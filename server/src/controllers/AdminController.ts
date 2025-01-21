// controllers/AdminController.ts
import { Request, Response } from 'express';
import { AdminService } from '../service/AdminService';
import { CreateAdmin, UpdateAdmin } from '../types/AdminTypes';


export class AdminController {
  // Login route for Admin
  static async login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const { token } = await AdminService.loginAdmin(username, password);
      res.status(200).json({ token });
    } catch (error: any) {
      console.error(error)
      res.status(401).json({ message: error.message });
    }
  }
}

export const createAdmin = async (req: Request, res: Response) => {
  const superAdminId = parseInt(req.params.superAdminId);
  const {  username, password, email } = req.body  as CreateAdmin;
  try {
    const admin = await AdminService.createAdminBySuperAdmin(
      superAdminId,
      username,
      password,
      email
    );
    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error: any) {
    console.error(error)
    res.status(400).json({ error: error.message });
  }
};


export const getAllAdmins = async (req: Request, res: Response) => {
  const superAdminId = parseInt(req.params.superAdminId)

  try {
    const admins = await AdminService.getAdmins(superAdminId);
    console.log('ADMINS',admins)
    res.status(200).json(admins);
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ message: error.message });
  }
};


export const updateAdmin = async (req: Request, res: Response) => {
  const { adminId } = req.params;
  const { username, email, password }:UpdateAdmin = req.body ;
  try {
    const updatedAdmin = await AdminService.updateAdminBySuperAdmin(parseInt(adminId), {
      username,
      email,
      password,
    });
    res
      .status(200)
      .json({ message: "Admin updated successfully", updatedAdmin });
  } catch (error: any) {
    console.error(error)
    res.status(400).json({ error: error.message });
  }
};


export const deleteAdmin = async (req: Request, res: Response) => {
  const { adminId } = req.params;
  try {
    await AdminService.deleteAdminBySuperAdmin(parseInt(adminId));
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error: any) {
    console.error(error)
    res.status(400).json({ error: error.message });
  }
};