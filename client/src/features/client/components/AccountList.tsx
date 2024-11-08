import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../styles/AccountList.css';
import { TermDepositAccount } from '../../../types/TermDepositAccount';
import { CheckingAccount } from '../../../types/CheckingAccount';



type  AccountsListProps = {
  setAccountType: (accountType: string) => void; 
  setDrawerVisible: (isVisible: boolean) => void; 
}
type DetailsType = {
  termDepositAccount:TermDepositAccount
  checkingAccount:CheckingAccount

}



const AccountsList: React.FC<AccountsListProps> = ({ setAccountType, setDrawerVisible }) => {
    const [selectedAccount, setSelectedAccount] = useState<string>('');
    const [details, setDetails] = useState<DetailsType | null>(null); // Initialize as null

    // Simulate loading data for demonstration purposes
    React.useEffect(() => {
        const fetchDetails = async () => {
            // Simulate an API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            setDetails({
                termDepositAccount: {
                    id: 1,
                    amountDeposited: 10000,
                    startDate: new Date ('2024-01-01'),
                    durationInDays: 365,
                    interestRate: 5,
                    accountHolderId: 1,
                    accountNumber: 1234567890,
                    interest: 500,
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
            <Row
                className={`account-item pt-2 ${selectedAccount === 'Term Deposit Account' ? 'selected' : ''}`}
                onClick={() => handleAccountClick('Term Deposit Account')}
            >
                <Col xs={6} className="account-info d-flex flex-column justify-content-center mx-0">
                    <div className="account-name">Term Deposit Account</div>
                    <div className="account-number">{details.termDepositAccount.accountNumber}</div>
                </Col>
                <Col xs={6} className="balance-info">
                    <div className="balance-section">
                        <span className="balance-label">Interest Amount</span>
                        <div className="balance-amount">{(details.termDepositAccount.interestRate / 100) * details.termDepositAccount.amountDeposited}</div>
                    </div>
                    <div className="balance-section">
                        <span className="balance-label">Current Amount</span>
                        <div className="balance-amount">{details.termDepositAccount.interest + details.termDepositAccount.amountDeposited}</div>
                    </div>
                </Col>
            </Row>

            <Row
                className={`account-item pt-2 ${selectedAccount === 'Checking Account' ? 'selected' : ''}`}
                onClick={() => handleAccountClick('Checking Account')}
            >
                <Col xs={6} className="account-info d-flex flex-column justify-content-center mx-0">
                    <div className="account-name">Checking Account</div>
                    <div className="account-number">{details.checkingAccount.accountNumber}</div>
                </Col>
                <Col xs={6} className="balance-info">
                    <div className="balance-section">
                        <span className="balance-label">Available</span>
                        <div className="balance-amount">{details.checkingAccount.balance}</div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AccountsList;
