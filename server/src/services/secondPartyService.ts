


import { SecondPartyCreationAttributes } from '../models/secondParty';
import { bankRepository, secondPartyRepository } from '../repositories';
import { NotFoundError, ConflictError, AppError, InternalServerError, ValidationError } from '../utils/errors';
import { parseExcelFile } from '../utils/helpers';

export class SecondPartyService {
  async createSecondParty(data: SecondPartyCreationAttributes) {
    try {
      // Check if bank exists
      const bank = await bankRepository.findById(data.bankId);
      if (!bank) {
        throw new NotFoundError('Bank not found');
      }

      // Check if second party with same name and bank already exists
      const existingSecondParty = await secondPartyRepository.findByNameAndBankId(
        data.name,
        data.bankId
      );
      if (existingSecondParty) {
        throw new ConflictError('Second party with this name already exists for this bank');
      }

      return await secondPartyRepository.create(data);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to create second party');
    }
  }

  async getSecondPartyById(id: number) {
    try {
      const secondParty = await secondPartyRepository.findById(id, {
        include: ['bank'],
      });
      if (!secondParty) {
        throw new NotFoundError('Second party not found');
      }
      return secondParty;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to fetch second party');
    }
  }

  async getSecondPartiesByBankId(bankId: number, page: number = 1, limit: number = 10) {
    try {
      const bank = await bankRepository.findById(bankId);
      if (!bank) {
        throw new NotFoundError('Bank not found');
      }

      const offset = (page - 1) * limit;
      const secondParties = await secondPartyRepository.findByBankId(bankId, {
        limit,
        offset,
        order: [['name', 'ASC']],
        include: ['bank'],
      });

      const totalCount = await secondPartyRepository.findAndCountAll({
        where: { bankId },
      });

      return {
        secondParties,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount.count / limit),
          totalItems: totalCount.count,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to fetch second parties');
    }
  }

  async getAllSecondParties(page: number = 1, limit: number = 10) {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await secondPartyRepository.findAndCountAll({
        limit,
        offset,
        order: [['name', 'ASC']],
        include: ['bank'],
      });

      return {
        secondParties: rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      throw new InternalServerError('Failed to fetch second parties');
    }
  }

  async updateSecondParty(id: number, data: Partial<SecondPartyCreationAttributes>) {
    try {
      const secondParty = await secondPartyRepository.findById(id);
      if (!secondParty) {
        throw new NotFoundError('Second party not found');
      }

      // Check if bank exists if bankId is being updated
      if (data.bankId) {
        const bank = await bankRepository.findById(data.bankId);
        if (!bank) {
          throw new NotFoundError('Bank not found');
        }
      }

      // Check if another second party with the same name and bank exists
      if (data.name) {
        const bankId = data.bankId || secondParty.bankId;
        const existingSecondParty = await secondPartyRepository.findByNameAndBankId(
          data.name,
          bankId
        );
        if (existingSecondParty && existingSecondParty.id !== id) {
          throw new ConflictError('Another second party with this name already exists for this bank');
        }
      }

      const [affectedCount, updatedSecondParties] = await secondPartyRepository.update(id, data);
      if (affectedCount === 0) {
        throw new InternalServerError('Failed to update second party');
      }

      return updatedSecondParties[0];
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to update second party');
    }
  }

  async deleteSecondParty(id: number) {
    try {
      const secondParty = await secondPartyRepository.findById(id);
      if (!secondParty) {
        throw new NotFoundError('Second party not found');
      }

      const deletedCount = await secondPartyRepository.delete(id);
      if (deletedCount === 0) {
        throw new InternalServerError('Failed to delete second party');
      }

      return { message: 'Second party deleted successfully' };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to delete second party');
    }
  }

  async bulkCreateSecondPartiesFromForm(secondPartiesData: SecondPartyCreationAttributes[]) {
    try {
      if (!secondPartiesData || secondPartiesData.length === 0) {
        throw new ValidationError('No second party data provided');
      }

      // Validate all bank IDs exist
      const bankIds = [...new Set(secondPartiesData.map(sp => sp.bankId))];
      const banks = await bankRepository.findAll({
        where: { id: bankIds },
      });

      if (banks.length !== bankIds.length) {
        throw new ValidationError('One or more bank IDs are invalid');
      }

      return await secondPartyRepository.bulkCreate(secondPartiesData);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to bulk create second parties');
    }
  }

  async bulkCreateSecondPartiesFromExcel(fileBuffer: Buffer) {
    try {
      const secondPartiesData = await parseExcelFile(fileBuffer);
      
      if (!secondPartiesData || secondPartiesData.length === 0) {
        throw new ValidationError('No valid second party data found in Excel file');
      }

      // Validate and transform Excel data
      const validatedSecondParties = secondPartiesData.map((secondParty: any) => {
        if (!secondParty.name || !secondParty.details || !secondParty.bank_id) {
          throw new ValidationError('Excel file must contain name, details, and bank_id columns');
        }

        return {
          name: secondParty.name,
          details: secondParty.details,
          bankId: parseInt(secondParty.bank_id),
        };
      });

      // Validate all bank IDs exist
      const bankIds = [...new Set(validatedSecondParties.map(sp => sp.bankId))];
      const banks = await bankRepository.findAll({
        where: { id: bankIds },
      });

      if (banks.length !== bankIds.length) {
        throw new ValidationError('One or more bank IDs in Excel file are invalid');
      }

      return await secondPartyRepository.bulkCreate(validatedSecondParties);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to bulk create second parties from Excel');
    }
  }
}