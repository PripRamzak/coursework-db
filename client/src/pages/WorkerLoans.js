import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { fetchPersons } from '../http/userApi';
import { fetchLoanTypes, fetchLoans, fetchLoansCount } from '../http/loanApi';

const WorkerLoans = observer(() => {
    const [loans, setLoans] = useState([])
    const [loanTypes, setLoanTypes] = useState([])
    const [loanCount, setLoanCount] = useState([])
    const [persons, setPersons] = useState([])
    const [selectedType, setSelectedType] = useState({})

    useEffect(() => {
        fetchPersons().then(data => setPersons(data))
        fetchLoanTypes().then(data => setLoanTypes(data))
        fetchLoansCount().then(data => setLoanCount(data))
    }, [])

    useEffect(() => {
        fetchLoans(null, selectedType.id).then(data => setLoans(data))
    }, [selectedType])

    const getPersonLastName = (personId) => {
        if (persons.length === 0)
            return '';
        return persons.find((person) => person.id == personId).last_name
    }

    const getPersonFirstName = (personId) => {
        if (persons.length === 0)
            return '';
        return persons.find((person) => person.id == personId).first_name
    }

    const getPersonMiddleName = (personId) => {
        if (persons.length === 0)
            return '';
        return persons.find((person) => person.id == personId).middle_name
    }

    const getLoanTypeName = (loanTypeId) => {
        if (loanTypes.length === 0)
            return '';
        return loanTypes.find((type) => type.id == loanTypeId).name
    }

    return (
        <Container>
            <h2 className='mt-2 text-center'>Кредиты клиентов</h2>
            <Row className="mt-3 d-flex">
                {loanTypes.map(type =>
                    <Col key={type.id} md="3">
                        <Card
                            style={{ cursor: 'pointer' }}
                            className="text-center p-2"
                            onClick={() => setSelectedType(type)}
                            border={type.id === selectedType.id ? 'dark' : 'gray'}>
                            {type.name}
                        </Card>
                    </Col>
                )}
            </Row>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>Фамиия клиента</th>
                        <th>Имя клиента</th>
                        <th>Отчество клиента</th>
                        <th>Кредит</th>
                        <th>Срок кредита</th>
                        <th>Оставшаяся сумма выплат</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map(loan =>
                        <tr key={loan.id}>
                            <td>{getPersonLastName(loan.personId)}</td>
                            <td>{getPersonFirstName(loan.personId)}</td>
                            <td>{getPersonMiddleName(loan.personId)}</td>
                            <td>{getLoanTypeName(loan.loanTypeId)}</td>
                            <td>{loan.expire_date}</td>
                            <td>{Number(loan.amount).toFixed(2)}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <h2 className='mt-5 text-center'>Кредиты</h2>
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
