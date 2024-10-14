import React, { useRef, useState } from 'react';
import DrawerComponent from '../../features/client/components/DrawerComponent';
import OptionListingComponent from '../../features/client/components/OptionsListing';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCog } from '@fortawesome/free-solid-svg-icons';


const Dashboard: React.FC = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(window.innerWidth > 992);
  const [selectedOption, setSelectedOption] = useState('Accounts');
  const blocked = useRef<boolean>(false)

  // Drawer options
  const options = ['Accounts', 'Transfer', 'Other Option 1', 'Other Option 2'];

  const toggleDrawer = () => {
    setDrawerVisible(!isDrawerVisible);
  };

  const handleOptionSelect = (option: string) => {

      if (option === 'Transfer') {
      if (blocked.current) {setSelectedOption('');
      alert('hello')
      }
      else {
        setSelectedOption('Transfer');
      }
    } else {
      setSelectedOption(option);
    }
  
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
      
      <DrawerComponent  blocked={blocked} options={options} selectedOption={selectedOption} onSelectOption={handleOptionSelect} isVisible={isDrawerVisible} />

        <div>
          <OptionListingComponent setSelectOption={setSelectedOption} blocked ={blocked} selectedOption={selectedOption} />
        </div>
  
    </div>
  );
};

export default Dashboard;



  



