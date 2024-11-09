import { Request, Response } from 'express';
import { Admin } from "../models/Admin";
import { AccountHolder } from '../models/AccountHolder';
import { CheckingAccount } from '../models/CheckingAccount';
import { TermDepositAccount } from '../models/TermDepositAccount';
import { Transaction, TransactionType } from '../models/Transaction';
import Bank from '../models/Bank';
import { SecondParty } from '../models/SecondParty';
import { SuperAdmin } from '../models/SuperAdmin';

export const indexController = async (req: Request, res: Response) => {
    developmentIndexHandlerNoAuth()
    .then(() => {
        console.log('Data inserted successfully');
    })
    .catch(error => {
        console.error('Error inserting data:', error);
    }).finally(
      ()=>  res.send('Data inserted successfully' )
    );
};

export const developmentIndexHandlerNoAuth = async () => {
    async function createAccountHolder(adminId: number, holderData: Partial<AccountHolder>, checkingData: Partial<CheckingAccount>, termDepositData: Partial<TermDepositAccount>) {
        const accountHolder = await AccountHolder.create({
            adminId,
            ...holderData,
        });
    
        const checkingAccount = await CheckingAccount.create({
            accountHolderId: accountHolder.id,
            ...checkingData,
        });
    
        const termDepositAccount = await TermDepositAccount.create({
            accountHolderId: accountHolder.id,
            amountDeposited: termDepositData.amountDeposited as number,
            startDate: termDepositData.startDate as Date,
            durationInDays: termDepositData.durationInDays as number,
            interestRate: termDepositData.interestRate as number,
            accountNumber: termDepositData.accountNumber as number,
        });;
    
    
    
        // Create an initial transaction for each account if needed
        await Transaction.create({
            date: new Date(),
            description: 'Initial deposit',
            amount: checkingData.balance || 0,
            transactionType: TransactionType.CREDIT,
            accountId: checkingAccount.id,
            secondPartyId: secondParty.id,
            origin: 'Admin'
        });
    }
    const bank = await Bank.create(
        { name: 'BankName',logo:'' }
    )
    const secondParty = await SecondParty.create({
        firstname: 'Example',
        surname: 'Bank',
        accountNumber: '11111111',
        bankId: bank.id,
        canReceive: true,
        canSend: true,
    })

    const superAdmin = await SuperAdmin.create({
        firstname: 'John',
        surname: 'Snow',
        username: 'johnsnow',         // Ensure this matches the username field
        email: 'john@example.com',
        password: 'securepassword',    // Make sure to hash passwords in production
    });

    const firstAdmin = await Admin.create({
        superAdminId:superAdmin.id,
        username: 'johnsnow',        
        password: 'securepassword', 
    }
    )
    superAdmin.adminIdentification=firstAdmin.id
    await superAdmin.save()

    const secondAdmin = await Admin.create({
        superAdminId:superAdmin.id,
        username: 'jane.smith',        
        password: 'securepassword',
    })
    if (firstAdmin) {
        await createAccountHolder(firstAdmin.id, 
            {
                firstname: 'John',
                surname: 'Doe',
                username: 'john.doe',
                password: 'password123',
            },
            {
                balance: 1000.0,
                accountNumber: 12345678,
            },
            {
                amountDeposited: 5000.0,
                startDate: new Date(),
                durationInDays: 365,
                interestRate: 5,
                accountNumber: 87654321,
              
            },

        );
    }

    if (secondAdmin) {
        await createAccountHolder(secondAdmin.id, 
            {
                firstname: 'Jane',
                surname: 'Smith',
                username: 'jane.smith',
                password: 'password123',
            },
            {
                balance: 2000.0,
                accountNumber: 23456789,
            },
            {
                amountDeposited: 10000.0,
                startDate: new Date(),
                durationInDays: 730,
                interestRate: 6,
                accountNumber: 98765432,
               
            },
        );
    }
};



