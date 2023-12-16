import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { fetchPersons } from '../http/userApi';
import { changeStatus, createCard, fetchCardRequests, fetchCardTypes } from '../http/cardApi';

function Worker() {
    const [persons, setPersons] = useState([])
    const [cardTypes, setCardTypes] = useState([])
    const [cardRequests, setCardRequests] = useState([])

    useEffect(() => {
        fetchCardRequests().then(data => setCardRequests(data))
        fetchCardTypes().then(data => setCardTypes(data))
        fetchPersons().then(data => setPersons(data))
    }, [])

    console.log(persons)

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

    const getCardTypeName = (cardTypeId) => {
        if (cardTypes.length === 0)
            return '';
        return cardTypes.find((type) => type.id == cardTypeId).name
    }

    const acceptRequest = async (requestId, personId, cardTypeId) => {
        await changeStatus(requestId, 'Одобрено')
        fetchCardRequests().then(data => setCardRequests(data))
        createCard(personId, cardTypeId)
    }

    const declineRequest = (requestId) => {
        changeStatus(requestId, 'Отказано')
    }

    return (
        <Container>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>Фамиия клиента</th>
                        <th>Имя клиента</th>
                        <th>Отчество клиента</th>
                        <th>Карта</th>
                        <th>Дата заявки</th>
                        <th>Статус</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cardRequests.map(request =>
                        <tr key={request.id}>
                            <td>{getPersonLastName(request.personId)}</td>
                            <td>{getPersonFirstName(request.personId)}</td>
                            <td>{getPersonMiddleName(request.personId)}</td>
                            <td>{getCardTypeName(request.cardTypeId)}</td>
                            <td>{request.date}</td>
                            <td>{request.status}</td>
                            {request.status === 'Обрабатывается' &&
                                <>
                                    <td width='250'>
                                        <Button variant='outline-danger' onClick={() => declineRequest(request.Id)}>Отклонить</Button>
                                        <Button className='ms-3'
                                            variant='outline-success'
                                            onClick={() => acceptRequest(request.id, request.personId, request.cardTypeId)}>
                                            Одобрить
                                        </Button>
                                    </td>
                                </>
                            }
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default Worker;
