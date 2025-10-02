import React, {  useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons';
import AccountList from '../../components/accountHolder/AccountList';
import CheckingAccountDrawer from '../../components/accountHolder/CheckingAccountDrawer';
import TermDepositAccountDrawer from '../../components/accountHolder/TermDepositDrawer';
import OptionListing from '../../components/ui/OptionsListing';



const Dashboard: React.FC = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(window.innerWidth > 992);
  const [selectedOption, setSelectedOption] = useState('Accounts');
  const [accountType, setAccountType] = useState('')

const user = {
  id:1,
  username:''
}
  // Drawer options
  const checkingOptions = ['Accounts','Statements', 'Transfers', 'Deposit Check', 'Pay a Member','Bill Pay A2A/P2P', 'Money Manager'];
  const termOptions =['Accounts','Term Deposit',]

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
      <div className="header-bar d-flex bg-blue justify-content-between align-items-center px-4" style={{ height: '1.5cm' }}>
        <FontAwesomeIcon icon={faBars} onClick={toggleDrawer} className="hamburger-icon text-light" />
        <h4 className='text-light'>{selectedOption}</h4>
        <FontAwesomeIcon icon={faCog} className="wheel-icon text-light" />
      </div>
      
      {isDrawerVisible && (
  accountType === 'Checking Account' ? (
    <CheckingAccountDrawer 
      selectedOption={selectedOption}
      options={checkingOptions}
      isVisible={true}
      onSelectOption={handleOptionSelect}
    />
  ) : (
    <TermDepositAccountDrawer
      selectedOption={selectedOption}
      options={termOptions}
      isVisible={true}
      onSelectOption={handleOptionSelect}
    />
  )
)}
        <div>
          {selectedOption==='Accounts'?<AccountList  setAccountType={setAccountType} setDrawerVisible={setDrawerVisible} accountHolderId={user.id} accountName={user.username} />:
          <OptionListing  setDrawerVisible={setDrawerVisible} selectedOption={selectedOption}   />
}
        </div>
  
    </div>
  );
};

export default Dashboard;



  



