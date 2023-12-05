import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Context } from '../index';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{ color: 'white', textDecoration: 'none', fontSize: 24 }} to={SHOP_ROUTE}>ShopOnline</NavLink>
                {user.isAuth ?
                    <Nav className="ms-auto">
                        <Button className="me-2" onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
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
