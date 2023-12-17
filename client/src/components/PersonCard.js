import React, { useContext, useEffect, useState, } from 'react';
import { Button, Carousel, Col, Image, Row } from 'react-bootstrap';
import noCard from '../assets/no_card.png';
import { Context } from '..';
import { fetchCards } from '../http/cardApi';
import { observer } from 'mobx-react-lite';
import CreateCardRequest from '../components/modals/CreateCardRequest';
import CardDetails from './modals/CardDetails';
import CreatePayment from './modals/CreatePayment';
import CardStatement from './modals/CardStatement';


const PersonCard = observer(() => {
    const { account, card } = useContext(Context)
    const [cardRequestVisible, setCardRequestVisible] = useState(false)
    const [cardDetailsVisible, setCardDetailsVisible] = useState(false)
    const [paymentVisible, setPaymentsVisible] = useState(false)
    const [cardStatementVisible, setCardStatementVisible] = useState(false)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        fetchCards(account.personId).then(data => card.setCards(data))
    }, [account, paymentVisible])

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex)
    }

    const getCardTypeImage = (cardTypeId) => {
        if (card.types.length == 0)
            return ''
        return process.env.REACT_APP_API_URL + card.types.find((type) => type.id === cardTypeId).img
    }

    return (
        <React.Fragment>
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
                    <Col md={5}>
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            {card.cards.map(personCard =>
                                <Carousel.Item key={personCard.id}>
                                    <Image className='ms-3'
                                        height='300'
                                        width='500'
                                        src={getCardTypeImage(personCard.cardTypeId)} />
                                    <Carousel.Caption className='mb-5 d-flex justify-content-start'>
                                        <h2 style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>{personCard.balance} BYN</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </Col>
                    <Col>
                        <Row>
                            <Button variant='outline-dark' onClick={() => setCardDetailsVisible(true)}>
                                Реквизиты карты
                            </Button>
                            <CardDetails show={cardDetailsVisible} onHide={() => setCardDetailsVisible(false)} card={card.cards[index]} />
                            <Button className='mt-4' variant='outline-dark' onClick={() => setPaymentsVisible(true)}>
                                Совершить платеж
                            </Button>
                            <CreatePayment show={paymentVisible} onHide={() => setPaymentsVisible(false)} cardId={card.cards[index].id} />
                            <Button className='mt-4' variant='outline-dark' onClick={() => setCardStatementVisible(true)}>
                                Выписка по карте
                            </Button>
                            <CardStatement show={cardStatementVisible} onHide={() => setCardStatementVisible(false)} cardId={card.cards[index].id} />
                        </Row>
                    </Col>
                </Row>
            }
        </React.Fragment>
    );
})

export default PersonCard;
