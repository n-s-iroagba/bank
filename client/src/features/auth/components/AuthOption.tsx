import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { Col, Row } from 'react-bootstrap'




export const LoginOption: React.FC<{
    route: string;
    title: string;
    buttonText: string;
    icon?: IconProp;
    dontShowLogo?: boolean;
  }> = ({ route, title, buttonText, icon, dontShowLogo }) => {
    const navigate = useNavigate();
  
    return (
      <>
        <Row className='d-flex mb-3 justify-content-evenly align-items-center'>
          {!dontShowLogo && (
            <Col className='d-flex align-items-center pt-5' xs={3} md={6}>

            </Col>
          )}
          <Col>
            <div className={dontShowLogo?'w-100 d-flex mb-3 justify-content-between mt-3':'w-100 mb-3 d-flex align-items-end flex-column justify-content-between'}>
              <p className='mt-3 W-50'>{title}</p>
              <div className='w-50' >
                <button onClick={() => navigate(`/${route}`)} className={dontShowLogo?'text-light button-styles ':'button-styles'}>
                  {icon && <FontAwesomeIcon icon={icon} className='mr-2' />} 
                  <small>{buttonText}</small>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  };