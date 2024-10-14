import React from 'react'
import MakeTransfers from '../../features/client/components/MakeTransfer'
import { Col, Row } from 'react-bootstrap'


const Transfer = () =>{
    return <>
    <Row className='d-flex justify-content-center'>
        <Col xs={12} md={8} lg={6}>
        <MakeTransfers/>
        </Col>
    </Row>
   
    </>

}
export default Transfer