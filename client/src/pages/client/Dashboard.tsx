import React, { useState } from 'react';
import DrawerComponent from '../../features/client/components/DrawerComponent';
import OptionListingComponent from '../../features/client/components/OptionsListing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons';


const Dashboard: React.FC = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Accounts');

  // Drawer options
  const options = ['Accounts', 'Transfer', 'Other Option', 'Other Option', 'Other Option', 'Other Option', 'Other Option', 'Other Option', 'Other Option'];

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    if (window.innerWidth < 992) {
      setDrawerVisible(false);  // Hide drawer on small/medium screens
    }
  };

  return (
    <div className="">
      <div className="header-bar d-flex bg-blue justify-content-between align-items-center px-3" style={{height:'1.5cm'}}>
        <FontAwesomeIcon icon={faBars} onClick={toggleDrawer} className="hamburger-icon text-light" />
        <h4 className='text-light'>{selectedOption}</h4>
        <FontAwesomeIcon icon={faCog} className="wheel-icon text-light" />
      </div>
      
      <DrawerComponent options={options} selectedOption={selectedOption} onSelectOption={handleOptionSelect} isVisible={isDrawerVisible} />

      {/* Option Listing */}
      <OptionListingComponent selectedOption={selectedOption} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Dashboard;



  



