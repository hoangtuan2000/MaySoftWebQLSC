import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

import SideBar from '../../components/sidebar/SideBar';

function FollowPage() {
  return (
    <Container fluid>
    <Row style={{ height: window.innerHeight }}>

        <SideBar />

        <Col md={10} className='bg-primary'>Follow</Col>
    </Row>
</Container>
  )
}

export default FollowPage