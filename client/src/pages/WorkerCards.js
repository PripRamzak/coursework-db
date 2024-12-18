import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Context } from '..';
import { fetchCardTypes, fetchCards, fetchCardsCount } from '../http/cardApi';
import { observer } from 'mobx-react-lite';
import { fetchPersons } from '../http/userApi';
import { fetchPayments } from '../http/paymentApi';

const WorkerCards = observer(() => {
    const { card } = useContext(Context)

    const [persons, setPersons] = useState([])
    const [cardCount, setCardCount] = useState([])
    const [selectedType, setSelectedType] = useState({})

    const getFullName = (personId) => {
        if (persons.length === 0)
            return '';
        const person = persons.find((person) => person.id == personId);
        return person.last_name + ' ' + person.first_name + ' ' + person.middle_name
    }

    const getCardTypeName = (cardTypeId) => {
        if (card.types.length === 0)
            return '';
        return card.types.find((type) => type.id == cardTypeId).name
    }

    const handleSelectType = (type) => {
        if (type.id === selectedType.id)
            setSelectedType({})
        else
            setSelectedType(type)
    }

    useEffect(() => {
        fetchPersons().then(data => setPersons(data))
        fetchCardsCount().then(data => setCardCount(data))
    }, [])

    useEffect(() => {
        fetchCards(null, selectedType.id).then(data => card.setUserCards(data))
    }, [selectedType])

    return (
        <Container>
            <h2 className='mt-2 text-center'>Карты клиентов</h2>
            <Row className="mt-3 d-flex">
                {card.types.map(type =>
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
                        <th>Карта</th>
                        <th>Номер карты</th>
                    </tr>
                </thead>
                <tbody>
                    {card.userCards.map(card =>
                        <tr key={card.id}>
                            <td>{getFullName(card.personId)}</td>
                            <td>{getCardTypeName(card.cardTypeId)}</td>
                            <td>{card.number.replace(/(\d{4})(?=\d)/g, '$1 ')}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <h3 className='mt-2 text-center'>Статистика</h3>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>Карта</th>
                        <th>Количество карт</th>
                    </tr>
                </thead>
                <tbody>
                    {cardCount.map(card =>
                        <tr key={card.id}>
                            <td>{getCardTypeName(card.cardTypeId)}</td>
                            <td>{(card.count)}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
})

export default WorkerCards;
