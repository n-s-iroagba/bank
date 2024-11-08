import { AccountHolder } from "../models/AccountHolder";
import { CheckingAccount } from "../models/CheckingAccount";
import { SecondParty } from "../models/SecondParty";
import { TermDepositAccount } from "../models/TermDepositAccount";
import { Transaction } from "../models/Transaction";
import { CreateAccountHolder } from "../types/AccountHolder";
import { EditCheckingAccount } from "../types/CheckingAccount";
import { CreateTransaction, TransactionOrigin, TransactionType } from "../types/Transaction";

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
        secondPartyId: data.secondParty.id,
        origin: "Admin",
        amount: data.amount,
        transactionType: data.transactionType,
    })
    await checkingAccount.save()
}

static async debitAccount(id:number,data:CreateTransaction){
    const checkingAccount = await CheckingAccount.findByPk(id);
    if(!checkingAccount){
        throw new Error('CheckingAccount not found')
    }
    checkingAccount.balance -= data.amount
    await Transaction.create({
        accountId: checkingAccount.id,
        date: data.date,
        description: data.description,
        secondPartyId: data.secondParty.id,
        origin: TransactionOrigin.CLIENT,
        amount: data.amount,
        transactionType: TransactionType.DEBIT,
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
  