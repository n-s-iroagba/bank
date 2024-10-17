import React, {  useState } from 'react';
import OptionListingComponent from '../../features/client/components/OptionsListing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons';
import CheckingDrawerComponent from '../../features/client/components/CheckingDrawerComponent';
import TermDrawerComponent from '../../features/client/components/TermDrawerComponent';
import AccountsList from '../../features/client/components/AccountList';


const Dashboard: React.FC = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(window.innerWidth > 992);
  const [selectedOption, setSelectedOption] = useState('Accounts');
  const [accountType, setAccountType] = useState('')


  // Drawer options
  const checkingOptions = ['Accounts', 'Transfer', 'Other Option 2'];
  const termOptions =['Accounts','Term Deposit','Other Option 2']

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };



  const handleOptionSelect = (option: string) => {

      setSelectedOption(option);
    if (window.innerWidth < 992) {
      setDrawerVisible(false);
    }
  };
  
  return (
    <div className="">
      <div className="header-bar d-flex bg-blue justify-content-between align-items-center px-5" style={{ height: '1.5cm' }}>
        <FontAwesomeIcon icon={faBars} onClick={toggleDrawer} className="hamburger-icon text-light" />
        <h4 className='text-light'>{selectedOption}</h4>
        <FontAwesomeIcon icon={faCog} className="wheel-icon text-light" />
      </div>
      
      {isDrawerVisible && (
  accountType === 'Checking Account' ? (
    <CheckingDrawerComponent
      selectedOption={selectedOption}
      options={checkingOptions}
      isVisible={true}
      onSelectOption={handleOptionSelect}
    />
  ) : (
    <TermDrawerComponent
      selectedOption={selectedOption}
      options={termOptions}
      isVisible={true}
      onSelectOption={handleOptionSelect}
    />
  )
)}

        <div>
          {selectedOption==='Accounts'?<AccountsList  setAccountType={setAccountType} setDrawerVisible={setDrawerVisible}/>:
          <OptionListingComponent  setDrawerVisible={setDrawerVisible} selectedOption={selectedOption}   />
}
        </div>
  
    </div>
  );
};

export default Dashboard;



  



