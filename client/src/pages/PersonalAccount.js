import React, { useContext, useEffect, useState } from 'react';
import { Button, Carousel, Col, Container, Image, Row, Spinner, Table } from 'react-bootstrap';
import mcDuck from '../assets/mc-duck.png';
import noCard from '../assets/no_card.png';
import { Context } from '..';
import { fetchCards, fetchCardRequests, fetchCardTypes } from '../http/cardApi';
import { observer } from 'mobx-react-lite';
import CreateCardRequest from '../components/modals/CreateCardRequest';

const PersonalAccount = observer(() => {
    const { account, card } = useContext(Context)
    const [cardRequestVisible, setCardRequestVisible] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCards(account.personId).then(data => card.setCards(data))
        fetchCardTypes().then(data => card.setTypes(data))
        fetchCardRequests(account.personId).then(data => card.setRequests(data)).finally(() => setLoading(false))
    }, [account])

    if (loading) {
        return <Spinner animation={"grow"}></Spinner>
    }

    const getCardTypeName = (cardTypeId) => {
        return card.types.find((type) => type.id == cardTypeId).name
    }

    return (
        <Container>
            <h1 className='mt-4'>
                Карты
            </h1>
            {card.cards.length === 0 ?
                <div className='mt-2'>
                    <h3 style={{ color: 'gray' }}>У вас нет карт</h3>
                    <Image className='mt-2' width={300} height={300} src={noCard} />
                    <Button className='mt-3 ms-5 d-flex' variant='outline-dark' onClick={() => setCardRequestVisible(true)}>Оформить</Button>
                    <CreateCardRequest show={cardRequestVisible} onHide={() => setCardRequestVisible(false)} personId={account.personId} />
                </div>
                :
                <Row>
                    <Col md={6}>
                        <Carousel data-bs-theme='dark'>
                            <Carousel.Item>
                                <Row>
                                    <Col xs={12} sm={4} md={4}>
                                        <Image height={300} src={mcDuck} />
                                    </Col>
                                </Row>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Row>
                                    <Col xs={12} sm={4} md={4}>
                                        <Image height={300} src={mcDuck} />
                                    </Col>
                                </Row>
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                </Row>
            }
            <h1 className='mt-4'>
                Заявки
            </h1>
            {card.requests.length === 0 ?
                <div className='mt-2'>
                    <h3 style={{ color: 'gray' }}>У вас нет заявок</h3>
                </div>
                :
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Карта</th>
                            <th>Дата заявки</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {card.requests.map(request =>
                                <>
                                    <td>{getCardTypeName(request.cardTypeId)}</td>
                                    <td>{request.date}</td>
                                    <td>{request.status}</td>
                                </>
                            )}
                        </tr>
                    </tbody>
                </Table>
            }
        </Container >
    );
})

export default PersonalAccount;
