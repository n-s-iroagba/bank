import { AccountHolderCreationAttributes } from "../models/accountHolder";
import { userRepository, accountHolderRepository } from "../repositories";
import { NotFoundError, ConflictError, AppError, InternalServerError } from "../utils/errors";


export class AccountHolderService {
  async createAccountHolder(data: AccountHolderCreationAttributes) {
    try {

      return await accountHolderRepository.create(data);
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      
      throw new InternalServerError('Failed to create account holder');
    
    }
  }

  async getAccountHolderById(id: number) {
    try {
      const accountHolder = await accountHolderRepository.findByIdWithDetails(id);
      if (!accountHolder) {
        throw new NotFoundError('Account holder not found');
      }
      return accountHolder;
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      
      throw new InternalServerError('Failed to fetch account holder');
    
    }
  }

  async getAllAccountHolders(page: number = 1, limit: number = 10) {
    try {
      const offset = (page - 1) * limit;
      const accountHolders = await accountHolderRepository.findAllWithUserDetails({
        limit,
        offset,
        order: [['firstName', 'ASC'], ['lastName', 'ASC']],
      });

      const totalCount = await accountHolderRepository.findAndCountAll({});

      return {
        accountHolders,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount.count / limit),
          totalItems: totalCount.count,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      console.error(error)
      throw new InternalServerError('Failed to fetch account holders');
    
      }
  }

  async updateAccountHolder(id: number, data: Partial<AccountHolderCreationAttributes>) {
    try {
      const accountHolder = await accountHolderRepository.findById(id);
      if (!accountHolder) {
        throw new NotFoundError('Account holder not found');
      }

      // Check if SSN is being updated and if it's already in use
      if (data.ssn && data.ssn !== accountHolder.ssn) {
        const existingSSN = await accountHolderRepository.findBySsn(data.ssn);
        if (existingSSN) {
          throw new ConflictError('SSN is already in use');
        }
      }

      const [affectedCount, updatedAccountHolders] = await accountHolderRepository.update(id, data);
      if (affectedCount === 0) {
        throw new InternalServerError('Failed to update account holder');
      }

      return updatedAccountHolders[0];
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      
      throw new InternalServerError('Failed to update account holder');
    
    }
  }

  async deleteAccountHolder(id: number) {
    try {
      const accountHolder = await accountHolderRepository.findById(id);
      if (!accountHolder) {
        throw new NotFoundError('Account holder not found');
      }

      const deletedCount = await accountHolderRepository.delete(id);
      if (deletedCount === 0) {
        throw new InternalServerError('Failed to delete account holder');
      }

      return { message: 'Account holder deleted successfully' };
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) throw error;
      
      throw new InternalServerError('Failed to delete account holder');
    
    }
  }
}