import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../styles/AccountList.css';

interface Account {
  name: string;
  number: string;
  availableAmount: string;
  currentAmount: string;
}

interface AccountsListProps {
  accounts: Account[];
}

const AccountsList: React.FC<AccountsListProps> = ({ accounts }) => {
  const [selectedAccount, setSelectedAccount] = useState<number | null>(0);

  const handleAccountClick = (index: number) => {
    setSelectedAccount(index === selectedAccount ? null : index); // Toggle selection
  };

  return (
    <div className="accounts-list">
      {accounts.map((account, index) => (
        <Row
          key={index}
          className={`account-item pt-2 ${selectedAccount === index ? 'selected' : ''}`}
          onClick={() => handleAccountClick(index)}
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


  