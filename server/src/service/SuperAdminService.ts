
import bcrypt from 'bcrypt';

import { Admin } from '../models/Admin';
import { SuperAdmin } from '../models/SuperAdmin';
import { JWTService } from './JWTService';




// Create a SuperAdmin
export const createSuperAdmin = async (firstname: string,surname: string, password: string, email: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = JWTService.generateToken({firstname:firstname})
  const superAdmin = await SuperAdmin.create({
    password: hashedPassword, email:email,
    firstname: firstname,
    surname: surname,
    verificationCode:verificationCode
  });
  const admin = await Admin.create({
    username:firstname, password: hashedPassword, email, superAdminId: superAdmin.id,
   
  });
  superAdmin.adminIdentification = admin.id;
  await superAdmin.save()
 
  return superAdmin;
};


export const verifySuperAdminEmail = async (id: string, code: string) => {
  const superAdmin = await SuperAdmin.findOne({ where: { id:id, verificationCode: code } });
  if (!superAdmin) {
    throw new Error('Invalid verification code or username');
  }
  superAdmin.isVerified = true;
  await superAdmin.save();
};

export const loginSuperAdmin = async (email: string, password: string) => {
  const superAdmin = await SuperAdmin.findOne({ where: { email } });
  if (!superAdmin) {
    throw new Error('SuperAdmin not found');
  }
  const passwordMatch = await bcrypt.compare(password, superAdmin.password);
  if (!passwordMatch) {
    throw new Error('Incorrect password');
  }
  return superAdmin;
};

export const changeSuperAdminPassword = async (superAdminId: number, newPassword: string) => {
  const superAdmin = await SuperAdmin.findByPk(superAdminId);
  if (!superAdmin) {
    throw new Error('SuperAdmin not found');
  }

  superAdmin.password = await bcrypt.hash(newPassword, 10);
  await superAdmin.save();
};


export const requestSuperAdminPasswordReset = async (email: string) => {
  const superAdmin = await SuperAdmin.findOne({ where: { email } });
  if (!superAdmin) {
    throw new Error('SuperAdmin not found');
  }
   const resetToken =  JWTService.generateToken({firstname:superAdmin.firstname})
   superAdmin.resetCode = resetToken;
  // For example, sendResetEmail(superAdmin.email, resetToken);
};
