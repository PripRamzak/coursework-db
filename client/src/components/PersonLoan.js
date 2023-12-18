import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { fetchCards, fetchCardRequests, fetchCardTypes } from '../http/cardApi';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchLoans } from '../http/loanApi';
import CreateLoanRequest from './modals/CreateLoanRequest';

const PersonLoan = observer(() => {
    const { account } = useContext(Context)
    const [loans, setLoans] = useState([])
    const [loanRequestVisible, setLoanRequestVisible] = useState(false)

    useEffect(() => {
        fetchLoans(account.personId).then(data => setLoans(data))
    }, [account])

    return (
        <React.Fragment>
            <h1 className='mt-4'>
                Кредиты
            </h1>
            {loans.length === 0 ?
                <div className='mt-2'>
                    <h3 style={{ color: 'gray' }}>У вас нет кредитов</h3>
                    <Button className='mt-3 ms-5 d-flex' variant='outline-dark' onClick={() => setLoanRequestVisible(true)}>Оформить</Button>
                    <CreateLoanRequest show={loanRequestVisible} onHide={() => setLoanRequestVisible(false)} personId={account.personId}/>
                </div>
                :
                <>
                </>
            }
        </React.Fragment>
    );
})

export default PersonLoan;
