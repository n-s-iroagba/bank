
import { Request, Response } from "express";
import {
  createSuperAdmin,
  verifySuperAdminEmail,
  loginSuperAdmin,
  changeSuperAdminPassword,
  requestSuperAdminPasswordReset,
} from "../service/SuperAdminService";

import { CreateSuperAdmin } from "../types/SuperAdminTypes";

// Register SuperAdmin
export const registerSuperAdmin = async (req: Request, res: Response) => {
  const { firstname,surname, password, email }:CreateSuperAdmin = req.body;
  try {
    const superAdmin = await createSuperAdmin(firstname,surname,  password, email);
    res
      .status(201)
      .json({ message: "SuperAdmin created successfully", superAdmin });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// SuperAdmin Email Verification
export const verifyEmail = async (req: Request, res: Response) => {
  const id = req.params.id
  const { code } = req.body;
  try {
    await verifySuperAdminEmail(id, code);
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// SuperAdmin Login
export const loginSuperAdminController = async (
  req: Request,
  res: Response
) => {
  const { username, password } = req.body;
  try {
    const superAdmin = await loginSuperAdmin(username, password);
    res
      .status(200)
      .json({ message: "SuperAdmin logged in successfully", superAdmin });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};


export const changeSuperAdminPasswordController = async (
  req: Request,
  res: Response
) => {
  const { superAdminId } = req.params;
  const {  newPassword } = req.body;
  try {
    await changeSuperAdminPassword(
      Number(superAdminId),
      newPassword
    );
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const requestSuperAdminPasswordResetController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  try {
    await requestSuperAdminPasswordReset(email);
    res.status(200).json({ message: "Password reset requested successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
