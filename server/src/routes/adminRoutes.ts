
import express from 'express';
import { createAdmin, AdminController, updateAdmin, getAllAdmins, deleteAdmin } from '../controllers/AdminController';

const adminRoutes = express.Router();

adminRoutes.post('create/:superAdminId', createAdmin);
adminRoutes.post('/login', AdminController.login);
adminRoutes.put('/update/:adminId', updateAdmin);
adminRoutes.get('/:superAdminId', getAllAdmins);
adminRoutes.delete('/delete/:adminId', deleteAdmin);

export default adminRoutes


