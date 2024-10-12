import React from 'react';
import '../styles/Join.css'; // Import CSS for styling
import joinImage from '../assets/wide_kidsScenicView.jpg'; // Replace with your image path

const Join = () => {
    return (
        <div className="join-container">
            <img src={joinImage} alt="Join Us" className="join-image" />
            <div className="overlay-content">
                <h2>Join Us Today!</h2>
                <button className="btn btn-primary">Get Started</button>
            </div>
        </div>
    );
};

export default Join;
