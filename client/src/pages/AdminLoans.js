import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { fetchPersons } from '../http/userApi';
import { fetchLoanTypes, fetchLoans, fetchLoansCount } from '../http/loanApi';
import { Context } from '..';
import CreateLoanType from '../components/modals/CreateLoanType';
import UpdateLoanType from '../components/modals/UpdateLoanType';

const AdminLoans = observer(() => {
    const { loan } = useContext(Context)

    const [selectedLoan, setSelectedLoan] = useState(null)
    const [createLoanVisible, setCreateLoanVisible] = useState(false)
    const [updateLoanVisible, setUpdateLoanVisible] = useState(false)

    useEffect(() => {
        if (!updateLoanVisible)
            fetchLoanTypes().then(data => loan.setTypes(data))
    }, [updateLoanVisible])

    return (
        <Container>
            <h2 className='mt-2 text-center'>Кредиты</h2>
            <Row className='d-flex justify-content-center'>
                <Button variant={"outline-dark"} className='mt-2' style={{ width: '50%' }} onClick={() => setCreateLoanVisible(true)}>Добавить новый кредит</Button>
            </Row>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Минимальная сумма</th>
                        <th>Максимальная сумма</th>
                        <th>Минимальный срок</th>
                        <th>Максимальный срок</th>
                        <th>Ставка</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {loan.types.map(type =>
                        <tr key={type.id}>
                            <td>{type.name}</td>
                            <td>{type.min_amount} BYN</td>
                            <td>{type.max_amount} BYN</td>
                            <td>{type.min_term} года/лет</td>
                            <td>{type.max_term} года/лет</td>
                            <td>{type.annual_interest_rate} %</td>
                            <td className='d-flex justify-content-center'>
                                <Button variant='outline-primary' onClick={() => { setSelectedLoan(type); setUpdateLoanVisible(true) }}>
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <CreateLoanType show={createLoanVisible} onHide={() => setCreateLoanVisible(false)} />
            <UpdateLoanType show={updateLoanVisible} onHide={() => setUpdateLoanVisible(false)} loan={selectedLoan} />
        </Container>
    );
})

export default AdminLoans;
