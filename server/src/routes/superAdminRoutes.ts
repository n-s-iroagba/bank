// src/routes/authRoutes.ts
import { Router } from 'express';
import express from 'express';
import { Request,Response } from 'express';
import { registerSuperAdmin, verifyEmail, loginSuperAdminController, requestSuperAdminPasswordResetController, changeSuperAdminPasswordController, requestNewCode } from '../controllers/superAdminController';


const superAdminRoutes = express.Router();

superAdminRoutes.get('/', async (req: Request, res: Response) => {
      res.send('Bank server is up and running');
  })

// SuperAdmin Routes
superAdminRoutes.post('/super-admin/register', registerSuperAdmin);
superAdminRoutes.patch('/verify-email/:id', verifyEmail);
superAdminRoutes.get('/new-verification-code/:id',requestNewCode)
superAdminRoutes.post('/login', loginSuperAdminController);
superAdminRoutes.post('/request-change-password',requestSuperAdminPasswordResetController)
superAdminRoutes.post('/new-password/:id', changeSuperAdminPasswordController);




export default superAdminRoutes

