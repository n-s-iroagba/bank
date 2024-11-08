import { SecondParty } from "../models/SecondParty";
import { Transaction } from "../models/Transaction";
import { CreateTransactionSystem, TransactionOrigin, TransactionType } from "../types/Transaction";

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

            await Transaction.create({
                accountId: checkingAccountId,
                date: randomDate,
                description: `Transfer #${i + 1}`,
                secondPartyId: secondParty.id,
                origin: TransactionOrigin.SYSTEM,
                amount: randomAmount,
                transactionType: TransactionType.CREDIT,
            });
        }
        
        return true;
    }
}
