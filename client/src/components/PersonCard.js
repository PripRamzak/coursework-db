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
import { useNavigate } from 'react-router-dom';
import { PAYMENTS_ROUTE, PERSONAL_ACCOUNT_ROUTE } from '../utils/consts';
import CreateMoneyTransfer from './modals/CreateMoneyTransfer';


const PersonCard = observer(() => {
    const { account, card } = useContext(Context)

    const [selectedCard, setSelectedCard] = useState(null)
    const [alert, setAlert] = useState(0)

    const [cardDetailsVisible, setCardDetailsVisible] = useState(false)
    const [cardStatementVisible, setCardStatementVisible] = useState(false)
    const [moneyTransferVisible, setMoneyTransferVisible] = useState(false)
    const [cardRequestVisible, setCardRequestVisible] = useState(false)

    useEffect(() => {
        if (card.userCards)
            setSelectedCard(card.userCards[0])
    }, [card])

    const handleSelect = (selectedIndex) => {
        if (card.userCards)
            setSelectedCard(card.userCards[selectedIndex])
    }

    const getCardTypeImage = (cardTypeId) => {
        if (card.types.length == 0)
            return ''
        return process.env.REACT_APP_API_URL + card.types.find((type) => type.id === cardTypeId).img
    }

    return (
        <React.Fragment>
            {card.userCards.length === 0 ?
                <div className='mt-2 d-flex flex-column align-items-center'>
                    <h2 style={{ color: 'gray' }}>У вас нет карт</h2>
                    <Image className='mt-2' width={300} height={300} src={noCard} />
                    <Button className='mt-4' variant='outline-dark' style={{width: '100%'}} onClick={() => setCardRequestVisible(true)}>Оформить</Button>
                    <CreateCardRequest show={cardRequestVisible} onHide={() => setCardRequestVisible(false)} />
                </div>
                :
                <Row className='mt-4'>
                    <Col md={5}>
                        <Carousel interval={null} indicators={false} onSelect={handleSelect}>
                            {card.userCards.map(personCard =>
                                <Carousel.Item key={personCard.id}>
                                    <Image className='ms-3'
                                        height='300'
                                        width='500'
                                        src={getCardTypeImage(personCard.cardTypeId)} />
                                    <Carousel.Caption className='mb-5 d-flex justify-content-start'>
                                        <h2 style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>{Number(personCard.balance).toFixed(2)} BYN</h2>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </Col>
                    <Col>
                        <Row className='d-flex justify-content-center'>
                            <Button variant='outline-dark' onClick={() => setCardDetailsVisible(true)}>Реквизиты карты</Button>
                            <Button className='mt-4' variant='outline-dark' onClick={() => setCardStatementVisible(true)}>Выписка по карте</Button>
                            <Button className='mt-4' variant='outline-dark' onClick={() => setMoneyTransferVisible(true)}>Сделать перевод</Button>
                            <Button className='mt-4' variant='outline-dark' onClick={() => setCardRequestVisible(true)}>Оформить карту</Button>
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
            <CardDetails show={cardDetailsVisible} onHide={() => setCardDetailsVisible(false)} card={selectedCard} />
            {selectedCard &&
                <CardStatement show={cardStatementVisible} onHide={() => setCardStatementVisible(false)} cardId={selectedCard.id} />
            }
            <CreateMoneyTransfer show={moneyTransferVisible} onHide={() => setMoneyTransferVisible(false)} />
            <CreateCardRequest show={cardRequestVisible} onHide={() => setCardRequestVisible(false)} personId={account.personId} />
        </React.Fragment>
    );
})

export default PersonCard;
