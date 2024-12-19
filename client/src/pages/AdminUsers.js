import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { Context } from '..';
import { fetchCardTypes, fetchCards, fetchCardsCount } from '../http/cardApi';
import { observer } from 'mobx-react-lite';
import { changeRole, fetchPersons, fetchUsers } from '../http/userApi';
import { fetchPayments } from '../http/paymentApi';

const AdminUsers = observer(() => {
    const [users, setUsers] = useState([])
    const [workers, setWorkers] = useState([])
    const [userFullName, setUserFullName] = useState('')
    const [workerFullName, setWorkerFullName] = useState('')

    const getFullName = (person) => {
        return person.last_name + ' ' + person.first_name + ' ' + person.middle_name
    }

    const getDate = (timedate) => {
        const date = new Date(timedate)
        const formatedDate = new Intl.DateTimeFormat('ru', { day: 'numeric', year: 'numeric', month: 'long' }).format(date);
        return formatedDate;
    }

    const changeUserRole = async (accountId, role) => {
        await changeRole(accountId, role);
        fetchUsers('USER').then(data => setUsers(data))
        fetchUsers('WORKER').then(data => setWorkers(data))
    }

    useEffect(() => {
        fetchUsers('USER').then(data => setUsers(data))
        fetchUsers('WORKER').then(data => setWorkers(data))
    }, [])

    return (
        <Container>
            <h2 className='mt-2 text-center'>Сотрудники банка</h2>
            <Row>
                <Col md={3}>
                    <Form.Control
                        type="text"
                        value={workerFullName}
                        onChange={e => setWorkerFullName(e.target.value)}
                        placeholder='ФИО'
                    />
                </Col>
            </Row>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>ФИО сотрудника</th>
                        <th>Почта</th>
                        <th>Дата рождения</th>
                        <th>Пол</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {workers.filter(worker => getFullName(worker.person).toLowerCase().includes(workerFullName)).map(worker =>
                        <tr key={worker.id}>
                            <td>{getFullName(worker.person)}</td>
                            <td>{worker.email}</td>
                            <td>{getDate(worker.person.birth)}</td>
                            <td>{worker.person.sex}</td>
                            <td className='d-flex justify-content-center'>
                                <Button variant='outline-danger' onClick={() => changeUserRole(worker.id, 'USER')}>
                                    Лишить прав
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <h2 className='mt-3 text-center'>Пользователи банка</h2>
            <Row>
                <Col md={3}>
                    <Form.Control
                        type="text"
                        value={userFullName}
                        onChange={e => setUserFullName(e.target.value)}
                        placeholder='ФИО'
                    />
                </Col>
            </Row>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>ФИО сотрудника</th>
                        <th>Почта</th>
                        <th>Дата рождения</th>
                        <th>Пол</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.filter(user => getFullName(user.person).toLowerCase().includes(userFullName)).map(user =>
                        <tr key={user.id}>
                            <td>{getFullName(user.person)}</td>
                            <td>{user.email}</td>
                            <td>{getDate(user.person.birth)}</td>
                            <td>{user.person.sex}</td>
                            <td className='d-flex justify-content-center'>
                                <Button variant='outline-primary' onClick={() => changeUserRole(user.id, 'WORKER')}>
                                    Назначить сотрудником
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
})

export default AdminUsers;
