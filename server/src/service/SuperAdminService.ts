
import bcrypt from 'bcrypt';

import { Admin } from '../models/Admin';
import { SuperAdmin } from '../models/SuperAdmin';
import { JWTService } from './JWTService';
import { AnySoaRecord } from 'dns';
import { Role } from '../types/Role';
import { BaseAdmin } from '../types/AdminTypes';
import { CreateSuperAdmin } from '../types/SuperAdminTypes';
import { sendVerificationEmail } from './mailService';




// Create a SuperAdmin
export const createSuperAdmin = async (data:CreateSuperAdmin) => {
  try{
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const verificationCode = 123456
  //  Math.floor(100000 + Math.random() * 900000); // 6-digit code

  const superAdmin = await SuperAdmin.create({
    ...data,
    password: hashedPassword, 
    verificationCode: verificationCode,

  });
  const admin = await Admin.create({
    username:data.username, password: hashedPassword, email:data.email, superAdminId: superAdmin.id,
   
  });
  superAdmin.adminIdentification = admin.id;
  await superAdmin.save()
  return superAdmin;
}catch(error:any){
  throw new Error(error);
}
};

export const requestNewCodeService = async (id:number) => {
  try {
    const superAdmin = await SuperAdmin.findByPk(id);
    if (!superAdmin) {
      throw new Error('Super Admin not found')
    }
    const verificationCode = 123456
   //  Math.floor(100000 + Math.random() * 900000); // 6-digit code
    superAdmin.verificationCode = verificationCode;
    await superAdmin.save();
    await sendVerificationEmail(superAdmin);
    return superAdmin;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
   
  }
};

export const verifySuperAdminEmail = async (id: string, code: number) => {
  
  try{
  const superAdmin = await SuperAdmin.findOne({ where: { id:id, verificationCode: code } });
  console.log('ADMINS',await SuperAdmin.findAll())
  if (!superAdmin) {
    throw new Error('Invalid verification code or username');
  }
  superAdmin.isVerified = true;
  await superAdmin.save();
  JWTService.generateToken({...superAdmin as BaseAdmin,role:Role.SUPERADMIN})
}catch(error:any){
  console.error(error);
  throw new Error(error);

}
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

  if (!superAdmin.isVerified) {
    const error = new Error('SuperAdmin not verified') as any;
    error.code = 401;
    throw error;
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
