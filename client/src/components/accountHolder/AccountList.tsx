import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../../styles/AccountList.css';

import '../../styles/Listing.css'
import { CheckingAccount, FixedTermDeposit } from '../../types';
import { useFixedDeposits } from '../../hooks/useFixedDeposit';
import { useCheckingAccounts } from '../../hooks/useCheckingAccount';




type  AccountsListProps = {
  setAccountType: (accountType: string) => void; 
  setDrawerVisible: (isVisible: boolean) => void; 
    accountHolderId: number,
    accountName:string
}



const AccountsList: React.FC<AccountsListProps> = ({ setAccountType, setDrawerVisible,accountHolderId,accountName }) => {
    const [selectedAccount, setSelectedAccount] = useState<string>('');

    const termDepositResponse = useFixedDeposits({accountHolderId})
    const checkingAccountResponse = useCheckingAccounts({accountHolderId})
    const termDeposits:FixedTermDeposit[] = termDepositResponse.data?.data||[]
    const checkingAccounts:CheckingAccount[] = checkingAccountResponse.data?.data||[]

    const handleAccountClick = (accountType: string) => {
        setAccountType(accountType);
        setDrawerVisible(true);
        setSelectedAccount(accountType);
    };

    if (checkingAccountResponse.isLoading || termDepositResponse.isLoading) {
        return <div className="loading-message">Loading...</div>; // Display loading message
    }

    return (
        <div className="accounts-list">
        <div className="responsive-container">
                    {checkingAccounts.map((checkingAccount)=> ( <Row
                className={`account-item pt-2 ${selectedAccount === 'Checking Account' ? 'selected' : ''}`}
                onClick={() => handleAccountClick('Checking Account')}
            >
                <Col xs={6} className="account-info d-flex flex-column justify-content-center mx-0">
                    <div className="account-number">Checking Account</div>
                    <div className="account-number">{accountName}</div>
                    <div className="account-number">Checking Account Number</div>
                    <div className="account-number">{checkingAccount.accountNumber}</div>
                </Col>
                <Col xs={6} className="balance-info">
                    <div className="balance-section">
                        <span className="balance-label">Available Balance</span>
                        <div className="balance-amount">${checkingAccount.balance}</div>
                    </div>
                </Col>
            </Row>
            ))}
           {termDeposits.map((termDepositAccount)=> (<Row
                className={`account-item pt-2 ${selectedAccount === 'Term Deposit Account' ? 'selected' : ''}`}
                onClick={() => handleAccountClick('Term Deposit Account')}
            >
                <Col xs={6} className="account-info d-flex flex-column justify-content-center mx-0">
                    <div className="account-number">Term Deposit</div>
                    <div className="account-number">{accountName}</div>
                    <div className="account-number">Term Deposit Account Number</div>
                    <div className="account-number">{termDepositAccount.accountNumber}</div>
                </Col>
                <Col xs={6} className="balance-info">
                    <div className="balance-section">
                        <span className="balance-label">Interest Rate</span>
                        <div className="balance-amount">{(termDepositAccount.interestRate)}%</div>
                    </div>
                    <div className="balance-section">
                        <span className="balance-label">Amount Deposited</span>
                        <div className="balance-amount">${termDepositAccount.balance}</div>
                    </div>
                </Col>
            </Row>
))}
      
        </div>
    </div>
    
    );
};

export default AccountsList;