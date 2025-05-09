import { CheckingAccount } from "../models/CheckingAccount";
import { SecondParty } from "../models/SecondParty";
import { Transaction } from "../models/Transaction";
import { CreateTransaction, CreateTransactionSystem, TransactionOrigin, TransactionType } from "../types/TransactionType";

export class TransactionService {
    static async updateTransaction(checkingAccountId: number, data: CreateTransactionSystem) {

        await Transaction.destroy({ where: { accountId: checkingAccountId } });

        const numberOfTransactions = data.numberOfTransfers;
        const highestTransfer = data.highestTransfer;
        const lowestTransfer = data.lowestTransfer;
        const startTime = data.transferStartDate.getTime();
        const endTime = data.transferEndDate.getTime();

        const secondParties = await SecondParty.findAll();
        if (!secondParties.length) {
            throw new Error('No second parties found');
        }


        for (let i = 0; i < numberOfTransactions; i++) {
            const randomAmount = Math.random() * (highestTransfer - lowestTransfer) + lowestTransfer;
            const randomIndex = Math.floor(Math.random() * secondParties.length);
            const secondParty = secondParties[randomIndex];


            const randomTime = startTime + Math.random() * (endTime - startTime);
            const randomDate = new Date(randomTime);

            const transaction = await Transaction.create({
                accountId: checkingAccountId,
                date: randomDate,
                description: `Transfer #${i + 1}`,
                secondPartyId: secondParty.id,
                origin: TransactionOrigin.SYSTEM,
                amount: randomAmount,
                transactionType: TransactionType.CREDIT,
                status: 'pending' // Added status
            });

            // Simulate transaction processing
            setTimeout(async () => {
                const statuses = ['completed', 'failed'];
                const randomStatus = Math.random() > 0.2 ? statuses[0] : statuses[1];
                transaction.status = randomStatus;
                await transaction.save();
            }, Math.random() * 5000 + 2000);
        }

        return true;
    }

    static async clientDebitAccount(id:number,data:CreateTransaction){
        const checkingAccount = await CheckingAccount.findByPk(id);
        if(!checkingAccount){
            throw new Error('CheckingAccount not found')
        }
        checkingAccount.balance -= data.amount
        const transaction = await Transaction.create({
            accountId: checkingAccount.id,
            date: data.date,
            description: data.description,
            secondPartyId: data.secondPartyId,
            origin: TransactionOrigin.CLIENT,
            amount: data.amount,
            transactionType: TransactionType.DEBIT,
            status: 'pending' // Added status
        });

        // Simulate transaction processing
        setTimeout(async () => {
            const statuses = ['completed', 'failed'];
            const randomStatus = Math.random() > 0.2 ? statuses[0] : statuses[1];
            transaction.status = randomStatus;
            await transaction.save();
        }, Math.random() * 5000 + 2000);

        await checkingAccount.save()
    }
}