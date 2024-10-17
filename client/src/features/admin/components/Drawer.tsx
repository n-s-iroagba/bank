import React from 'react';
import { Button } from 'react-bootstrap';
import '../styles/Drawer.css'

interface DrawerProps {
  onSelectOption: (option: string) => void;
}

const Drawer: React.FC<DrawerProps> = ({ onSelectOption }) => {
  return (
    // <div className="drawer">
    //   <Button variant='primary'  onClick={() => onSelectOption('AdminAccounts')}>
    //     Admins
    //   </Button>
    //   <Button  onClick={() => onSelectOption('WorkingAccounts')}>
    //     Working Accounts
    //   </Button>
    // </div>
    <div className="">
      <ul>
        <li>
          <button onClick={() => onSelectOption('AdminAccounts')}>Admins</button>
        </li>
        <li>
          <button onClick={() => onSelectOption('WorkingAccounts')}>Working Accounts</button>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
