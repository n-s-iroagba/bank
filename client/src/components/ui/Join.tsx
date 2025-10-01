import React from 'react';
import '../../styles/Join.css'; // Import CSS for styling
import joinImage from '../../assets/images/wide_kidsScenicView.jpg'; // Replace with your image path
import '../../styles/GeneralButtonStyles.css'

const Join = () => {
    return (
        <div className="join-container">
            <img src={joinImage} alt="Join Us" className="join-image" />
            <div className="overlay-content d-flex flex-column align-items-start">
                <h3 className='text-start'>Not a member yet?</h3>
                <h6 className='text-start'>
                Become a part of something Greater.</h6>
                <button className="button-width button-radius button text-light bg-transparent">Get Started</button>
            </div>
        </div>
    );
};

export default Join;
