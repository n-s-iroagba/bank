import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons';
import AccountList from './AccountList';
import TransferList from './TransferList';

interface OptionListingProps {
  selectedOption: string;
  toggleDrawer: () => void;
}

const OptionListingComponent: React.FC<OptionListingProps> = ({ selectedOption, toggleDrawer }) => {
  const renderContent = () => {
    switch (selectedOption) {
      case 'Accounts':
        return <AccountList />;
      case 'Transfer':
        return <TransferList />;
      default:
        return <div>Select an option from the drawer</div>;
    }
  };

  return (
    <div className="option-listing" style={{ width: '33vw', marginLeft: 'auto', padding: '10px', background: '#f0f0f0' }}>
      <div className="header-bar d-flex justify-content-between align-items-center">
        <FontAwesomeIcon icon={faBars} onClick={toggleDrawer} className="hamburger-icon" />
        <h4>{selectedOption}</h4>
        <FontAwesomeIcon icon={faCog} className="wheel-icon" />
      </div>

      {/* Conditionally render the content below the HeaderBar */}
      <div className="content-area">
        {renderContent()}
      </div>
    </div>
  );
};

export default OptionListingComponent;

