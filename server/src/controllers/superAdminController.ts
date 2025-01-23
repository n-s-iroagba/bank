
import { Request, Response } from "express";
import {
  createSuperAdmin,
  verifySuperAdminEmail,
  loginSuperAdmin,
  changeSuperAdminPassword,
  requestSuperAdminPasswordReset,
  requestNewCodeService,
} from "../service/SuperAdminService";

import { CreateSuperAdmin } from "../types/SuperAdminTypes";
import { sendVerificationEmail } from "../service/mailService";
import { JWTService } from "../service/JWTService";

// Register SuperAdmin
export const registerSuperAdmin = async (req: Request, res: Response) => {
  const payload:CreateSuperAdmin = req.body;

  try {
    const superAdmin = await createSuperAdmin(payload);
    const token = JWTService.generateToken({
      id: superAdmin.id,
      email: superAdmin.email,
    });
    await sendVerificationEmail(superAdmin)
    res
      .status(201)
      .json(token);
  } catch (error: any) {
      console.error(error)
  
    res.status(error.status||500).json({ error: error.message });
  }
};

// SuperAdmin Email Verification
export const verifyEmail = async (req: Request, res: Response) => {
  const id = req.params.id

  const { code } = req.body;
  console.log('CODE FROM REQ',code)
  
  try {
   const token = await verifySuperAdminEmail(id, code);
    res.status(200).json(token);
  } catch (error: any) {
      console.error(error)
    res.status(error.status||500).json({ error: error.message });
  }
};
export const requestNewCode = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Fetch the superAdmin details using the service function
    const superAdmin = await requestNewCodeService(Number(id));

    const token = JWTService.generateToken({
      id: superAdmin.id,
      email: superAdmin.email,
    });

    // Respond with the generated token
    res.status(200).json(token); // It’s better to wrap the token in an object for clarity
  } catch (error: any) {
    // Error handling
    console.error(error);
    res.status(error.status || 500).json({ error: error.message });
  }
};
// SuperAdmin Login
export const loginSuperAdminController = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body;
  try {
    const superAdmin = await loginSuperAdmin(email, password);
    res
      .status(200)
      .json({ message: "SuperAdmin logged in successfully", superAdmin });
  } catch (error: any) {
      console.error(error)
    res.status(401).json({ error: error.message });
  }
};


export const changeSuperAdminPasswordController = async (
  req: Request,
  res: Response
) => {
  const superAdminId  = req.params.id;
  console.log(req.body)
  const  newPassword  = req.body.password;
  try {
    await changeSuperAdminPassword(
      superAdminId,
      newPassword
    );
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error: any) {
      console.error(error)
    res.status(error.status||500).json({ error: error.message });
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
      console.error(error)
    res.status(error.status||500).json({ error: error.message });
  }
};
