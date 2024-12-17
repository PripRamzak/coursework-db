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


const PersonCard = observer(() => {
    const { account, card } = useContext(Context)
    const navigate = useNavigate()

    const [loans, setLoans] = useState([])
    const [selectedCard, setSelectedCard] = useState(null)
    const [alert, setAlert] = useState(0)

    const [cardDetailsVisible, setCardDetailsVisible] = useState(false)
    const [cardStatementVisible, setCardStatementVisible] = useState(false)
    const [cardRequestVisible, setCardRequestVisible] = useState(false)

    useEffect(() => {
        fetchCards(account.personId).then(data => card.setCards(data))
        fetchLoans(account.personId).then(data => setLoans(data))
    }, [account])

    useEffect(() => {
        setSelectedCard(card.cards[0])
    }, [card])

    const handleSelect = (selectedIndex) => {
        if (card.cards)
            setSelectedCard(card.cards[selectedIndex])
    }

    const getCardTypeImage = (cardTypeId) => {
        if (card.types.length == 0)
            return ''
        return process.env.REACT_APP_API_URL + card.types.find((type) => type.id === cardTypeId).img
    }

    const payLoanPayment = async (loan, cardId) => {
        if (card.id) {
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
    }

    return (
        <React.Fragment>
            {card.cards.length === 0 ?
                <div className='mt-2'>
                    <h3 style={{ color: 'gray' }}>У вас нет карт</h3>
                    <Image className='mt-2' width={200} height={200} src={noCard} />
                    <Button className='mt-3 d-flex' variant='outline-dark' onClick={() => setCardRequestVisible(true)}>Оформить</Button>
                    <CreateCardRequest show={cardRequestVisible} onHide={() => setCardRequestVisible(false)} personId={account.personId} />
                </div>
                :
                <Row className='mt-4'>
                    <Col md={5}>
                        <Carousel interval={null} indicators={false} onSelect={handleSelect}>
                            {card.cards.map(personCard =>
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
                            <Button className='mt-4' variant='outline-dark' onClick={() => setCardRequestVisible(true)}>Оформить карту</Button>
                            {loans.length != 0 &&
                                <Button className='mt-4' variant='outline-dark' onClick={() => payLoanPayment(loans[0], selectedCard.id)}>Погасить кредит</Button>
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
            <CardDetails show={cardDetailsVisible} onHide={() => setCardDetailsVisible(false)} card={selectedCard} />
            {selectedCard &&
                <CardStatement show={cardStatementVisible} onHide={() => setCardStatementVisible(false)} cardId={selectedCard.id} />
            }
            <CreateCardRequest show={cardRequestVisible} onHide={() => setCardRequestVisible(false)} personId={account.personId} />
        </React.Fragment>
    );
})

export default PersonCard;
