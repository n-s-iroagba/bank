import { useCheckingAccounts } from '../../hooks/useCheckingAccount';
import { useTransactions } from '../../hooks/useTransaction';
import { CheckingAccount } from '../../types';
import TransferButton from '../ui/TransferButton';

interface Transaction {
  id: number;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  checkingAccountId: number;
  secondPartyId: number;
  balanceAfter: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AccTransactionList= ({accountHolderId,accountId,name}:{accountHolderId:number,accountId:string|number,name:string}) => {
const checkingAccountResponse = useCheckingAccounts({accountHolderId})
const transactionsResponse = useTransactions(accountId,{})
const accounts:CheckingAccount[] = checkingAccountResponse.data.data||[]
const transactions:Transaction[] = transactionsResponse.data?.data||[]
  const formatCurrency = (amount: number) => {
    return `$${amount}`;
  };

const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};


  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial, sans-serif', background: '#f5f5f5' }}>
      <style>{`
        * {
          box-sizing: border-box;
        }
        .texas-header {
          background: var(--blue);
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .texas-flag {
          width: 40px;
          height: 27px;
          background: white;
          position: relative;
          display: inline-block;
        }
        .texas-flag::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 33%;
          height: 100%;
          background: #002868;
        }
        .texas-flag::after {
          content: '★';
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          color: white;
          font-size: 16px;
        }
        .accounts-title {
          color: white;
          font-size: 28px;
          font-weight: bold;
          margin: 0;
        }
        .section-header {
          background: var(--blue);
          color: white;
          padding: 10px 15px;
          font-weight: bold;
          font-size: 14px;
        }
        .account-item {
          padding: 12px 15px;
          border-bottom: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: white;
          cursor: pointer;
          transition: background 0.2s;
        }
        .account-item:hover {
          background: #f8f9fa;
        }
        .account-name {
          font-weight: bold;
          margin: 0 0 2px 0;
          font-size: 14px;
          color: #333;
        }
        .account-number {
          color: #666;
          font-size: 12px;
        }
        .account-balance {
          font-size: 18px;
          font-weight: bold;
          color: #333;
        }
        .transaction-item {
          padding: 12px 15px;
          border-bottom: 1px solid #e0e0e0;
          background: white;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .transaction-left {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .transaction-description {
          font-size: 13px;
          font-weight: bold;
          margin: 0 0 4px 0;
          color: #333;
          white-space: pre-line;
          line-height: 1.4;
        }
        .transaction-date {
          font-size: 12px;
          color: #666;
          margin: 0;
        }
        .transaction-amount {
          font-size: 18px;
          font-weight: bold;
          text-align: right;
          margin: 0;
          white-space: nowrap;
          padding-left: 15px;
        }
        .debit-amount {
          color: #dc3545;
        }
        .credit-amount {
          color: #28a745;
        }
        .card-container {
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border: none;
          margin-bottom: 20px;
          background: white;
        }
      `}</style>

      {/* Header */}
      <div className="texas-header">
        <div className="texas-flag"></div>
        <h1 className="accounts-title">Accounts</h1>
      </div>

      {/* Balances Section */}
      <div className="card-container">
        <div className="section-header">Balances</div>
        <div>
          {accounts.map((account) => (
            <div key={account.id} className="account-item">
              <div>
                <div className="account-name">{name}</div>
                <div className="account-number">{account.accountNumber}</div>
              </div>
              <div className="account-balance">
                {formatCurrency(account.balance)} ›
              </div>
            </div>
          ))}
        </div>
      </div>
      <TransferButton accountId={accountId}/>

      {/* Transactions Section */}
      <div className="card-container">
        <div className="section-header">Transactions</div>
        <div>
          {transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-left">
                <div className="transaction-description">
                  {transaction.description || 'Transaction'}
                </div>
                <div className="transaction-date">
                  {formatDate(transaction.createdAt)}
                </div>
              </div>
              <div className={`transaction-amount ${transaction.type === 'debit' ? 'debit-amount' : 'credit-amount'}`}>
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccTransactionList;