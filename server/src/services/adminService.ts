// /src/services/adminService.ts
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { SuperAdmin } from '../models/SuperAdmin'; // Import SuperAdmin model
import { Admin } from '../models/Admin'; // Import Admin model
import { sendVerificationEmail, sendResetPasswordEmail } from './mailService';

// SuperAdmin Registration and Verification
export const createSuperAdmin = async (username: string, password: string, email: string) => {
  const existingSuperAdmin = await SuperAdmin.findOne({ where: { username } });
  if (existingSuperAdmin) {
    throw new Error('SuperAdmin already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newSuperAdmin = await SuperAdmin.create({
    username,
    password: hashedPassword,
    email,
    isVerified: false,
  });

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  newSuperAdmin.verificationCode = verificationCode;
  await newSuperAdmin.save();
  sendVerificationEmail(email, verificationCode);

  return newSuperAdmin;
};

export const verifySuperAdminEmail = async (username: string, code: string) => {
  const superAdmin = await SuperAdmin.findOne({ where: { username } });
  if (!superAdmin) {
    throw new Error('Invalid SuperAdmin');
  }

  if (code === superAdmin.verificationCode) {
    superAdmin.isVerified = true;
    superAdmin.verificationCode = null;
    await superAdmin.save();
  } else {
    throw new Error('Invalid verification code');
  }
};

// SuperAdmin Login
export const loginSuperAdmin = async (username: string, password: string) => {
  const superAdmin = await SuperAdmin.findOne({ where: { username } });
  if (!superAdmin || !superAdmin.isVerified) {
    throw new Error('Invalid username or password');
  }

  const isMatch = await bcrypt.compare(password, superAdmin.password);
  if (!isMatch) {
    throw new Error('Invalid username or password');
  }

  return superAdmin;
};

// SuperAdmin Creates Admin Account
export const createAdminBySuperAdmin = async (superAdminId: number, username: string, password: string) => {
  const existingAdmin = await Admin.findOne({ where: { username } });
  if (existingAdmin) {
    throw new Error('Admin already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAdmin = await Admin.create({
    superAdminId, 
    username,
    password: hashedPassword,
  });


  return newAdmin;
};

// Admin Login
export const loginAdmin = async (username: string, password: string) => {
  const admin = await Admin.findOne({ where: { username } });
  if (!admin) {
    throw new Error('Invalid username or password');
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error('Invalid username or password');
  }

  return admin;
};

// SuperAdmin Changes Password for themselves
export const changeSuperAdminPassword = async (superAdminId: number, oldPassword: string, newPassword: string) => {
  const superAdmin = await SuperAdmin.findByPk(superAdminId);
  if (!superAdmin) {
    throw new Error('SuperAdmin not found');
  }

  const isMatch = await bcrypt.compare(oldPassword, superAdmin.password);
  if (!isMatch) {
    throw new Error('Old password is incorrect');
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  superAdmin.password = hashedNewPassword;
  await superAdmin.save();
};

// SuperAdmin Changes Admin Details (Login Details)
export const updateAdminBySuperAdmin = async (adminId: number, updatedFields: { username?: string; password?: string }) => {
  const admin = await Admin.findByPk(adminId);
  if (!admin) {
    throw new Error('Admin not found');
  }

  if (updatedFields.username) admin.username = updatedFields.username;


  if (updatedFields.password) {
    const hashedPassword = await bcrypt.hash(updatedFields.password, 10);
    admin.password = hashedPassword;
  }

  await admin.save();
  return admin;
};


export const deleteAdmin = async (adminId: number) => {
  const admin = await Admin.findByPk(adminId);
  if (!admin) {
    throw new Error('Admin not found');
  }

  await admin.destroy();
};


export const requestSuperAdminPasswordReset = async (email: string) => {
  const admin = await SuperAdmin.findOne({ where: { email } });
  if (!admin) {
    throw new Error('Admin not found');
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000)
  sendResetPasswordEmail(email, resetCode.toString());
  admin.resetCode = resetCode;
  await admin.save();
};

export const getAdmins= async() => {
  try {
    const admins = await Admin.findAll();
    return admins;
  } catch (error) {
    throw new Error('Failed to fetch admins');
  }
}