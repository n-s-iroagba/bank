import React from 'react';

interface DashboardViewSelectorProps {
  selectedView: 'accounts' | 'transactions';
}

const DashboardViewSelector: React.FC<DashboardViewSelectorProps> = ({ selectedView }) => {
  return (
    <div>
      {selectedView === 'accounts' ? (
        <div>
          <h2>Accounts</h2>
          <p>List of accounts will be shown here.</p>
        </div>
      ) : (
        <div>
          <h2>Transactions</h2>
          <p>List of transactions will be shown here.</p>
        </div>
      )}
    </div>
  );
};

export default DashboardViewSelector;
