import { TransactionOrigin, TransactionType } from "../types/Transaction";

const useGetTransactions = (id:number) =>{
    return  [
        {
          date: new Date('2024-10-10'),
          description: 'Payment for Invoice #1234',
          amount: 500,
          transactionType: TransactionType.CREDIT,
          id: 0,
          secondParty: {
            firstName: 'Kennedy',
            surname: 'Ogbongedonoo',
            accountNumber: '22222',
            bank: { id: 0, name: 'aa', logo: '' },
            id: 0,
            canReceive: false,
            canSend: false
          },
          origin: TransactionOrigin.ADMIN
        },
        {
          date: new Date('2024-10-11'),
          description: 'Refund for Order #5678',
          amount: 100,
          transactionType: TransactionType.DEBIT,
          id: 1,
          secondParty: {
            firstName: 'Kennedy',
            surname: 'Ogbongedonoo',
            accountNumber: '222222',
            bank: { id: 0, name: 'aa', logo: '' },
            id: 0,
            canReceive: false,
            canSend: false
          },
          origin: TransactionOrigin.ADMIN
        },
        {
          date: new Date('2024-10-12'),
          description: 'Payment for Invoice #9101',
          amount: 250,
          transactionType: TransactionType.CREDIT,
          id: 2,
          secondParty: {
            firstName: 'Kennedy',
            surname: 'Ogbongedonoo',
            accountNumber: '222222',
            bank: { id: 0, name: 'aa', logo: '' },
            id: 0,
            canReceive: false,
            canSend: false
          },
          origin: TransactionOrigin.ADMIN
        },
      ];
}
export default useGetTransactions