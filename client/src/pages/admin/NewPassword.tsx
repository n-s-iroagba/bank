import React from 'react';
import { Form, Button } from 'react-bootstrap';
import image from '../../assets/images/greater-texas-cu-icon.svg'

const NewPassword: React.FC = () => {

  return (
    <div className="form-wrapper d-flex flex-column align-items-center">
  
    <img style={{height:'2cm'}} src={image} alt='icon'/>
    <h3 className='text-center'>Enter Your New Password</h3>
  <Form>
    <Form.Group controlId="email">
      <Form.Label>New  password</Form.Label>
      <Form.Control
        type="email"
       
        className='form-input'
   
        required
      />
      <br/>
    </Form.Group>
    <Form.Group controlId="email">
      <Form.Label>Confirm  password</Form.Label>
      <Form.Control
        type="email"
     
        className='form-input'
        required
      />
    </Form.Group>
    <br />
    <Button   className="button-radius bg-red w-100" type="submit">Submit</Button>
  </Form>
  </div>
  )
}
export default NewPassword