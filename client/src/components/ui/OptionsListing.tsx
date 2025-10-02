import React from 'react';
import '../../styles/OptionsListing.css'
import { Alert } from 'react-bootstrap';

import TermDepositDashboard from '../accountHolder/TermDepositDashboard';
import AccTransactionList from '../accountHolder/AccTransactionList';





interface OptionListingProps {
  selectedOption: string;
  setDrawerVisible:(state:boolean)=>void
}




const OptionListing: React.FC<OptionListingProps> = ({ selectedOption,   setDrawerVisible }) => {
  const renderContent = () => {
    switch (selectedOption) {
     
      case 'Transfers':
        return <AccTransactionList accountId={2} accountHolderId={1} name='string' />;
      case 'Term Deposit':
          return <TermDepositDashboard />;
      default:
        return <Alert variant='danger' className='mx-2 mt-5'>Access to this action has been restricted by the credit union, kindly contact the support team.</Alert>
    }
  };

  return (
    <div className="option-listing">
      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};

export default OptionListing;

