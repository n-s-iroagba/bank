import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

const LogOutButton: React.FC = () => {
    const navigate = useNavigate()
    const handleLogOut = ()=>{
      localStorage.removeItem('token')
      navigate('/login')
    }
    

  return (
    <button onClick={() => handleLogOut()} className="bg-red d-flex w-100 justify-content-center align-items-center">
    <FontAwesomeIcon icon={faArrowAltCircleRight} className='text-light' />
    <p className="text-light mb-0 ms-2"> 
      Log out
    </p>
  </button>
  
  );
};

export default LogOutButton;
