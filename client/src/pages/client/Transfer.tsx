import React from 'react'
import { Col, Row } from 'react-bootstrap'
import MakeDebit from '../../features/client/components/MakeDebit'


const Transfer = () =>{
    return <>
    <Row className='d-flex justify-content-center'>
        <Col xs={12} md={8} lg={6}>
        <MakeDebit/>
        </Col>
    </Row>
   
    </>

}
export default Transfer