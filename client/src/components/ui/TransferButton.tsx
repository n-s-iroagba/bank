import React from 'react';
import {  Row, Col } from 'react-bootstrap';
import '../../styles/TransferButton.css'
import { useNavigate } from 'react-router-dom';

const TransferButton = ({accountId}:{accountId:string|number}) => {
    const navigate = useNavigate()
    

  return (
    <button onClick={()=>navigate(`/account-holder/transfer/${accountId}`)} className="outer-background" >
      <Row className="inner-background align-items-center">
        <Col className="text-center">
          <h1 className="text-blue">
            Transfer Funds
            <span className="red-circle">
              &gt;
            </span>
          </h1>
        </Col>
      </Row>
    </button>
  );
};

export default TransferButton;
