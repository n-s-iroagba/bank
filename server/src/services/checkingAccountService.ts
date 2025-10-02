import { CheckingAccountCreationAttributes } from "../models/checkingAccount";
import { accountHolderRepository, checkingAccountRepository } from "../repositories";
import { NotFoundError, AppError, InternalServerError } from "../utils/errors";


export class CheckingAccountService {
  async createCheckingAccount(data: CheckingAccountCreationAttributes) {
    try {
      // Check if account holder exists
      const accountHolder = await accountHolderRepository.findById(data.accountHolderId);
      if (!accountHolder) {
        throw new NotFoundError('Account holder not found');
      }

      return await checkingAccountRepository.create(data);
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to create checking account');
    }
  }

  async getCheckingAccountById(id: number) {
    try {
      const checkingAccount = await checkingAccountRepository.findByIdWithDetails(id);
      if (!checkingAccount) {
        throw new NotFoundError('Checking account not found');
      }
      return checkingAccount;
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to fetch checking account');
    }
  }

  async getCheckingAccountsByAccountHolderId(accountHolderId: number, page: number = 1, limit: number = 10) {
    try {
      const accountHolder = await accountHolderRepository.findById(accountHolderId);
      if (!accountHolder) {
        throw new NotFoundError('Account holder not found');
      }

      const offset = (page - 1) * limit;
      const checkingAccounts = await checkingAccountRepository.findByAccountHolderId(accountHolderId, {
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      const totalCount = await checkingAccountRepository.findAndCountAll({
        where: { accountHolderId },
      });

      return {
        checkingAccounts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount.count / limit),
          totalItems: totalCount.count,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to fetch checking accounts');
    }
  }

  async getAllCheckingAccounts(page: number = 1, limit: number = 10) {
    try {
      const offset = (page - 1) * limit;
      const { count, rows } = await checkingAccountRepository.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        include: [{
          association: 'accountHolder',
          include: [{
            association: 'user',
          }],
        }],
      });

      return {
        checkingAccounts: rows,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(error)
      throw new InternalServerError('Failed to fetch checking accounts');
    }
  }

  async updateCheckingAccount(id: number, data: Partial<CheckingAccountCreationAttributes>) {
    try {
      const checkingAccount = await checkingAccountRepository.findById(id);
      if (!checkingAccount) {
        throw new NotFoundError('Checking account not found');
      }

      // Check if account holder exists if accountHolderId is being updated
      if (data.accountHolderId) {
        const accountHolder = await accountHolderRepository.findById(data.accountHolderId);
        if (!accountHolder) {
          throw new NotFoundError('Account holder not found');
        }
      }

      const [affectedCount, updatedCheckingAccounts] = await checkingAccountRepository.update(id, data);
      if (affectedCount === 0) {
        throw new InternalServerError('Failed to update checking account');
      }

      return updatedCheckingAccounts[0];
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to update checking account');
    }
  }

  async deleteCheckingAccount(id: number) {
    try {
      const checkingAccount = await checkingAccountRepository.findById(id);
      if (!checkingAccount) {
        throw new NotFoundError('Checking account not found');
      }


      const deletedCount = await checkingAccountRepository.delete(id);
      if (deletedCount === 0) {
        throw new InternalServerError('Failed to delete checking account');
      }

      return { message: 'Checking account deleted successfully' };
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to delete checking account');
    }
  }
}