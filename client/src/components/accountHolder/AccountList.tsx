import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../../styles/AccountList.css';

import '../../styles/Listing.css'
import { CheckingAccount, FixedTermDeposit } from '../../types';




type  AccountsListProps = {
  setAccountType: (accountType: string) => void; 
  setDrawerVisible: (isVisible: boolean) => void; 
}
type DetailsType = {
  accountName: string,
  termDepositAccount:FixedTermDeposit
  checkingAccount:CheckingAccount

}



const AccountsList: React.FC<AccountsListProps> = ({ setAccountType, setDrawerVisible }) => {
    const [selectedAccount, setSelectedAccount] = useState<string>('');
    const [details, setDetails] = useState<any>(null); // Initialize as null

    // Simulate loading data for demonstration purposes
    React.useEffect(() => {
        const fetchDetails = async () => {
            // Simulate an API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            setDetails({
                accountName:'John Smith',
                termDepositAccount: {
                    id: 1,
                    amountDeposited: 10000,
                    startDate: new Date('2024-01-01'),
                    durationInDays: 365,
                    interestRate: 5,
                    accountHolderId: 1,
                    accountNumber: 1234567890,
                    accountHolder: undefined
                },
                checkingAccount: {
                    id: 1,
                    balance: 5000,
                    accountNumber: 9876543210,
                    transactions: [
                    ],
                },
            });
        };

        fetchDetails();
    }, []);

    const handleAccountClick = (accountType: string) => {
        setAccountType(accountType);
        setDrawerVisible(true);
        setSelectedAccount(accountType);
    };

    if (details === null) {
        return <div className="loading-message">Loading...</div>; // Display loading message
    }

    return (
        <div className="accounts-list">
        <div className="responsive-container">
            <Row
                className={`account-item pt-2 ${selectedAccount === 'Term Deposit Account' ? 'selected' : ''}`}
                onClick={() => handleAccountClick('Term Deposit Account')}
            >
                <Col xs={6} className="account-info d-flex flex-column justify-content-center mx-0">
                    <div className="account-name">Term Deposit</div>
                    <div className="account-number">{details.accountName}</div>
                    <div className="account-name">Term Deposit Account Number</div>
                    <div className="account-number">{details.termDepositAccount.accountNumber}</div>
                </Col>
                <Col xs={6} className="balance-info">
                    <div className="balance-section">
                        <span className="balance-label">Interest Rate</span>
                        <div className="balance-amount">{(details.termDepositAccount.interestRate)}%</div>
                    </div>
                    <div className="balance-section">
                        <span className="balance-label">Amount Deposited</span>
                        <div className="balance-amount">${details.termDepositAccount.amountDeposited}</div>
                    </div>
                </Col>
            </Row>
    
            <Row
                className={`account-item pt-2 ${selectedAccount === 'Checking Account' ? 'selected' : ''}`}
                onClick={() => handleAccountClick('Checking Account')}
            >
                <Col xs={6} className="account-info d-flex flex-column justify-content-center mx-0">
                    <div className="account-name">Checking Account</div>
                    <div className="account-number">{details.accountName}</div>
                    <div className="account-name">Checking Account Number</div>
                    <div className="account-number">{details.checkingAccount.accountNumber}</div>
                </Col>
                <Col xs={6} className="balance-info">
                    <div className="balance-section">
                        <span className="balance-label">Available Balance</span>
                        <div className="balance-amount">${details.checkingAccount.balance}</div>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
    
    );
};

export default AccountsList;