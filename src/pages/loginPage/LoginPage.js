import React from 'react'
import { Col, Container, Row, Form, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from './loginPageStyle.module.css'

import { ValidatePassword, ValidateUsername } from '../../validate/ValidateForm'

function LoginPage() {
    const navigate = useNavigate()

    const [usernameLogin, setUsernameLogin] = React.useState('')
    const [passwordLogin, setPasswordLogin] = React.useState('')

    const [usernameFail, setUsernameFail] = React.useState('')
    const [passwordFail, setPasswordFail] = React.useState('')

    const checkUsername = (username) => {
        if (ValidateUsername(username)) {
            setUsernameLogin(username)
            setUsernameFail('')
            return true
        } else {
            setUsernameLogin('')
            setUsernameFail('Tên không được bỏ trống')
            return false
        }
    }

    const checkPassword = (password) => {
        if (ValidatePassword(password)) {
            setPasswordLogin(password)
            setPasswordFail('')
            return true
        } else {
            setPasswordLogin('')
            setPasswordFail('Mật khẩu không được bỏ trống')
            return false
        }
    }

    const login = () => {
        let formData = new FormData()
        formData.append('username', usernameLogin)
        formData.append('password', passwordLogin)

        if (checkUsername(usernameLogin) && checkPassword(passwordLogin)) {
            axios.post('https://qlsc.maysoft.io/server/api/auth/login',
                formData)
                .then((res) => {
                    if (res.data.status) {
                        localStorage.setItem("curentUserLogin", JSON.stringify(res.data.data))
                        navigate('/listReportPage')
                    } else {
                        setPasswordFail(res.data.errors)
                    }
                })
        .catch((err) => {
            console.log(err);
        })
}
    }

return (
    <Container fluid >
        <Row
            className='d-flex align-items-center justify-content-center'
        >
            <Col
                md={5}
                className={styles.boxLogin}
            >
                <Form>
                    <div className='text-center'>
                        <Image
                            roundedCircle
                            src='https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/33/b6/0c/33b60c91-3463-7f18-e1e4-13e923ce28c5/source/200x200bb.jpg'
                        />
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Tên Tài Khoản</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên tài khoản"
                            autoFocus
                            onChange={(e) => checkUsername(e.target.value)}
                        />
                        <Form.Text className="text-danger">{usernameFail}</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-5">
                        <Form.Label>Mật Khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập Mật Khẩu"
                            onChange={(e) => checkPassword(e.target.value)}
                        />
                        <Form.Text className="text-danger">{passwordFail}</Form.Text>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="button"
                        className='w-100'
                        onClick={login}
                    >
                        Đăng Nhập
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container >
)
}

export default LoginPage