// /src/controllers/adminController.ts
import { Request, Response } from 'express';
import * as adminService from '../service/adminService';

export const signUp = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    await adminService.createAdmin(username, password, email);
    res.status(201).json({ message: 'Account created. Please verify your email.' });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { username, code } = req.body;

  try {
    await adminService.verifyAdminEmail(username, code);
    res.status(200).json({ message: 'Email verified. You can log in now.' });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const admin = await adminService.loginAdmin(username, password);
    res.status(200).json({ message: 'Login successful', admin });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    await adminService.requestPasswordReset(email);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword, resetCode } = req.body;

  try {
    await adminService.resetAdminPassword(email, newPassword, resetCode);
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};
