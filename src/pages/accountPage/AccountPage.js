import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import SideBar from '../../components/sidebar/SideBar';

function AccountPage() {
  return (
    <Container fluid>
      <Row style={{ height: window.innerHeight }}>

        <SideBar />

        <Col md={10} className='bg-primary'>AccountPage</Col>
      </Row>
    </Container>
  )
}

export default AccountPage