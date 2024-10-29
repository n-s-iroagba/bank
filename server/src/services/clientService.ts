import Client from '../models/Client'; // Adjust import based on your project structure
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Assuming you are using JWT for authentication

export const createClient = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return await Client.create({ ...data, password: hashedPassword });
};

export const getClientsByAdminId = async (adminId: number) => {
  // Assuming you have an association set up for adminId
  return await Client.findAll({ where: { adminId } });
};

export const getClientById = async (id: number) => {
  return await Client.findByPk(id);
};

export const updateClient = async (id: number, data: any) => {
  const client = await Client.findByPk(id);
  if (!client) throw new Error('Client not found');
  return await client.update(data);
};

export const deleteClient = async (id: number) => {
  const client = await Client.findByPk(id);
  if (!client) throw new Error('Client not found');
  return await client.destroy();
};

export const loginClient = async (username: string, password: string) => {
  const client = await Client.findOne({ where: { username } });
  if (!client) throw new Error('Client not found');

  const isMatch = await bcrypt.compare(password, client.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: client.id, username: client.username }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h',
  });

  return token;
};
