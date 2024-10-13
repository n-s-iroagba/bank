import React from 'react';

import TransferList from './TransferList';
import '../styles/OptionsListing.css'
import AccountList from './AccountList';

interface OptionListingProps {
  selectedOption: string;
  toggleDrawer: () => void;
}
const dummyAccounts = [
  {
    name: 'Savings Account',
    number: '1234567890',
    availableAmount: '$5,000.00',
    currentAmount: '$10,000.00',
  },
  {
    name: 'Checking Account',
    number: '0987654321',
    availableAmount: '$2,500.00',
    currentAmount: '$5,000.00',
  },
];



const OptionListingComponent: React.FC<OptionListingProps> = ({ selectedOption, toggleDrawer }) => {
  const renderContent = () => {
    switch (selectedOption) {
      case 'Accounts':
        return <AccountList accounts={dummyAccounts} />;
      case 'Transfer':
        return <TransferList />;
      default:
        return <AccountList accounts={dummyAccounts} />;
    }
  };

  return (
    <div className="option-listing">
      

      {/* Conditionally render the content below the HeaderBar */}
      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};

export default OptionListingComponent;

