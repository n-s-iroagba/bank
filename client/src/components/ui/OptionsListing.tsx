import React from 'react';
import '../../styles/OptionsListing.css'
import { Alert } from 'react-bootstrap';

import TermDepositDashboard from '../accountHolder/TermDepositDashboard';
import AccTransactionList from '../accountHolder/AccTransactionList';





interface OptionListingProps {
  selectedOption: string;
  name:string
  accountId:number
  accountHolderId:number

}




const OptionListing: React.FC<OptionListingProps> = ({ selectedOption, name, accountId, accountHolderId }) => {
  const renderContent = () => {
    switch (selectedOption) {
     
      case 'Transfers':
        return <AccTransactionList accountId={accountId} accountHolderId={accountHolderId} name={name} />;
      case 'Term Deposit':
          return <TermDepositDashboard accountHolderId={accountHolderId}/>;
      default:
        return <Alert variant='danger' className='mx-2 mt-5 text-center'>Access denied. Please contact support to regain access.</Alert>
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

