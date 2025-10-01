import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/greater-texas-cu-logo.svg'
;
import scrolledLogo from '../../assets/images/greater-texas-cu-icon.svg';
import aggLogo from '../../assets/images/agg-icon-circle.svg'
import '../../styles/Logo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const Logo = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

    // Function to handle scrolling
    const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 50);
    };

    // Function to handle window resize
    const handleResize = () => {
        setIsLargeScreen(window.innerWidth > 768); 
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`${!isLargeScreen?'d-flex justify-content-center':''} bg-light py-3`}>
            {isLargeScreen ? (
                <div className='d-flex justify-content-between px-5'>
                    <div className='d-flex align-items-center'>
                        <img className="agg-logo me-3" src={aggLogo} alt="Scrolled Logo" />
                        <br/>
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                    {isScrolled ? <img className="scroll-logo" src={scrolledLogo} alt="Scrolled Logo" /> : <img className="logo" src={logo} alt="Default Logo" />}
                    <button className='button-radius button-width bg-blue text-light'>join</button>
                </div>

            ) : (
                <img className="logo" src={logo} alt="Default Logo" />
            )}
        </div>
    );
};

export default Logo;
