import React, { useState, useEffect } from 'react';
import logo from '../assets/greater-texas-cu-logo.svg';
import scrolledLogo from '../assets/greater-texas-cu-icon.svg';
import aggLogo from '../assets/agg-icon-circle.svg'
import '../styles/Logo.css';

const Logo = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

    // Function to handle scrolling
    const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsScrolled(scrollY > 50); // Example threshold for scroll change
    };

    // Function to handle window resize
    const handleResize = () => {
        setIsLargeScreen(window.innerWidth > 768); // Example for large screen threshold
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
        <div className="bg-light d-flex justify-content-center py-3">
            { isLargeScreen ? (
                <div>
                <div>
                 <img className="logo" src={aggLogo} alt="Scrolled Logo" />
                 <p>a</p>
                 </div>
                {isScrolled?<img className="logo" src={scrolledLogo} alt="Scrolled Logo" />:<img className="logo" src={logo} alt="Default Logo" />}
                <button>join</button>
                </div>
               
            ) : (
                <img className="logo" src={logo} alt="Default Logo" />
            )}
        </div>
    );
};

export default Logo;
