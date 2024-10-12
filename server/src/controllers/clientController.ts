// /src/controllers/clientController.ts
import { Request, Response } from 'express';
import * as clientService from '../service/clientService';

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const getClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const client = await clientService.getClientById(Number(id));
    res.status(200).json(client);
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedClient = await clientService.updateClient(Number(id), req.body);
    res.status(200).json(updatedClient);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await clientService.deleteClient(Number(id));
    res.status(204).send();
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
};

export const addTransfer = async (req: Request, res: Response) => {
  try {
    const transfer = await clientService.addTransfer(req.body);
    res.status(201).json(transfer);
  } catch (error:any) {
    res.status(400).json({ message: error.message });
  }
};

export const getTransfers = async (req: Request, res: Response) => {
  const { clientId } = req.params;
  try {
    const transfers = await clientService.getTransfersByClientId(Number(clientId));
    res.status(200).json(transfers);
  } catch (error:any) {
    res.status(404).json({ message: error.message });
  }
};
