
import { FixedTermDepositCreationAttributes } from "../models/fixedTermDeposit";
import { accountHolderRepository, fixedDepositRepository } from "../repositories";
import {ValidationError , NotFoundError, AppError, InternalServerError } from "../utils/errors";


export class FixedDepositService {
  async createFixedDeposit(data: FixedTermDepositCreationAttributes) {
    try {
      // Check if account holder exists
      const accountHolder = await accountHolderRepository.findById(data.accountHolderId);
      if (!accountHolder) {
        throw new NotFoundError('Account holder not found');
      }

      // Calculate maturity date
      const maturityDate = new Date();
      maturityDate.setMonth(maturityDate.getMonth() + data.term);

      const fixedDepositData = {
        ...data,
        maturityDate,
      };

      return await fixedDepositRepository.create(fixedDepositData);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to create fixed deposit');
    }
  }

  async getFixedDepositById(id: number) {
    try {
      const fixedDeposit = await fixedDepositRepository.findByIdWithDetails(id);
      if (!fixedDeposit) {
        throw new NotFoundError('Fixed deposit not found');
      }
      return fixedDeposit;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to fetch fixed deposit');
    }
  }

  async getFixedDepositsByAccountHolderId(accountHolderId: number, page: number = 1, limit: number = 10) {
    try {
      const accountHolder = await accountHolderRepository.findById(accountHolderId);
      if (!accountHolder) {
        throw new NotFoundError('Account holder not found');
      }

      const offset = (page - 1) * limit;
      const fixedDeposits = await fixedDepositRepository.findByAccountHolderId(accountHolderId, {
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      const totalCount = await fixedDepositRepository.findAndCountAll({
        where: { accountHolderId },
      });

      return {
        fixedDeposits,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount.count / limit),
          totalItems: totalCount.count,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to fetch fixed deposits');
    }
  }

  async getAllFixedDeposits(page: number = 1, limit: number = 10) {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await fixedDepositRepository.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [{
          association: 'accountHolder',
          include: [{
            association: 'user',
            attributes: ['firstName', 'lastName', 'email'],
          }],
        }],
      });

      return {
        fixedDeposits: rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      throw new InternalServerError('Failed to fetch fixed deposits');
    }
  }

  async updateFixedDeposit(id: number, data: Partial<FixedTermDepositCreationAttributes>) {
    try {
      const fixedDeposit = await fixedDepositRepository.findById(id);
      if (!fixedDeposit) {
        throw new NotFoundError('Fixed deposit not found');
      }

      // Check if account holder exists if accountHolderId is being updated
      if (data.accountHolderId) {
        const accountHolder = await accountHolderRepository.findById(data.accountHolderId);
        if (!accountHolder) {
          throw new NotFoundError('Account holder not found');
        }
      }

      // Recalculate maturity date if term is being updated
      if (data.term) {
        const maturityDate = new Date(fixedDeposit.createdAt);
        maturityDate.setMonth(maturityDate.getMonth() + data.term);
        data.maturityDate = maturityDate;
      }

      const [affectedCount, updatedFixedDeposits] = await fixedDepositRepository.update(id, data);
      if (affectedCount === 0) {
        throw new InternalServerError('Failed to update fixed deposit');
      }

      return updatedFixedDeposits[0];
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to update fixed deposit');
    }
  }

  async deleteFixedDeposit(id: number) {
    try {
      const fixedDeposit = await fixedDepositRepository.findById(id);
      if (!fixedDeposit) {
        throw new NotFoundError('Fixed deposit not found');
      }

      // Check if deposit has balance
      if (parseFloat(fixedDeposit.balance.toString()) > 0) {
        throw new ValidationError('Cannot delete fixed deposit with balance');
      }

      const deletedCount = await fixedDepositRepository.delete(id);
      if (deletedCount === 0) {
        throw new InternalServerError('Failed to delete fixed deposit');
      }

      return { message: 'Fixed deposit deleted successfully' };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to delete fixed deposit');
    }
  }

  async getMatureDeposits() {
    try {
      return await fixedDepositRepository.findMatureDeposits();
    } catch (error) {
      throw new InternalServerError('Failed to fetch mature deposits');
    }
  }
}