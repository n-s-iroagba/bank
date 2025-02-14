import { AccountHolder } from '../models/AccountHolder';
import { CheckingAccount } from '../models/CheckingAccount';
import { SecondParty } from '../models/SecondParty';
import { TermDepositAccount } from '../models/TermDepositAccount';
import { Transaction } from '../models/Transaction';
import { CreateAccountHolder, UpdateAccountHolder } from '../types/AccountHolderTypes';
import { TransactionOrigin, TransactionType } from '../types/TransactionType';



export class AccountHolderService {


    static async createAccountHolder(id:number,data:CreateAccountHolder) {
        const accountHolder = await AccountHolder.create({
          firstName: data.firstName,
          surname: data.surname,
          middlename: data.middlename,
          username: data.username,
          password: data.password,
          adminId: id
        })
        const checkingAccountNumber= Math.floor(Math.random() *100000000000).toString()
        const checkingAccount = await CheckingAccount.create({
          ...data.checkingAccount,
          accountHolderId: accountHolder.id,
          accountNumber: checkingAccountNumber,
          
        })
        const termDepositAccountNumber = Math.floor(Math.random() *100000000000).toString()
        await TermDepositAccount.create({
          ...data.termDepositAccount,
          accountHolderId: accountHolder.id,
          accountNumber: termDepositAccountNumber,
  
        })
    
       const numberOfTransactions = data.transaction.numberOfTransfers
      const highestTransfer = data.transaction.highestTransfer
      const lowestTransfer = data.transaction.lowestTransfer
 
      const startTime = new Date(data.transaction.transferStartDate).getTime();
      const endTime = new Date(data.transaction.transferEndDate).getTime();
  
      const secondParties = await SecondParty.findAll()
      if(!secondParties.length){
          throw new Error('No second parties found')
      }
      
        for (let i = 0; i < numberOfTransactions; i++) {
          const randomAmount = Math.random() * (highestTransfer - lowestTransfer) + lowestTransfer;
   
          const randomIndex = Math.floor(Math.random() *(secondParties.length -1))
          const secondParty = secondParties[randomIndex]
  
          const randomTime = startTime + Math.random() * (endTime - startTime);
            const randomDate = new Date(randomTime);
           Transaction.create({
              accountId: checkingAccount.id,
              date: randomDate,
              description: `Transfer #${i+1}`,
              secondPartyId: secondParty.id,
              origin: TransactionOrigin.SYSTEM,
              amount: randomAmount,
              transactionType: TransactionType.CREDIT,
           })
        }
        return accountHolder;
      }

  // Get all AccountHolders
  static async getAll() {
    return await AccountHolder.findAll();
  }

  // Get AccountHolders by adminId
  static async getByAdminId(adminId: number) {
    return await AccountHolder.findAll({ where: { adminId } });
  }

  // Update AccountHolder
  static async update(id:number,accountHolderData: UpdateAccountHolder) {
    const {  firstName, surname, middlename, username, password } = accountHolderData;

    const accountHolder = await AccountHolder.findByPk(id);
    if (!accountHolder) {
      throw new Error('AccountHolder not found');
    }

    accountHolder.firstName = firstName;
    accountHolder.surname = surname;
    accountHolder.middlename = middlename;
    accountHolder.username = username;
    accountHolder.password = password;

    await accountHolder.save();
    return accountHolder;
  }

  // Delete AccountHolder by id
  static async delete(id: number) {
    const accountHolder = await AccountHolder.findByPk(id);
    if (!accountHolder) {
      throw new Error('AccountHolder not found');
    }

    await accountHolder.destroy();
  }

  static async loginAccountHolder(username: string, password: string) {
    const accountHolder = await AccountHolder.findOne({ where: { username } });

    if (!accountHolder) {
      return null; // Username does not exist
    }

    // Assuming passwords are stored as plain text; if hashed, compare with bcrypt or similar library
    if (accountHolder.password === password) {
      return accountHolder;
    }

    return null; // Incorrect password
  }
}

