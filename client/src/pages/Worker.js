import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { fetchPersons } from '../http/userApi';
import { changeCardRequestStatus, createCard, fetchCardRequests, fetchCardTypes } from '../http/cardApi';
import { changeLoanRequestStatus, createLoan, fetchLoanRequests, fetchLoanTypes } from '../http/loanApi';

function Worker() {
    const [persons, setPersons] = useState([])
    const [cardTypes, setCardTypes] = useState([])
    const [cardRequests, setCardRequests] = useState([])
    const [loanTypes, setLoanTypes] = useState([])
    const [loanRequests, setLoanRequests] = useState([])

    useEffect(() => {
        fetchCardRequests().then(data => setCardRequests(data))
        fetchCardTypes().then(data => setCardTypes(data))
        fetchLoanRequests().then(data => setLoanRequests(data))
        fetchLoanTypes().then(data => setLoanTypes(data))
        fetchPersons().then(data => setPersons(data))
    }, [])

    console.log(persons)
    console.log(cardRequests)
    console.log(loanRequests)

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

    const getLoanTypeName = (loanTypeId) => {
        if (loanTypes.length === 0)
            return ''
        return loanTypes.find((type) => type.id == loanTypeId).name
    }

    const acceptCardRequest = async (requestId, personId, cardTypeId) => {
        await changeCardRequestStatus(requestId, 'Одобрено')
        fetchCardRequests().then(data => setCardRequests(data))
        createCard(personId, cardTypeId)
    }

    const declineCardRequest = async (requestId) => {
        await changeCardRequestStatus(requestId, 'Отказано')
        fetchCardRequests().then(data => setCardRequests(data))

    }

    const acceptLoanRequest = async (requestId) => {
        await changeLoanRequestStatus(requestId, 'Одобрено')
        fetchLoanRequests().then(data => setLoanRequests(data))
        createLoan(requestId)
    }

    const declineLoanRequest = async (requestId) => {
        await changeLoanRequestStatus(requestId, 'Отказано')
        fetchLoanRequests().then(data => setLoanRequests(data))
    }

    return (
        <Container>
            <h2 className='mt-3 d-flex justify-content-center'>Заявки на карты</h2>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>Фамиия клиента</th>
                        <th>Имя клиента</th>
                        <th>Отчество клиента</th>
                        <th>Карта</th>
                        <th>Дата заявки</th>
                        <th>Статус</th>
                        <th>Действие</th>
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
                            {request.status === 'Обрабатывается' ?
                                <td width='250'>
                                    <Button variant='outline-danger' onClick={() => declineCardRequest(request.Id)}>Отклонить</Button>
                                    <Button className='ms-3'
                                        variant='outline-success'
                                        onClick={() => acceptCardRequest(request.id, request.personId, request.cardTypeId)}>
                                        Одобрить
                                    </Button>
                                </td>
                                :
                                <td>
                                    <Button variant='outline-danger'>Удалить</Button>
                                </td>
                            }
                        </tr>
                    )}
                </tbody>
            </Table>
            <h2 className='mt-3 d-flex justify-content-center'>Заявки на кредиты</h2>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>Фамиия клиента</th>
                        <th>Имя клиента</th>
                        <th>Отчество клиента</th>
                        <th>Кредит</th>
                        <th>Сумма кредита</th>
                        <th>Срок кредита</th>
                        <th>Справка о доходах</th>
                        <th>Дата заявки</th>
                        <th>Статус</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {loanRequests.map(request =>
                        <tr key={request.id}>
                            <td>{getPersonLastName(request.personId)}</td>
                            <td>{getPersonFirstName(request.personId)}</td>
                            <td>{getPersonMiddleName(request.personId)}</td>
                            <td>{getLoanTypeName(request.loanTypeId)}</td>
                            <td>{request.amount}</td>
                            <td>{request.years}</td>
                            <td>
                                <Button variant={'light'} href={process.env.REACT_APP_API_URL + request.file_document} target='_blank' rel='noreferrer'>Посмотреть</Button>
                            </td>
                            <td>{request.date}</td>
                            <td>{request.status}</td>
                            {request.status === 'Обрабатывается' ?
                                <td width='250'>
                                    <Button variant='outline-danger' onClick={() => declineLoanRequest(request.Id)}>Отклонить</Button>
                                    <Button className='ms-3'
                                        variant='outline-success'
                                        onClick={() => acceptLoanRequest(request.id, request.personId, request.cardTypeId)}>
                                        Одобрить
                                    </Button>
                                </td>
                                :
                                <td>
                                    <Button variant='outline-danger'>Удалить</Button>
                                </td>
                            }
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default Worker;
