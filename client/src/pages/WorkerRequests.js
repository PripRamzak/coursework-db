import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { fetchPersons } from '../http/userApi';
import { changeCardRequestStatus, createCard, deleteCardRequest, fetchCardRequests, fetchCardTypes } from '../http/cardApi';
import { changeLoanRequestStatus, createLoan, deleteLoanRequest, fetchLoanRequests, fetchLoanTypes } from '../http/loanApi';
import { Context } from '..';

function WorkerRequests() {
    const {account, card, loan} = useContext(Context)

    const [persons, setPersons] = useState([])
    const [cardRequests, setCardRequests] = useState([])
    const [loanRequests, setLoanRequests] = useState([])

    const getFullName = (personId) => {
        if (persons.length === 0)
            return '';
        const person = persons.find((person) => person.id == personId);
        return person.last_name + ' ' + person.first_name + ' ' + person.middle_name
    }

    const getDate = (timedate) => {
        let date = new Date(timedate);
        const year = new Intl.DateTimeFormat('ru', { day: 'numeric', year: 'numeric', month: 'long' }).format(date);
        return year;
    }

    const getCardTypeName = (cardTypeId) => {
        if (card.types.length === 0)
            return '';
        return card.types.find((type) => type.id == cardTypeId).name
    }

    const getLoanTypeName = (loanTypeId) => {
        if (loan.types.length === 0)
            return ''
        return loan.types.find((type) => type.id == loanTypeId).name
    }

    const calculatePayment = (amount, years, loanTypeId) => {
        if (loan.types.length === 0)
            return ''
        const annualInterestRate = loan.types.find(type => type.id == loanTypeId).annual_interest_rate
        const payment = amount * (annualInterestRate / (100 * 12) / (1 - Math.pow((1 + annualInterestRate / (100 * 12)), -1 * years * 12)))
        return payment.toFixed(2)
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

    useEffect(() => {
        fetchPersons().then(data => setPersons(data))
        fetchCardRequests().then(data => setCardRequests(data))
        fetchLoanRequests().then(data => setLoanRequests(data))
    }, [])

    return (
        <Container>
            <h2 className='mt-3 text-center'>Заявки на карты</h2>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>ФИО клиента</th>
                        <th>Карта</th>
                        <th>Дата заявки</th>
                        <th>Статус</th>
                        {cardRequests.filter(request => request.personId !== account.personId).find(request => request.status === 'Обрабатывается') &&
                            <th></th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {cardRequests.filter(request => request.personId !== account.personId).map(request =>
                        <tr key={request.id}>
                            <td>{getFullName(request.personId)}</td>
                            <td>{getCardTypeName(request.cardTypeId)}</td>
                            <td>{getDate(request.date)}</td>
                            <td>{request.status}</td>
                            {request.status === 'Обрабатывается' &&
                                <td width='250'>
                                    <Button variant='outline-danger' onClick={() => declineCardRequest(request.id)}>Отклонить</Button>
                                    <Button className='ms-3'
                                        variant='outline-success'
                                        onClick={() => acceptCardRequest(request.id, request.personId, request.cardTypeId)}>
                                        Одобрить
                                    </Button>
                                </td>
                            }
                        </tr>
                    )}
                </tbody>
            </Table>
            <h2 className='mt-3 text-center'>Заявки на кредиты</h2>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>ФИО клиента</th>
                        <th>Кредит</th>
                        <th>Сумма кредита</th>
                        <th>Срок кредита</th>
                        <th>Ежемесячный платеж</th>
                        <th>Справка о доходах</th>
                        <th>Дата заявки</th>
                        <th>Статус</th>
                        {loanRequests.find(request => request.status === 'Обрабатывается') &&
                            <th></th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {loanRequests.map(request =>
                        <tr key={request.id}>
                            <td>{getFullName(request.personId)}</td>
                            <td>{getLoanTypeName(request.loanTypeId)}</td>
                            <td>{request.amount}</td>
                            <td>{request.years}</td>
                            <td>{calculatePayment(request.amount, request.years, request.loanTypeId)}</td>
                            <td>
                                <Button variant={'light'} href={process.env.REACT_APP_API_URL + request.file_document} target='_blank' rel='noreferrer'>Посмотреть</Button>
                            </td>
                            <td>{getDate(request.date)}</td>
                            <td>{request.status}</td>
                            {request.status === 'Обрабатывается' &&
                                <td width='250'>
                                    <Button variant='outline-danger' onClick={() => declineLoanRequest(request.Id)}>Отклонить</Button>
                                    <Button className='ms-3'
                                        variant='outline-success'
                                        onClick={() => acceptLoanRequest(request.id, request.personId, request.cardTypeId)}>
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

export default WorkerRequests;
