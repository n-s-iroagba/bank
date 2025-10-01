import sequelize from '../config/database';
import { TransactionCreationAttributes } from '../models/transaction';
import { 
  transactionRepository, 
  checkingAccountRepository, 
  secondPartyRepository, 
  accountHolderRepository
} from '../repositories';
import { 
  NotFoundError, 
  ValidationError, 
  InternalServerError, 
  AppError
} from '../utils/errors';

export class TransactionService {
  async createTransaction(data: TransactionCreationAttributes) {
    try {
      // Check if checking account exists
      const checkingAccount = await checkingAccountRepository.findById(data.checkingAccountId);
      if (!checkingAccount) {
        throw new NotFoundError('Checking account not found');
      }

      // Check if second party exists
      const secondParty = await secondPartyRepository.findById(data.secondPartyId);
      if (!secondParty) {
        throw new NotFoundError('Second party not found');
      }

      // Calculate new balance
      const currentBalance = parseFloat(checkingAccount.balance.toString());
      const transactionAmount = parseFloat(data.amount.toString());
      
      let newBalance: number;
      if (data.type === 'credit') {
        newBalance = currentBalance + transactionAmount;
      } else {
        newBalance = currentBalance - transactionAmount;
        
        // Check for sufficient funds
        if (newBalance < 0) {
          throw new ValidationError('Insufficient funds for this transaction');
        }
      }

      // Use transaction to ensure data consistency
      const result = await sequelize.transaction(async (t) => {
        // Update account balance
        await checkingAccountRepository.updateBalance(
          data.checkingAccountId, 
          data.type === 'credit' ? transactionAmount : -transactionAmount,
          t
        );

        // Create transaction record with updated balance
        const transaction = await transactionRepository.create({
          ...data,
          balanceAfter: newBalance,
        }, t);

        return transaction;
      });

      return result;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to create transaction');
    }
  }
// Add this method to server/src/services/admin/transactionService.ts
async getTransactionsByAccountHolderId(accountHolderId: number, page: number = 1, limit: number = 10) {
  try {
    const accountHolder = await accountHolderRepository.findById(accountHolderId);
    if (!accountHolder) {
      throw new NotFoundError('Account holder not found');
    }

    const offset = (page - 1) * limit;
    const transactions = await transactionRepository.findByAccountHolderId(accountHolderId, {
      limit,
      offset,
      include: ['secondParty', 'checkingAccount'],
    });

    const totalCount = await transactionRepository.findAndCountAll({
      where: {},
      include: [{
        association: 'checkingAccount',
        where: { accountHolderId },
      }],
    });

    return {
      transactions,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount.count / limit),
        totalItems: totalCount.count,
        itemsPerPage: limit,
      },
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new InternalServerError('Failed to fetch transactions');
  }
}
  async getTransactionById(id: number) {
    try {
      const transaction = await transactionRepository.findById(id, {
        include: ['checkingAccount', 'secondParty'],
      });
      if (!transaction) {
        throw new NotFoundError('Transaction not found');
      }
      return transaction;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to fetch transaction');
    }
  }

  async getTransactionsByCheckingAccountId(checkingAccountId: number, page: number = 1, limit: number = 10) {
    try {
      const checkingAccount = await checkingAccountRepository.findById(checkingAccountId);
      if (!checkingAccount) {
        throw new NotFoundError('Checking account not found');
      }

      const offset = (page - 1) * limit;
      const transactions = await transactionRepository.findByCheckingAccountId(checkingAccountId, {
        limit,
        offset,
        include: ['secondParty'],
      });

      const totalCount = await transactionRepository.findAndCountAll({
        where: { checkingAccountId },
      });

      return {
        transactions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount.count / limit),
          totalItems: totalCount.count,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to fetch transactions');
    }
  }

  async getAllTransactions(page: number = 1, limit: number = 10) {
    try {
      const offset = (page - 1) * limit;
      const transactions = await transactionRepository.findWithDetails(undefined, {
        limit,
        offset,
      });

      const totalCount = await transactionRepository.findAndCountAll({});

      return {
        transactions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalCount.count / limit),
          totalItems: totalCount.count,
          itemsPerPage: limit,
        },
      };
    } catch (error) {
      throw new InternalServerError('Failed to fetch transactions');
    }
  }

  async updateTransaction(id: number, data: Partial<TransactionCreationAttributes>) {
    try {
      const transaction = await transactionRepository.findById(id);
      if (!transaction) {
        throw new NotFoundError('Transaction not found');
      }

      // Check if checking account exists if checkingAccountId is being updated
      if (data.checkingAccountId) {
        const checkingAccount = await checkingAccountRepository.findById(data.checkingAccountId);
        if (!checkingAccount) {
          throw new NotFoundError('Checking account not found');
        }
      }

      // Check if second party exists if secondPartyId is being updated
      if (data.secondPartyId) {
        const secondParty = await secondPartyRepository.findById(data.secondPartyId);
        if (!secondParty) {
          throw new NotFoundError('Second party not found');
        }
      }

      const [affectedCount, updatedTransactions] = await transactionRepository.update(id, data);
      if (affectedCount === 0) {
        throw new InternalServerError('Failed to update transaction');
      }

      return updatedTransactions[0];
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to update transaction');
    }
  }

  async deleteTransaction(id: number) {
    try {
      const transaction = await transactionRepository.findById(id);
      if (!transaction) {
        throw new NotFoundError('Transaction not found');
      }

      const deletedCount = await transactionRepository.delete(id);
      if (deletedCount === 0) {
        throw new InternalServerError('Failed to delete transaction');
      }

      return { message: 'Transaction deleted successfully' };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to delete transaction');
    }
  }

  async getAccountStatement(checkingAccountId: number, startDate: Date, endDate: Date) {
    try {
      const checkingAccount = await checkingAccountRepository.findById(checkingAccountId);
      if (!checkingAccount) {
        throw new NotFoundError('Checking account not found');
      }

      return await transactionRepository.getAccountStatement(checkingAccountId, startDate, endDate);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new InternalServerError('Failed to fetch account statement');
    }
  }
}