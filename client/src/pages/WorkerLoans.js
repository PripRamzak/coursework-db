import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { fetchPersons } from '../http/userApi';
import { fetchLoanTypes, fetchLoans, fetchLoansCount } from '../http/loanApi';
import { Context } from '..';

const WorkerLoans = observer(() => {
    const {loan} = useContext(Context)

    const [persons, setPersons] = useState([])
    const [loanCount, setLoanCount] = useState([])
    const [selectedType, setSelectedType] = useState({})

    const getFullName = (personId) => {
        if (persons.length === 0)
            return '';
        const person = persons.find((person) => person.id == personId);
        return person.last_name + ' ' + person.first_name + ' ' + person.middle_name
    }

    const getLoanTypeName = (loanTypeId) => {
        if (loan.types.length === 0)
            return '';
        return loan.types.find((type) => type.id == loanTypeId).name
    }

    const getDate = (timedate) => {
        let date = new Date(timedate);
        const year = new Intl.DateTimeFormat('ru', { year: 'numeric', month: 'long' }).format(date);
        return year;
    }

    const handleSelectType = (type) => {
        if (type.id === selectedType.id)
            setSelectedType({})
        else
            setSelectedType(type)
    }

    useEffect(() => {
        fetchPersons().then(data => setPersons(data))
        fetchLoansCount().then(data => setLoanCount(data))
    }, [])

    useEffect(() => {
        fetchLoans(null, selectedType.id).then(data => loan.setUserLoans(data))
    }, [selectedType])

    return (
        <Container>
            <h2 className='mt-2 text-center'>Кредиты клиентов</h2>
            <Row className="mt-3 d-flex">
                {loan.types.map(type =>
                    <Col key={type.id} md="3">
                        <Card
                            style={{ cursor: 'pointer' }}
                            className="text-center p-2"
                            onClick={() => handleSelectType(type)}
                            border={type.id === selectedType.id ? 'dark' : 'gray'}>
                            {type.name}
                        </Card>
                    </Col>
                )}
            </Row>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>ФИО клиента</th>
                        <th>Кредит</th>
                        <th>Срок кредита</th>
                        <th>Оставшаяся сумма выплат</th>
                    </tr>
                </thead>
                <tbody>
                    {loan.userLoans.map(loan =>
                        <tr key={loan.id}>
                            <td>{getFullName(loan.personId)}</td>
                            <td>{getLoanTypeName(loan.loanTypeId)}</td>
                            <td>{getDate(loan.expire_date)}</td>
                            <td>{Number(loan.amount).toFixed(2)}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <h3 className='mt-2 text-center'>Статистика</h3>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>Кредиты</th>
                        <th>Количество кредитов</th>
                    </tr>
                </thead>
                <tbody>
                    {loanCount.map(card =>
                        <tr key={card.id}>
                            <td>{getLoanTypeName(card.loanTypeId)}</td>
                            <td>{(card.count)}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
})

export default WorkerLoans;
