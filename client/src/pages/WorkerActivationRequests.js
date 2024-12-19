import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { activation, changeActivationRequestStatus, createPerson, fetchActivationRequests, fetchPersons } from '../http/userApi';

function WorkerActivationRequests() {
    const [activationRequests, setActivationRequests] = useState([])

    const getFullName = (activationRequest) => {
        return activationRequest.last_name + ' ' + activationRequest.first_name + ' ' + activationRequest.middle_name
    }

    const getDate = (timedate) => {
        let date = new Date(timedate);
        const year = new Intl.DateTimeFormat('ru', { day: 'numeric', year: 'numeric', month: 'long' }).format(date);
        return year;
    }

    const acceptActivationRequest = async (request) => {
        createPerson(request).then(data => activation(request.accountId, data.id))
        await changeActivationRequestStatus(request.id, 'Одобрено')
        fetchActivationRequests().then(data => setActivationRequests(data))
    }

    const declineActivationRequest = async (requestId) => {
        await changeActivationRequestStatus(requestId, 'Отказано')
        fetchActivationRequests().then(data => setActivationRequests(data))
    }

    useEffect(() => {
        fetchActivationRequests().then(data => setActivationRequests(data))
    }, [])

    return (
        <Container>
            <h2 className='mt-3 text-center'>Запросы на активацию</h2>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>ФИО клиента</th>
                        <th>Дата рождения</th>
                        <th>Пол</th>
                        <th>Идентификационный номер </th>
                        <th>Дата</th>
                        <th>Статус</th>
                        {activationRequests.find(request => request.status === 'Обрабатывается') &&
                            <th></th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {activationRequests.map(request =>
                        <tr key={request.id}>
                            <td>{getFullName(request)}</td>
                            <td>{getDate(request.birth)}</td>
                            <td>{request.sex}</td>
                            <td>{request.ident_number}</td>
                            <td>{getDate(request.createdAt)}</td>
                            <td>{request.status}</td>
                            {request.status === 'Обрабатывается' &&
                                <td width='250'>
                                    <Button variant='outline-danger' onClick={() => declineActivationRequest(request.id)}>Отклонить</Button>
                                    <Button className='ms-3'
                                        variant='outline-success'
                                        onClick={() => acceptActivationRequest(request)}>
                                        Одобрить
                                    </Button>
                                </td>
                            }
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default WorkerActivationRequests;
