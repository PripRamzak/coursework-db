import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { createPayment, createUserPayment } from '../../http/paymentApi';
import { Context } from '../..';
import { fetchCards } from '../../http/cardApi';

function CreateUserPayment({ show, onHide, payment }) {
    const { account, card } = useContext(Context)

    const [cardId, setCardId] = useState(0)
    const [amount, setAmount] = useState('')
    const [data, setData] = useState([])
    const [balance, setBalance] = useState(null)
    const [alert, setAlert] = useState('')

    const regexAmount = /^\d*\.?\d{0,2}$/

    const getPersonCardName = (personCard) => {
        const cardName = card.types.find(type => type.id === personCard.cardTypeId).name;
        return cardName + ' ' + personCard.number.replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    const updateData = (idx, value) => {
        setData(data.map((d, index) => index === idx ? value : d))
    }

    const updateAmount = (amount) => {
        if (regexAmount.test(amount) || amount === '')
            setAmount(amount);
    }

    const addUserPayment = async () => {
        setAlert('')
        try {
            await createUserPayment(amount, data, cardId, payment.id);
        }
        catch (e) {
            console.log(e)
            setAlert(e.response.data.message)
            return
        }
        fetchCards(account.personId).then(data => card.setCards(data))
        setAmount(0)
        setData([])
        onHide()
    }

    useEffect(() => {
        if (payment)
            setData(Array(payment.parameters.length).fill(''))
    }, [payment])

    useEffect(() => {
        if (card)
            if (card.cards)
                setCardId(card.cards[0].id)
    }, [card])

    useEffect(() => {
        if (cardId !== 0)
            setBalance(card.cards?.find(personCard => personCard.id == cardId).balance)
    }, [cardId])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            {payment ? (
                <>
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {payment.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {payment.parameters.map((parameter, index) => (
                                <Form.Control className='mt-2' value={data[index]} onChange={e => updateData(index, e.target.value)} placeholder={parameter} />
                            ))
                            }
                            {balance !== null &&
                                <Form.Label className='mt-2'>{`Баланс: ${balance}`}</Form.Label>
                            }
                            <Form.Select onChange={e => setCardId(e.target.value)}>
                                {card.cards.map(personCard =>
                                    <option key={personCard.id} value={personCard.id}>{getPersonCardName(personCard)}</option>
                                )
                                }
                            </Form.Select>
                            <Form.Control className='mt-3' value={amount} onChange={e => updateAmount(e.target.value)} placeholder='Сумма платежа' />
                        </Form>
                        {alert &&
                            <Alert className='mt-3 p-1 text-center' variant='danger'>{alert}</Alert>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                        <Button variant="outline-success" onClick={addUserPayment}>Оплатить</Button>
                    </Modal.Footer>
                </>
            ) :
                <>
                </>
            }
        </Modal>
    );
}

export default CreateUserPayment;
