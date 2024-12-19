import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Context } from '../index';
import { ACTIVATION_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, BANK_ROUTE, CARDS_ROUTE, PERSONAL_ACCOUNT_ROUTE, WORKER_ROUTE, LOANS_ROUTE, PAYMENTS_ROUTE, USRES_ROUTE, PRODUCT_REQUESTS_ROUTE, ACTIVATION_REQUESTS_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const NavBar = observer(() => {
    const { account, card, loan } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem('token')
        
        account.setAccount({})
        account.setIsAuth(false)

        card.setUserCards([])
        card.setUserRequests([])

        loan.setUserLoans([])
        loan.setUserRequests([])
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{ color: 'white', textDecoration: 'none', fontSize: 32 }} to={BANK_ROUTE}>СкруджБанк</NavLink>
                <NavLink className='ms-5 mt-1' style={{ color: 'lightgray', textDecoration: 'none', fontSize: 24 }} to={CARDS_ROUTE}>Карты</NavLink>
                <NavLink className='ms-5 mt-1' style={{ color: 'lightgray', textDecoration: 'none', fontSize: 24 }} to={LOANS_ROUTE}>Кредиты</NavLink>
                {account.isAuth ?
                    <Nav className="ms-auto">
                        {account.role === 'ADMIN' &&
                            <Dropdown>
                                <Dropdown.Toggle className='me-2' variant='light'>
                                    Админ панель
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => navigate(ADMIN_ROUTE + USRES_ROUTE)}>Пользователи</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate(ADMIN_ROUTE + PAYMENTS_ROUTE)}>Платежи</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate(ADMIN_ROUTE + CARDS_ROUTE)}>Карты</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate(ADMIN_ROUTE + LOANS_ROUTE)}>Кредиты</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Toggle>
                            </Dropdown>
                        }
                        {account.role === 'WORKER' &&
                            <Dropdown>
                                <Dropdown.Toggle className='me-2' variant='light'>
                                    Панель сотрудника
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => navigate(WORKER_ROUTE + ACTIVATION_REQUESTS_ROUTE)}>Запросы на активацию</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate(WORKER_ROUTE + PRODUCT_REQUESTS_ROUTE)}>Заявки</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate(WORKER_ROUTE + CARDS_ROUTE)}>Карты</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate(WORKER_ROUTE + LOANS_ROUTE)}>Кредиты</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown.Toggle>
                            </Dropdown>
                        }
                        {account.status == 'Не активирован' && !account.activationRequest &&
                            <Button variant='light' className="me-2" onClick={() => navigate(ACTIVATION_ROUTE)}>Активировать аккаунт</Button>
                        }
                        <Dropdown>
                            <Dropdown.Toggle variant='light'>
                                Интернет-банкинг
                                <Dropdown.Menu>
                                    {account.status != 'Не активирован' &&
                                        <Dropdown.Item onClick={() => navigate(PERSONAL_ACCOUNT_ROUTE)}>Личный кабинет</Dropdown.Item>
                                    }
                                    <Dropdown.Item onClick={() => logOut()}>Выйти</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Toggle>
                        </Dropdown>
                    </Nav>
                    :
                    <Nav className="ms-auto">
                        <Button variant='light' onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
})

export default NavBar;
