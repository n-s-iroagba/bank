import SignUpForm from "../../features/auth/components/SignUpForm"
import logoPic from '../../assets/images/greater-texas-cu-logo.svg'


const SignUp = ()=>{
    return<div className="py-5 px-3">
        <div className="d-flex justify-content-center">
        <img src={logoPic} alt="greater-texas" className="w-50 sm-w-75"/>
        </div>
        <SignUpForm/>
    </div>
}
export default SignUp