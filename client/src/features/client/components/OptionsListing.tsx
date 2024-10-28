import React from 'react';
import TransferList from './TransferList';
import '../styles/OptionsListing.css'
import { Alert } from 'react-bootstrap';
import TermDepositDetails from './TermDepositDetails';

interface OptionListingProps {
  selectedOption: string;
  setDrawerVisible:any
}




const OptionListingComponent: React.FC<OptionListingProps> = ({ selectedOption,   setDrawerVisible }) => {
  const renderContent = () => {
    switch (selectedOption) {
     
      case 'Transfers':
        return <TransferList />;
      case 'Term Deposit':
          return <TermDepositDetails />;
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

