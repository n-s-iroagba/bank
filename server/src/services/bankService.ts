
import { BankCreationAttributes } from "../models/bank";
import { bankRepository } from "../repositories";
import { ConflictError, AppError, InternalServerError, NotFoundError, ValidationError } from "../utils/errors";
import { parseExcelFile } from "../utils/helpers";


export class BankService {
  async createBank(data: BankCreationAttributes) {
    try {
      // Check if bank with same name already exists
      const existingBank = await bankRepository.findByName(data.name);
      if (existingBank) {
        throw new ConflictError('Bank with this name already exists');
      }

      return await bankRepository.create(data);
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to create bank');
    }
  }

  async getBankById(id: number) {
    try {
      const bank = await bankRepository.findById(id);
      if (!bank) {
        throw new NotFoundError('Bank not found');
      }
      return bank;
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to fetch bank');
    }
  }

  async getAllBanks(page: number = 1, limit: number = 10) {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await bankRepository.findAndCountAll({
        limit,
        offset,
        order: [['name', 'ASC']],
      });

      return {
      data: rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(error)

      throw new InternalServerError('Failed to fetch banks');
    }
  }

  async updateBank(id: number, data: Partial<BankCreationAttributes>) {
    try {
      const bank = await bankRepository.findById(id);
      if (!bank) {
        throw new NotFoundError('Bank not found');
      }

      // Check if another bank with the same name exists
      if (data.name) {
        const existingBank = await bankRepository.findByName(data.name);
        if (existingBank && existingBank.id !== id) {
          throw new ConflictError('Another bank with this name already exists');
        }
      }

      const [affectedCount, updatedBanks] = await bankRepository.update(id, data);
      if (affectedCount === 0) {
        throw new InternalServerError('Failed to update bank');
      }

      return updatedBanks[0];
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to update bank');
    }
  }

  async deleteBank(id: number) {
    try {
      const bank = await bankRepository.findById(id);
      if (!bank) {
        throw new NotFoundError('Bank not found');
      }

      const deletedCount = await bankRepository.delete(id);
      if (deletedCount === 0) {
        throw new InternalServerError('Failed to delete bank');
      }

      return { message: 'Bank deleted successfully' };
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to delete bank');
    }
  }

  async bulkCreateBanksFromForm(banksData: BankCreationAttributes[]) {
    try {
      if (!banksData || banksData.length === 0) {
        throw new ValidationError('No bank data provided');
      }

      return await bankRepository.bulkCreate(banksData);
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to bulk create banks');
    }
  }

  async bulkCreateBanksFromExcel(fileBuffer: Buffer) {
    try {
      const banksData = await parseExcelFile(fileBuffer);
      
      if (!banksData || banksData.length === 0) {
        throw new ValidationError('No valid bank data found in Excel file');
      }

      // Validate and transform Excel data
      const validatedBanks = banksData.map((bank: any) => {
        if (!bank.name || !bank.logo) {
          throw new ValidationError('Excel file must contain name and logo columns');
        }

        return {
          name: bank.name,
          logo: bank.logo,
        };
      });

      return await bankRepository.bulkCreate(validatedBanks);
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to bulk create banks from Excel');
    }
  }
}