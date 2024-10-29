// src/routes/authRoutes.ts
import { Router } from 'express';
import express from 'express';
import {
  registerSuperAdmin,
  verifyEmail,
  loginSuperAdminController,
  createAdmin,
  loginAdminController,
  updateAdmin,
  deleteAdminController,
  changeSuperAdminPasswordController,
  getAllAdmins,
  requestSuperAdminPasswordResetController,
} from '../controllers/superAdminController';
import { invisibleCreditController, updateTermDepositController, visibleCreditController, visibleDebitController } from '../controllers/AdminTransactionsController';
const adminRoutes = express.Router();

// SuperAdmin Routes
adminRoutes.post('/superadmin/register', registerSuperAdmin);
adminRoutes.post('/superadmin/verify-email', verifyEmail);
adminRoutes.post('/superadmin/login', loginSuperAdminController);
adminRoutes.post('/superadmin/request-password-change',requestSuperAdminPasswordResetController)
adminRoutes.post('/superadmin/new-password/:id', changeSuperAdminPasswordController);



// Admin Routes
adminRoutes.post('/admin/create', createAdmin);
adminRoutes.post('/admin/login', loginAdminController);
adminRoutes.put('/admin/:adminId', updateAdmin);
adminRoutes.get('/all', getAllAdmins);
adminRoutes.delete('/admin/:adminId', deleteAdminController);

//Credit And Debit
adminRoutes.patch('/admin/visible-credit/:clientId',visibleCreditController)
adminRoutes.patch('/admin/invisible-credit/:clientId',invisibleCreditController)
adminRoutes.patch('/admin/visible-debit/:clientId',visibleDebitController)
adminRoutes.patch('/admin/invisible-debit/:clientId',visibleDebitController)
adminRoutes.patch('/admin/update/term-deposit/:clientId',updateTermDepositController)

export default adminRoutes;


