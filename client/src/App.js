import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from '.';
import { Spinner } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { fetchCardTypes } from './http/cardApi';
import { fetchLoanTypes } from './http/loanApi';

const App = observer(() => {
    const { account, card, loan } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.title = "СкруджБанк";
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            account.setAccount(jwtDecode(token))
            account.setIsAuth(true)
        }
        fetchCardTypes().then(data => card.setTypes(data))
        fetchLoanTypes().then(data => loan.setTypes(data))
        setLoading(false)
    }, [])

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
})

export default App;
