import { CheckingAccount } from "../models/CheckingAccount";
import { Transaction } from "../models/Transaction";
import { EditCheckingAccount } from "../types/CheckingAccountTypes";
import { CreateTransaction, TransactionOrigin, TransactionType } from "../types/TransactionType";
export class AccountService {

  
static async editCheckingBalanceWithNoTransaction(id:number,amount:number){
    const checkingAccount = await CheckingAccount.findByPk(id);
    if(!checkingAccount){
        throw new Error('CheckingAccount not found')
    }
    checkingAccount.balance += amount;
    checkingAccount.save()
}


static async editCheckingBalanceWithTransaction(id:number,data:CreateTransaction){
    const checkingAccount = await CheckingAccount.findByPk(id);
    if(!checkingAccount){
        throw new Error('CheckingAccount not found')
    }
    data.transactionType ===TransactionType.CREDIT? checkingAccount.balance += data.amount :checkingAccount.balance -= data.amount
    await Transaction.create({
        accountId: checkingAccount.id,
        date: data.date,
        description: data.description,
        secondPartyId: data.secondPartyId,
        origin: TransactionOrigin.ADMIN,
        amount: data.amount,
        transactionType: data.transactionType,
    })
    await checkingAccount.save()
}



  
static async updateCheckingAccount(id: number, data: EditCheckingAccount) {
    const checkingAccount = await CheckingAccount.findByPk(id);
    if (!checkingAccount) return null;

    checkingAccount.balance = data.balance;
    checkingAccount.accountNumber = data.accountNumber;
    await checkingAccount.save();

    return checkingAccount;
  }
  }
  