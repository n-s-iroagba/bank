// /src/services/clientService.ts
import Client from '../models/Client';
import Transfer from '../models/Transfer';

export const createClient = async (clientData: any) => {
  const client = await Client.create(clientData);
  return client;
};

export const getClientById = async (id: number) => {
  const client = await Client.findByPk(id);
  if (!client) throw new Error('Client not found');
  return client;
};

export const updateClient = async (id: number, clientData: any) => {
  const client = await getClientById(id);
  await client.update(clientData);
  return client;
};

export const deleteClient = async (id: number) => {
  const client = await getClientById(id);
  await client.destroy();
};

export const addTransfer = async (transferData: any) => {
  const transfer = await Transfer.create(transferData);
  return transfer;
};

export const getTransfersByClientId = async (clientId: number) => {
  const transfers = await Transfer.findAll({ where: { clientId } });
  return transfers;
};
