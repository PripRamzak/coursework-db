import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Context } from '../index';
import { ACTIVATION_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE, BANK_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const { account } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        account.setAccount({})
        account.setIsAuth(false)
    }

    console.log(account)

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{ color: 'white', textDecoration: 'none', fontSize: 24 }} to={BANK_ROUTE}>СкруджБанк</NavLink>
                {account.isAuth ?
                    <Nav className="ms-auto">
                        {account.role === 'ADMIN' &&
                            <Button className="me-2" onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
                        }
                        {account.status == 'Не активирован' &&
                            <Button className="me-2" onClick={() => navigate(ACTIVATION_ROUTE)}>Активировать аккаунт</Button>
                        }
                        <Button onClick={() => logOut()}>Выйти</Button>
                    </Nav>
                    :
                    <Nav className="ms-auto">
                        <Button onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
})

export default NavBar;
