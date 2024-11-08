// AccountBox.tsx
import {  faArrowAltCircleUp, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card } from 'react-bootstrap';

interface AccountBoxProps {
  accountNumber: number;
  accountName:string;
}

const AccountBox: React.FC<AccountBoxProps> = ({  accountNumber, accountName }) => {
  return (
    <Card className="bg-blue text-light">
      <Card.Body className='d-flex justify-content-between'>
        <div >
        <Card.Title>{accountName}</Card.Title>
        <Card.Text>
       CHECKING
        </Card.Text>

        <Card.Text>
        ACCOUNT NUMBER:  <strong>{accountNumber}</strong> 
        </Card.Text>
        </div>
     
    <div className='d-flex flex-column justify-content-evenly'>
        <FontAwesomeIcon icon={ faEye}/>
        <FontAwesomeIcon icon={faArrowAltCircleUp}/>
    </div>
    </Card.Body>
    </Card>
  );
};

export default AccountBox;
