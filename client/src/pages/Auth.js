import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, BANK_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userApi';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const Auth = observer(() => {
    const { account } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            }
            else {
                data = await registration(email, password);
            }

            account.setAccount(data)
            account.setIsAuth(true)
            navigate(BANK_ROUTE)
        }
        catch (e) {
            alert(e.responce.data.message)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-4" placeholder="Электронная почта" value={email} onChange={e => setEmail(e.target.value)} />
                    <Form.Control className="mt-3" placeholder="Пароль" value={password} onChange={p => setPassword(p.target.value)} type='password' />
                    <Row className="mt-3">
                        {isLogin ?
                            <Col className='mt-2 ms-1'>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь</NavLink></Col>
                            :
                            <Col className='mt-2 ms-1'>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink></Col>
                        }
                        <Col md="auto">
                            <Button variant="success" onClick={click}>
                                {isLogin ? 'Войти' : 'Зарегистрироваться'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
})

export default Auth;
