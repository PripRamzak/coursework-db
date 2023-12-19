import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Context } from '..';
import { fetchCardTypes, fetchCards } from '../http/cardApi';
import { observer } from 'mobx-react-lite';
import { fetchPersons } from '../http/userApi';
import { fetchPayments } from '../http/paymentApi';

const WorkerCards = observer(() => {
    const { card } = useContext(Context)
    const [persons, setPersons] = useState([])
    const [payments, setPayments] = useState([])
    const [selectedType, setSelectedType] = useState({})

    useEffect(() => {
        fetchPersons().then(data => setPersons(data))
        fetchPayments().then(data => setPayments(data))
        fetchCardTypes().then(data => card.setTypes(data))
    }, [])

    useEffect(() => {
        fetchCards(null, selectedType.id).then(data => card.setCards(data))
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

    const getCardTypeName = (cardTypeId) => {
        if (card.types.length === 0)
            return '';
        return card.types.find((type) => type.id == cardTypeId).name
    }

    const getAmountOfCharges = (cardId) => {
        let amount = 0
        for (let i = 0; i < payments.length; i++) {
            if (payments[i].cardId == cardId && payments[i].type == 'Зачисление') {
                amount += payments[i].amount
            }
        }

        return amount
    }

    const getAmountOfPayments = (cardId) => {
        let amount = 0
        for (let i = 0; i < payments.length; i++) {
            if (payments[i].cardId == cardId && payments[i].type == 'Оплата') {
                amount += payments[i].amount
            }
        }

        return amount
    }

    return (
        <Container>
            <Row className="mt-3 d-flex">
                {card.types.map(type =>
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
                        <th>Карта</th>
                        <th>Номер карты</th>
                        <th>Сумма зачислений</th>
                        <th>Сумма платежей</th>
                    </tr>
                </thead>
                <tbody>
                    {card.cards.map(card =>
                        <tr key={card.id}>
                            <td>{getPersonLastName(card.personId)}</td>
                            <td>{getPersonFirstName(card.personId)}</td>
                            <td>{getPersonMiddleName(card.personId)}</td>
                            <td>{getCardTypeName(card.cardTypeId)}</td>
                            <td>{card.number}</td>
                            <td>{getAmountOfCharges(card.id)}</td>
                            <td>{getAmountOfPayments(card.id)}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
})

export default WorkerCards;
