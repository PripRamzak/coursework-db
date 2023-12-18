import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchLoanTypes, fetchLoans } from '../http/loanApi';
import CreateLoanRequest from './modals/CreateLoanRequest';

const PersonLoan = observer(() => {
    const { account } = useContext(Context)
    const [loans, setLoans] = useState([])
    const [loanTypes, setLoanTypes] = useState([])
    const [loanRequestVisible, setLoanRequestVisible] = useState(false)

    useEffect(() => {
        fetchLoans(account.personId).then(data => setLoans(data))
        fetchLoanTypes().then(data => setLoanTypes(data))
    }, [account])

    const getLoanTypeName = (loanTypeId) => {
        if (loanTypes.length === 0)
            return ''
        return loanTypes.find(type => type.id === loanTypeId).name
    }

    return (
        <React.Fragment>
            <h1 className='mt-4'>
                Кредиты
            </h1>
            {loans.length === 0 ?
                <div className='mt-2'>
                    <h3 style={{ color: 'gray' }}>У вас нет кредитов</h3>
                    <Button className='mt-3 ms-5 d-flex' variant='outline-dark' onClick={() => setLoanRequestVisible(true)}>Оформить</Button>
                    <CreateLoanRequest show={loanRequestVisible} onHide={() => setLoanRequestVisible(false)} personId={account.personId} />
                </div>
                :
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Кредит</th>
                                <th>Дата окончания погашения</th>
                                <th>Оставшаяся сумма кредита</th>
                                <th>Сумма платежа</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map(loan =>
                                <tr key={loan.id}>
                                    <td>{getLoanTypeName(loan.loanTypeId)}</td>
                                    <td>{loan.date}</td>
                                    <td>{loan.amount}</td>
                                    <td>{loan.payment}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Button className='mt-1' variant='outline-dark'>Погасить кредит</Button>
                </>
            }
        </React.Fragment>
    );
})

export default PersonLoan;
