import { useCheckingAccounts } from '../../hooks/useCheckingAccount';
import { useTransactions } from '../../hooks/useTransaction';
import { CheckingAccount, Transaction } from '../../types';

import TransferButton from '../ui/TransferButton';



const AccTransactionList = ({ accountHolderId, accountId, name }: { accountHolderId: number, accountId: string | number, name: string }) => {
  const checkingAccountResponse = useCheckingAccounts({ accountHolderId });
  const transactionsResponse = useTransactions(accountId, {});
  const accounts: CheckingAccount[] = checkingAccountResponse?.data?.data || [];
  const transactions: Transaction[] = transactionsResponse.data?.data || [];

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

  // Function to clip description to first few words
  const clipDescription = (description: string, maxWords: number = 10) => {
    if (!description) return 'Transaction';
    
    const words = description
    if (words.length <= maxWords) return description;
    
    return words.slice(0, maxWords)+ '...';
  };

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '100vw', 
      margin: '0 auto', 
      fontFamily: 'Arial, sans-serif', 
      background: '#f5f5f5',
      minHeight: '100vh'
    }}>
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

        /* Improved Transaction Styles */
        .transaction-item {
          padding: 12px 15px;
          border-bottom: 1px solid #e0e0e0;
          background: white;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .transaction-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }
        .transaction-description {
          font-size: 14px;
          font-weight: bold;
          color: #333;
          flex: 1;
          margin-right: 15px;
          /* Ensure text doesn't wrap and shows ellipsis */
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
        .transaction-amount {
          font-size: 16px;
          font-weight: bold;
          text-align: right;
          white-space: nowrap;
          min-width: 80px;
        }
        .debit-amount {
          color: #dc3545;
        }
        .credit-amount {
          color: #28a745;
        }
        .transaction-date {
          font-size: 12px;
          color: #666;
          margin: 0;
          width: 100%;
        }
        .card-container {
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          border: none;
          margin-bottom: 20px;
          background: white;
        }

        /* Responsive container */
        .responsive-container {
          width: 100%;
          margin: 0 auto;
          padding: 0;
        }

        /* Tablet and larger screens */
        @media (min-width: 768px) {
          .responsive-container {
            width: 100%;
            max-width: 600px;
          }
          .transaction-item {
            flex-direction: row;
            align-items: center;
            gap: 15px;
          }
          .transaction-header {
            flex: 1;
            align-items: center;
          }
          .transaction-date {
            width: auto;
            min-width: 100px;
            text-align: left;
          }
          .transaction-description {
            max-width: 300px;
          }
        }

        /* Small mobile screens */
        @media (max-width: 380px) {
          .transaction-item {
            padding: 10px 12px;
          }
          .transaction-description {
            font-size: 13px;
            max-width: 150px;
          }
          .transaction-amount {
            font-size: 15px;
            min-width: 70px;
          }
        }
      `}</style>

      <div className="responsive-container">
      
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

        <TransferButton accountId={accountId} />

        {/* Transactions Section */}
        <div className="card-container">
          <div className="section-header">Transactions</div>
          <div>
            {transactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-header">
                  <div className="transaction-description" title={transaction.description}>
                    {clipDescription(transaction.description)}
                  </div>
                  <div className={`transaction-amount ${transaction.type === 'debit' ? 'debit-amount' : 'credit-amount'}`}>
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>
                <div className="transaction-date">
                  {formatDate(transaction.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccTransactionList;