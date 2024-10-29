// /src/controllers/clientController.ts
import { Request, Response } from 'express';
import * as clientService from '../service/clientService';

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getClientsByAdminId = async (req: Request, res: Response) => {
  const { adminId } = req.params;
  try {
    const clients = await clientService.getClientsByAdminId(Number(adminId));
    res.status(200).json(clients);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const client = await clientService.getClientById(Number(id));
    res.status(200).json(client);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedClient = await clientService.updateClient(Number(id), req.body);
    res.status(200).json(updatedClient);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await clientService.deleteClient(Number(id));
    res.status(204).send();
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const loginClient = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = await clientService.loginClient(username, password);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};



