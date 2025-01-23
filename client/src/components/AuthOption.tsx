import React from 'react'

import { useNavigate } from 'react-router-dom'


import image from '../assets/images/greater-texas-cu-icon.svg'
import '../styles/AuthForm.css'



export const AuthOption: React.FC<{
    route: string;
    title: string;
    buttonText: string;

    dontShowLogo?: boolean;
  }> = ({ route, title, buttonText,  dontShowLogo }) => {
    const navigate = useNavigate();
  
    return (
      <>
        
          {!dontShowLogo && (
            <div className='d-flex justify-content-center pt-5 mb-3' >
<img style={{height:'2rem'}} src={image} alt='icon'/>
            </div>
          )}
          
            <div className={'  w-md-100 my-3 d-flex gap-4  align-items-center '}>
              <p className=' W-50'>{title}</p>
             
                <button onClick={() => navigate(`${route}`)} className='button-radius bg-blue  py-3 text-light' style={{width:'4cm'}}>
                 
                  <small>{buttonText}</small>
                </button>
              
            </div>
          
     
      </>
    );
  };