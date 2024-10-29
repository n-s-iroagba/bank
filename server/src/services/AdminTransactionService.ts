import { CheckingAccount } from "../models/CheckingAccount";
import { TermDepositAccount } from "../models/TermDepositAccount";
import { Transfer } from "../models/Transfer";

export const updateVisibleCredit = async (
    clientId: string,
    { amount, beneficiaryId, description }: { amount: number; beneficiaryId: number; description: string }
  ) => {
    // Fetch the account to ensure it exists and to get the current balance
    const account = await CheckingAccount.findOne({ where: { id: clientId } });
  
    if (!account) {
      throw new Error(`Account with ID ${clientId} not found.`);
    }
  
    // Update the account balance by adding the amount
    const newBalance = account.balance + amount;
    await CheckingAccount.update({ balance: newBalance }, { where: { id: clientId } });
  
    // Create a transfer record
    await Transfer.create({
      amount: amount,
      transferDate: new Date(),
      accountId: account.id, // Use the clientId as accountId for the transfer
      description: description,
      beneficiaryId: beneficiaryId,
    });
  };
  

export const updateInvisibleCredit = async (clientId: string, amount: number) => {

  await CheckingAccount.update({ balance: amount }, { where: { id: clientId } });
};

export const updateVisibleDebit = async (clientId: string, amount: number) => {

  await CheckingAccount.update({ balance: amount }, { where: { id: clientId } });
};

export const updateInvisibleDebit = async (clientId: string, amount: number) => {
 
  await CheckingAccount.update({ balance: amount }, { where: { id: clientId } });
}

export const updateTermDeposit = async (clientId: string, amount: any) => {
 
   TermDepositAccount.update({ amountDeposited: amount }, { where: { id: clientId } });
};
