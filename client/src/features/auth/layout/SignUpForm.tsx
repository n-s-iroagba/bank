import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { useEffect, useState,useMemo } from 'react';
import '../../../common/styles/styles.css'
import "react-datepicker/dist/react-datepicker.css"
import { required } from '../components/required';
import { AuthContext } from '../context/AuthContext';
import { InputGroup, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { createInvestorUrl } from '../../../constants/constants';
import countryList from 'react-select-country-list'

const SignUpForm: React.FC = () => {
  const [startDate, setStartDate] = useState(new Date())
  const options = useMemo(() => countryList().getData(), [])
  const { investorData,
    submitting,
    setInvestorData,
    handleSubmit,
    handleChange,
    handleConfirmPasswordsChange,
    passwordType,
    showPassword,
    isMatchingPassword,
    errorMessage,
    setReferralToken,
    passwordValidityMessage,
    validated
  } = useContext<any>(AuthContext)

const navigate = useNavigate()

  const params = new URLSearchParams(window.location.search)
  const tokenFromUrl = params.get('token'); 
  useEffect(() => {
   
    if (tokenFromUrl){
    setReferralToken(tokenFromUrl);
    }
  },[setReferralToken, tokenFromUrl]);
  

  return (

    <div className="d-flex flex-column justify-content-center align-content-center mt-5  px-2 ">
      <Form className='form py-5' noValidate validated={validated} onSubmit={(e: any) => handleSubmit(investorData, e, createInvestorUrl,navigate)}>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationFormik01">
            <Form.Label className='mb-0'>First name{required}</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              value={investorData.firstName}
              onChange={(e) => handleChange(investorData, e, setInvestorData,)}
              className='text-light custom-input bg-transparent form-control'
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}  >
            <Form.Label className='mb-0'>Last name{required}</Form.Label>
            <Form.Control
              required
              type="text"
              name="lastName"
              value={investorData.lastName}
              onChange={(e) => handleChange(investorData, e, setInvestorData)}
              className='text-light custom-input bg-transparent form-control'
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>

        <br/>
        <Form.Group className=' mb-3 d-flex justify-content-between align-items-start' controlId="validationFormik04">
          <Form.Label>Date of birth{required}</Form.Label>
          <DatePicker className='bg-transparent text-light date-input' selected={startDate} onChange={(date: any) => {
            setInvestorData({ ...investorData, dateOfBirth: date })
            setStartDate(date)
          }} />
        </Form.Group>

        <Form.Group className='mb-3' controlId="validationFormik04">
          <Form.Label>Gender{required}</Form.Label>
          <Form.Select onChange={(e) => {
            setInvestorData({ ...investorData, gender: e.target.value })
          }} className=' bg-transparent text-light form-control'>
            <option className=' primary-background text-light' value={'male'}>Select your gender</option>
            <option  className=' primary-background text-light' value={'male'}>Male</option>
            <option  className=' primary-background text-light' value={'female'}>Female</option>
            <option   className=' primary-background text-light'value={'non-binary'}>Non-binary</option>
            <option   className='primary-background text-light' value={'prefer not to say'}>Prefer not to say</option>
          </Form.Select>.
        </Form.Group>

        <Form.Group className='mb-3' controlId="validationFormik04">
          <Form.Label>Country of residence{required}</Form.Label>
          <Select options={options} onChange={(e: any) => {
            setInvestorData({ ...investorData, country: e.label })
          }} className=' bg-transparent form-control' />
        </Form.Group>

        <Form.Group className='mb-4' as={Col} controlId="validationFormik01">
          <Form.Label className='mb-0'>Email{required}</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={investorData.email}
            onChange={(e) => handleChange(investorData, e, setInvestorData)}
            className='text-light custom-input bg-transparent form-control'
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group> 


       <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Password{required}</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={passwordType}
              name='password'
              value={investorData.password}
              onChange={(e) => handleChange(investorData, e, setInvestorData)}
              className=" custom-input bg-transparent form-control text-light"

            />
            <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
          <PasswordStrengthMeter password={investorData.password} />
          <div className='d-flex flex-column'>
            {
              Array.isArray(passwordValidityMessage) && passwordValidityMessage.length > 0 && (
                passwordValidityMessage.map((message, index) => (
                  <Form.Text className='text-danger' key={index}>*{message}</Form.Text>
                ))
              )
            }
          </div>
        </Form.Group>
        <br />

        <Form.Group as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Confirm password{required}</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={passwordType}
              name="confirmPassword"
              value={investorData.confirmPassword}
              onChange={(e) => handleConfirmPasswordsChange(investorData, e, setInvestorData)}
              className=" custom-input  bg-transparent form-control text-light "
            />
            <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
          <div>
            {
              !isMatchingPassword && <Form.Text className='text-danger'>*passwords do not match</Form.Text>
            }
          </div>
        </Form.Group>
        <br />
        <Row>
        <Form.Group as={Col} className='mb-4' controlId="validationFormik05">
          <Form.Label className='mb-0'>Bank name{required}</Form.Label>
          <Form.Control
            required
            type="text"
            name="bank"
            value={investorData.bank}
            onChange={(e) => handleChange(investorData, e, setInvestorData)}
            className=' custom-input text-light bg-transparent form-control'
          />
          <Form.Text className='text-light'>This is needed to process your payment when due.</Form.Text>
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group as={Col} sm = '12'className='mb-4' controlId="validationFormik05">
          <Form.Label className='mb-0'>Referral Code</Form.Label>
          <Form.Control
            type="number"
            name="referralCode"
            value={investorData.referralCode}
            onChange={(e) => handleChange(investorData, e, setInvestorData)}
            className=' custom-input text-light bg-transparent form-control'
          />
          <Form.Text className='text-light'>If you were referred kindly enter the referal code of your refree.</Form.Text>
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        </Row>
        <Form.Group>
        <div className='d-flex justify-content-evenly w-100 pb-5'>
          <button className='button-styles w-50 text-light' type={submitting === 'submitting' ? 'button' : 'submit'}>
          {submitting? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='button-styles text-light w-50' onClick={() => navigate('/')}> Home</button>
        </div>
        </Form.Group>
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>

  );
}

export default SignUpForm;
