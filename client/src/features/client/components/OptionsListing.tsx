import React from 'react';
import TransferList from './TransferList';
import '../styles/OptionsListing.css'
import AccountList from './AccountList';
import { Alert } from 'react-bootstrap';

interface OptionListingProps {
  selectedOption: string;
  blocked:any
  setSelectOption:any
}
const dummyAccounts = [
  {
    id:1,
    name: 'Savings Account',
    number: '1234567890',
    availableAmount: '$5,000.00',
    currentAmount: '$10,000.00',
  },
  {id:2,
    name: 'Checking Account',
    number: '0987654321',
    availableAmount: '$2,500.00',
    currentAmount: '$5,000.00',
  },
];



const OptionListingComponent: React.FC<OptionListingProps> = ({ selectedOption, blocked,setSelectOption }) => {
  const renderContent = () => {
    switch (selectedOption) {
      case 'Accounts':
        return <AccountList blocked = {blocked} accounts={dummyAccounts} setSelectedOption={setSelectOption} />;
      case 'Transfer':
        return <TransferList blocked={blocked} />;
      default:
        return <Alert variant='danger' className='mx-2 mt-5'>Access to this action has been restricted by the credit union, kindly contact the support team.</Alert>
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

