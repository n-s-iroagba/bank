
import { Transfer } from '../models/Transfer';
import { CheckingAccount } from '../models/CheckingAccount';
import { TermDepositAccount } from '../models/TermDepositAccount';

interface CreateAccountDto {
  checkingbalance: number;
  termDeposit:number;
  numberOfTransfers: number;
  termDepositStartDate: string;
  termDepositEndDate: string;
  transferStartDate: string;
  transferEndDate: string;
  totalTransferAmount: number;
  percentageIncrease:number;
  clientId:string;
}
export class AccountService {
  // Credit account without creating a Transfer object
  static async creditAccountWithoutTransfer(clientId: number, amount: number): Promise<void> {
    const account = await CheckingAccount.findOne({where:{
      clientId:clientId
    }});

    if (!account) {
      throw new Error('Account not found');
    }

    account.balance += amount;
    await account.save();
  }

  // Debit account without creating a Transfer object
  static async debitAccountWithoutTransfer(clientId: number, amount: number): Promise<void> {
    const account = await CheckingAccount.findOne({where:{
      clientId:clientId
    }});

    if (!account) {
      throw new Error('Account not found');
    }

    if (account.balance < amount) {
      throw new Error('Insufficient balance');
    }

    account.balance -= amount;
    await account.save();
  }

  // Credit account and create a Transfer object
  static async creditAccountWithTransfer(clientId: number, amount: number): Promise<void> {
    const account = await CheckingAccount.findOne({where:{
      clientId:clientId
    }});

    if (!account) {
      throw new Error('Account not found');
    }

    account.balance += amount;
    await account.save();

    await Transfer.create({
      accountId: account.id,
      amount,
      transferDate: new Date(),
    });
  }

  // Debit account and create a Transfer object
  static async debitAccountWithTransfer(clientId: number, amount: number): Promise<void> {
    const account = await CheckingAccount.findOne({where:{
      clientId:clientId
    }});

    if (!account) {
      throw new Error('Account not found');
    }

    if (account.balance < amount) {
      throw new Error('Insufficient balance');
    }

    account.balance -= amount;
    await account.save();

    await Transfer.create({
      accountId: account.id,
      amount: -amount,
      transferDate: new Date(),
    });
  }


  static async createAccountAndTransfers(dto: CreateAccountDto): Promise<void> {
    const {
      checkingbalance,
      numberOfTransfers,
      transferStartDate,
      transferEndDate,
      termDepositStartDate,
      percentageIncrease,
      termDepositEndDate,
      totalTransferAmount,
      termDeposit,
      clientId
    } = dto;
  
    // Create the checking account
    const checkingAccount = await CheckingAccount.create({
      balance: checkingbalance,
      clientId :Number(clientId)
    });
  
    // Create the term deposit account
    await TermDepositAccount.create({
      amountDeposited: termDeposit,
      percentageIncrease,
      startDate: termDepositStartDate,
      endDate: termDepositEndDate,
      clientId:Number(clientId)
    });
  
    // Create random transfers for the checking account
    await AccountService.createRandomTransfersForChecking(
      checkingAccount.id, // Correct instance usage
      numberOfTransfers,
      transferStartDate,
      transferEndDate,
      totalTransferAmount
    );
  }
  

  // Create random transfers for a checking accountte
  static async createRandomTransfersForChecking(
    accountId: number,
    numberOfTransfers: number,
    startDate: string,
    endDate: string,
    totalTransferAmount: number
  ) {
    const transfers = [];
    const transferAmountPerTransaction = totalTransferAmount / numberOfTransfers;

    for (let i = 0; i < numberOfTransfers; i++) {
      const transferDate = AccountService.randomDateInRange(new Date(startDate), new Date(endDate));

      transfers.push({
        accountId,
        amount: transferAmountPerTransaction,
        transferDate
      });
    }

    // Bulk insert the transfers into the database
    await Transfer.bulkCreate(transfers);
  }
  static randomDateInRange(startDate: Date, endDate: Date): Date {
    const start = startDate.getTime();
    const end = endDate.getTime();
    
    // Generate a random time between the start and end dates
    const randomTime = start + Math.random() * (end - start);
    
    // Return a new Date object with the generated time
    return new Date(randomTime);
  }


  static async deleteAndCreateNewTransfers(
    clientId: number,
    numberOfTransfers: number,
    startDate: string,
    endDate: string,
    totalTransferAmount: number
  ): Promise<void> {
    const checkingAccount = await CheckingAccount.findOne({
      where: { clientId: clientId },
    });
  
    if (!checkingAccount) {
      throw new Error('Checking account not found for the specified client.');
    }
  
  
    await Transfer.destroy({
      where: {
        accountId: checkingAccount.id, 
      },
    });
  
  await AccountService.createRandomTransfersForChecking(
    checkingAccount.id,
    numberOfTransfers,
    startDate,
    endDate,
    totalTransferAmount
  );
}

  
}

