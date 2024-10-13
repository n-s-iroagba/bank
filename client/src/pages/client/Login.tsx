import React from 'react'
import LoginForm from '../../features/client/components/LoginForm'
import '../../features/client/styles/GeneralButtonStyles.css'
import '../../features/client/styles/CarouselHeader.css';
import '../../features/client/styles/GeneralStyles.css'
import Footer from '../../features/client/components/Footer';


const Login = ()=>{
    return <div>
    <div className='py-3 px-3 bg-red text-light'>
      <h5>Your Feedback Matters</h5>
      <p className='small-font '>Questions? Comments?</p>
      <p className='small-font '>Complaints? We're here to help. </p>
      <p className='small-font pt-3'><span className='underline'>Feedback</span> | <span className='underline'>Complaints</span></p>
    </div>
    <LoginForm />
    <Footer/>
  </div>
}
export default Login