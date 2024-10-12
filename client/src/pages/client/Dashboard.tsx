import React, { useState } from 'react';
import DrawerComponent from '../../features/client/components/DrawerComponent';
import OptionListingComponent from '../../features/client/components/OptionsListing';


const Dashboard: React.FC = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  // Drawer options
  const options = ['Accounts', 'Transfer', 'Other Option'];

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
    <div className="page-container d-flex">
      {/* Drawer */}
      <DrawerComponent options={options} selectedOption={selectedOption} onSelectOption={handleOptionSelect} isVisible={isDrawerVisible} />

      {/* Option Listing */}
      <OptionListingComponent selectedOption={selectedOption} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Dashboard;



  



