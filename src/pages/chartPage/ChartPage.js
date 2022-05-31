import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';

import SideBar from '../../components/sidebar/SideBar';

function ChartPage() {
  return (
    <Container fluid>
      <Row style={{ height: window.innerHeight }}>

        <SideBar />

        <Col md={10} className='bg-primary'>ChartPage</Col>
      </Row>
    </Container>
  )
}

export default ChartPage