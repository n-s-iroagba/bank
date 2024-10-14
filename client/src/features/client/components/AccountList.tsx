import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../styles/AccountList.css';

interface Account {
  id: number;
  name: string;
  number: string;
  availableAmount: string;
  currentAmount: string;
}

interface AccountsListProps {
  accounts: Account[];
  blocked:any
  setSelectedOption:any
}

const AccountsList: React.FC<AccountsListProps> = ({ accounts,blocked, setSelectedOption}) => {
  const [selectedAccount, setSelectedAccount] = useState<number | null>(0);

  const handleAccountClick = (index: number, accountId:number) => {
    setSelectedAccount(index === selectedAccount ? null : index); 
    blocked.current=false;
    setSelectedOption('Accounts')

  
  };

  const handleBlockClick = () =>{
    setSelectedAccount(-1); 
    blocked.current=true;
    setSelectedOption('Accounts')
  }

  return (
    <div className="accounts-list">
      <Row
     
          className={`account-item pt-2 ${selectedAccount === -1 ? 'selected' : ''}`}
          onClick={() =>handleBlockClick() }
        >
          <Col xs={6} className="account-info  dflex flex-column justify-content-center mx-0">
            <div className="account-name">{'Term Deposit'}</div>
            <div className="account-number">{'00'}</div>
          </Col>
          <Col xs={6} className="balance-info">
            <div className="balance-section">
              <span className="balance-label">Available</span>
              <div className="balance-amount">{'00'}</div>
            </div>
            <div className="balance-section">
              <span className="balance-label">Current</span>
              <div className="balance-amount">{'00'}</div>
            </div>
          </Col>
        </Row>
      {accounts.map((account, index) => (
        <Row
          key={index}
          className={`account-item pt-2 ${selectedAccount === index ? 'selected' : ''}`}
          onClick={() => handleAccountClick(index, account.id)}  // Pass the account number
        >
          <Col xs={6} className="account-info  d-flex flex-column justify-content-center mx-0">
            <div className="account-name">{account.name}</div>
            <div className="account-number">{account.number}</div>
          </Col>
          <Col xs={6} className="balance-info">
            <div className="balance-section">
              <span className="balance-label">Available</span>
              <div className="balance-amount">{account.availableAmount}</div>
            </div>
            <div className="balance-section">
              <span className="balance-label">Current</span>
              <div className="balance-amount">{account.currentAmount}</div>
            </div>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default AccountsList;
