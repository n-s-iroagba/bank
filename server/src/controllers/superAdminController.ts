// /src/controllers/superAdminController.ts
import { Request, Response } from 'express';
import {
  createSuperAdmin,
  loginSuperAdmin,
  createAdminBySuperAdmin,
  updateAdminBySuperAdmin,
  deleteAdmin,
  changeSuperAdminPassword,

  verifySuperAdminEmail,
  loginAdmin,
  requestSuperAdminPasswordReset,
  getAdmins,
} from '../service/adminService';

// Register SuperAdmin
export const registerSuperAdmin = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    const superAdmin = await createSuperAdmin(username, password, email);
    res.status(201).json({ message: 'SuperAdmin created successfully', superAdmin });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

// SuperAdmin Email Verification
export const verifyEmail = async (req: Request, res: Response) => {
  const { username, code } = req.body;
  try {
    await verifySuperAdminEmail(username, code);
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

// SuperAdmin Login
export const loginSuperAdminController = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const superAdmin = await loginSuperAdmin(username, password);
    res.status(200).json({ message: 'SuperAdmin logged in successfully', superAdmin });
  } catch (error:any) {
    res.status(401).json({ error: error.message });
  }
};

// Create Admin by SuperAdmin
export const createAdmin = async (req: Request, res: Response) => {
  const { superAdminId, username, password, email } = req.body;
  try {
    const admin = await createAdminBySuperAdmin(superAdminId, username, password);
    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

// Admin Login
export const loginAdminController = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const admin = await loginAdmin(username, password);
    res.status(200).json({ message: 'Admin logged in successfully', admin });
  } catch (error:any) {
    res.status(401).json({ error: error.message });
  }
};

export const  getAllAdmins = async(req: Request, res: Response) => {
  try {
    const admins = await getAdmins();
    res.status(200).json(admins);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

// Update Admin Details (SuperAdmin)
export const updateAdmin = async (req: Request, res: Response) => {
  const { adminId } = req.params;
  const { username, email, password } = req.body;
  try {
    const updatedAdmin = await updateAdminBySuperAdmin(parseInt(adminId), { username, password });
    res.status(200).json({ message: 'Admin updated successfully', updatedAdmin });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Admin (SuperAdmin)
export const deleteAdminController = async (req: Request, res: Response) => {
  const { adminId } = req.params;
  try {
    await deleteAdmin(parseInt(adminId));
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

// Change SuperAdmin Password
export const changeSuperAdminPasswordController = async (req: Request, res: Response) => {
  const { superAdminId} = req.params 
  const { oldPassword, newPassword } = req.body;
  try {
    await changeSuperAdminPassword(Number(superAdminId), oldPassword, newPassword);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

// Request Admin Password Reset (SuperAdmin initiates it)
export const requestSuperAdminPasswordResetController = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    await requestSuperAdminPasswordReset(email);
    res.status(200).json({ message: 'Password reset requested successfully' });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};
