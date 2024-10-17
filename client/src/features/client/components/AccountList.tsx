import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../styles/AccountList.css';



interface AccountsListProps {

  setAccountType:any
  setDrawerVisible:any
}

const AccountsList: React.FC<AccountsListProps> = ({setAccountType, setDrawerVisible}) => {
  const [selectedAccount, setSelectedAccount] = useState<string>('');

  const handleAccountClick = (accountType: string, accountId:number) => {
  

    setAccountType(accountType)
    setDrawerVisible(true)
    setSelectedAccount(accountType)

  
  };


  const details = {
    termDepositAccount: {
      id:1,
      accountNumber: '1234567890',
      availableAmount: '$10,000.00',
      currentAmount: '$10,500.00',
    },
    checkingAccount: {
      id:1,
      accountNumber: '0987654321',
      availableAmount: '$5,000.00',
      currentAmount: '$5,200.00',
    },
  };
  return (
    <div className="accounts-list">
      <Row
     
          className={`account-item pt-2 ${selectedAccount ==='Term Deposit Account'  ? 'selected' : ''}`}
          onClick={() => handleAccountClick('Term Deposit Account' ,details.termDepositAccount.id)}
        >
          <Col xs={6} className="account-info  d-flex flex-column justify-content-center mx-0">
            <div className="account-name">Term Deposit Account</div>
            <div className="account-number">{details.termDepositAccount.accountNumber}</div>
          </Col>
          <Col xs={6} className="balance-info">
            <div className="balance-section">
              <span className="balance-label">Available</span>
              <div className="balance-amount">{details.termDepositAccount.availableAmount}</div>
            </div>
            <div className="balance-section">
              <span className="balance-label">Current</span>
              <div className="balance-amount">{details.termDepositAccount.currentAmount}</div>
            </div>
          </Col>
        </Row>
   
        <Row
          
          className={`account-item pt-2 ${selectedAccount ==='Checking Account' ? 'selected' : ''}`}
          onClick={() => handleAccountClick('Checking Account' ,details.checkingAccount.id)}  
        >
          <Col xs={6} className="account-info  d-flex flex-column justify-content-center mx-0">
            <div className="account-name">Checking Account</div>
            <div className="account-number">{details.checkingAccount.accountNumber}</div>
          </Col>
          <Col xs={6} className="balance-info">
            <div className="balance-section">
              <span className="balance-label">Available</span>
              <div className="balance-amount">{details.checkingAccount.availableAmount}</div>
            </div>
            <div className="balance-section">
              <span className="balance-label">Current</span>
              <div className="balance-amount">{details.checkingAccount.currentAmount}</div>
            </div>
          </Col>
        </Row>

    </div>
  );
};

export default AccountsList;
