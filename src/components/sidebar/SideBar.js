import React from 'react'
import { Col, Image, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBell, faChartPie, faList, faTv, faUser } from '@fortawesome/free-solid-svg-icons'

function SideBar() {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("curentUserLogin")
        navigate('/')
    }

    return (
        <Col md={2} className='border-end'>
            <div className='mb-4 text-center'>
                <Image
                    roundedCircle
                    src='https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/33/b6/0c/33b60c91-3463-7f18-e1e4-13e923ce28c5/source/200x200bb.jpg'
                    style={{ width: '100px', height: '100px' }}
                />
            </div>

            <div className='mb-2'>
                <NavLink
                    className='btn text-start'
                    style={({ isActive }) => {
                        return {
                            width: '100%',
                            borderRadius: '5px',
                            padding: '2px',
                            textDecoration: 'none',
                            color: isActive ? 'black' : 'gray',
                            fontWeight: isActive ? 'bold' : '',
                            backgroundColor: isActive ? "#d4e6f9" : "",
                        };
                    }}
                    to={`/listReportPage`}
                >
                    <FontAwesomeIcon icon={faList} className='me-2' />
                    Danh Sách
                </NavLink>
            </div>

            <div className='mb-2'>
                <NavLink
                    className='btn text-start'
                    style={({ isActive }) => {
                        return {
                            width: '100%',
                            borderRadius: '5px',
                            padding: '2px',
                            textDecoration: 'none',
                            color: isActive ? 'black' : 'gray',
                            fontWeight: isActive ? 'bold' : '',
                            backgroundColor: isActive ? "#d4e6f9" : "",
                        };
                    }}
                    to={`/followPage`}
                >
                    <FontAwesomeIcon icon={faTv} className='me-2' />
                    Theo Dõi &amp; Xem Xét
                </NavLink>
            </div>

            <div className='mb-2'>
                <NavLink
                    className='btn text-start'
                    style={({ isActive }) => {
                        return {
                            width: '100%',
                            borderRadius: '5px',
                            padding: '2px',
                            textDecoration: 'none',
                            color: isActive ? 'black' : 'gray',
                            fontWeight: isActive ? 'bold' : '',
                            backgroundColor: isActive ? "#d4e6f9" : "",
                        };
                    }}
                    to={`/chartPage`}
                >
                    <FontAwesomeIcon icon={faChartPie} className='me-2' />
                    Biểu Đồ
                </NavLink>
            </div>

            <div className='mb-2'>
                <NavLink
                    className='btn text-start'
                    style={({ isActive }) => {
                        return {
                            width: '100%',
                            borderRadius: '5px',
                            padding: '2px',
                            textDecoration: 'none',
                            color: isActive ? 'black' : 'gray',
                            fontWeight: isActive ? 'bold' : '',
                            backgroundColor: isActive ? "#d4e6f9" : "",
                        };
                    }}
                    to={`/notificationPage`}
                >
                    <FontAwesomeIcon icon={faBell} className='me-2' />
                    Thông Báo
                </NavLink>
            </div>

            <div className='mb-2'>
                <NavLink
                    className='btn text-start'
                    style={({ isActive }) => {
                        return {
                            width: '100%',
                            borderRadius: '5px',
                            padding: '2px',
                            textDecoration: 'none',
                            color: isActive ? 'black' : 'gray',
                            fontWeight: isActive ? 'bold' : '',
                            backgroundColor: isActive ? "#d4e6f9" : "",
                        };
                    }}
                    to={`/accountPage`}
                >
                    <FontAwesomeIcon icon={faUser} className='me-2' />
                    Cá Nhân
                </NavLink>
            </div>

            <div
                style={{
                    position: 'fixed',
                    bottom: 10,
                    left: 10
                }}
            >
                <Button
                    className='btn btn-sm btn-secondary'
                    onClick={handleLogout}
                >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='me-2' />
                    Đăng Xuất
                </Button>
            </div>

        </Col>
    )
}

export default SideBar