import React, { useContext, useEffect, useState, } from 'react';
import { Button, Carousel, Col, Image, Modal, Row } from 'react-bootstrap';
import noCard from '../assets/no_card.png';
import { Context } from '..';
import { fetchCards } from '../http/cardApi';
import { observer } from 'mobx-react-lite';
import CreateCardRequest from '../components/modals/CreateCardRequest';
import CardDetails from './modals/CardDetails';
import CreatePayment from './modals/CreatePayment';
import CardStatement from './modals/CardStatement';
import { fetchLoans, payLoan } from '../http/loanApi';
import { createPayment } from '../http/paymentApi';


const PersonCard = observer(() => {
    const { account, card } = useContext(Context)
    const [cardRequestVisible, setCardRequestVisible] = useState(false)
    const [cardDetailsVisible, setCardDetailsVisible] = useState(false)
    const [paymentVisible, setPaymentsVisible] = useState(false)
    const [loans, setLoans] = useState([])
    const [cardStatementVisible, setCardStatementVisible] = useState(false)
    const [index, setIndex] = useState(0)
    const [alert, setAlert] = useState(0)

    useEffect(() => {
        fetchCards(account.personId).then(data => card.setCards(data))
    }, [account, paymentVisible])

    useEffect(() => {
        fetchLoans(account.personId).then(data => setLoans(data))
    }, [account])

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex)
    }

    const getCardTypeImage = (cardTypeId) => {
        if (card.types.length == 0)
            return ''
        return process.env.REACT_APP_API_URL + card.types.find((type) => type.id === cardTypeId).img
    }

    const payLoanPayment = async (loan, cardId) => {
        try {
            await createPayment(loan.payment, '5129', cardId)
        }
        catch (e) {
            setAlert(true)
            return
        }

        await payLoan(loan.id)
        fetchCards(account.personId).then(data => card.setCards(data))
    }

    return (
        <React.Fragment>
            <h1 className='mt-4'>
                Карты
            </h1>
            {card.cards.length === 0 ?
                <div className='mt-2'>
                    <h3 style={{ color: 'gray' }}>У вас нет карт</h3>
                    <Image className='mt-2' width={200} height={200} src={noCard} />
                    <Button className='mt-3 d-flex' variant='outline-dark' onClick={() => setCardRequestVisible(true)}>Оформить</Button>
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
                            <Button variant='outline-dark' onClick={() => setCardDetailsVisible(true)}>Реквизиты карты</Button>
                            <CardDetails show={cardDetailsVisible} onHide={() => setCardDetailsVisible(false)} card={card.cards[index]} />
                            <Button className='mt-4' variant='outline-dark' onClick={() => setPaymentsVisible(true)}>Совершить платеж</Button>
                            <CreatePayment show={paymentVisible} onHide={() => setPaymentsVisible(false)} cardId={card.cards[index].id} />
                            <Button className='mt-4' variant='outline-dark' onClick={() => setCardStatementVisible(true)}>Выписка по карте</Button>
                            <Button className='mt-4' variant='outline-dark' onClick={() => setCardRequestVisible(true)}>Оформить карту</Button>
                            <CreateCardRequest show={cardRequestVisible} onHide={() => setCardRequestVisible(false)} personId={account.personId} />
                            <CardStatement show={cardStatementVisible} onHide={() => setCardStatementVisible(false)} cardId={card.cards[index].id} />
                            {loans.length != 0 &&
                                <Button className='mt-4' variant='outline-dark' onClick={() => payLoanPayment(loans[0], card.cards[index].id)}>Погасить кредит</Button>
                            }
                            <Modal
                                show={alert}
                                size="sm"
                                centered>
                                <Modal.Header>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        Недостаточно средств
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p className='text-center'>У вас недостаточно средств</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="outline-danger" onClick={() => setAlert(false)}>Закрыть</Button>
                                </Modal.Footer>
                            </Modal>
                        </Row>
                    </Col>
                </Row>
            }
        </React.Fragment>
    );
})

export default PersonCard;
