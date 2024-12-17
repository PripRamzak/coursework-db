import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { createMoneyTransfer, createPayment, fetchPaymentsGroup } from '../../http/paymentApi';
import { Context } from '../..';
import { fetchCards } from '../../http/cardApi';

function CreateMoneyTransfer({ show, onHide }) {
    const { account, card } = useContext(Context)

    const [transferType, setTransferType] = useState(0)
    const [balance, setBalance] = useState(null)
    const [senderCardId, setSenderCardId] = useState(0)
    const [receiverCardNumber, setReceiverCardNumber] = useState('')
    const [amount, setAmount] = useState('')
    const [alert, setAlert] = useState('')

    const regexAmount = /^\d*\.?\d{0,2}$/

    console.log(receiverCardNumber)

    const addTransfer = async () => {
        setAlert('')

        const senderCard = card.cards.find(personCard => personCard.id == senderCardId)
        if (senderCard.number == receiverCardNumber) {
            setAlert('Карты получателя и отправителя должны быть разными')
            return
        }

        try {
            await createMoneyTransfer(senderCardId, receiverCardNumber, amount);
        }
        catch (e) {
            console.log(e)
            setAlert(e.response.data.message)
            return
        }
        fetchCards(account.personId).then(data => card.setCards(data))
        setTransferType(0)
        setBalance(null)
        setSenderCardId(0)
        setReceiverCardNumber('')
        setAmount(0)
        onHide()
    }

    const getPersonCardName = (personCard) => {
        const cardName = card.types.find(type => type.id === personCard.cardTypeId).name;
        return cardName + ' ' + personCard.number.replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    const onChangeReceiverCardNumber = (number) => {
        const new_number = number.replace(/\D/g, '');
        if (new_number.length <= 16) {
            setReceiverCardNumber(new_number);
        }
    }

    const updateAmount = (amount) => {
        if (regexAmount.test(amount) || amount === '')
            setAmount(amount);
    }

    useEffect(() => {
        if (card)
            if (card.cards)
                setSenderCardId(card.cards[0].id)
    }, [card])

    useEffect(() => {
        if (senderCardId !== 0)
            setBalance(card.cards?.find(personCard => personCard.id == senderCardId).balance)
    }, [senderCardId])

    useEffect(() => {
        if (card && transferType === 0) {
            if (card.cards)
                setReceiverCardNumber(card.cards[0].number)
        }
        else if (transferType == 1)
            setReceiverCardNumber('')
    }, [card, transferType])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Совершить перевод
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {balance !== null &&
                        <Form.Label>{`Баланс: ${balance}`}</Form.Label>
                    }
                    <Form.Select onChange={e => setSenderCardId(e.target.value)}>
                        {card.cards.map(personCard =>
                            <option key={personCard.id} value={personCard.id}>{getPersonCardName(personCard)}</option>
                        )
                        }
                    </Form.Select>
                    <Form.Select className='mt-3' onChange={e => setTransferType(e.target.value)}>
                        <option value={0}>На свою карту</option>
                        <option value={1}>На чужую карту</option>
                    </Form.Select>
                    {transferType == 0 &&
                        <Form.Select className='mt-3' onChange={e => setReceiverCardNumber(e.target.value)}>
                            {card.cards.map(personCard =>
                                <option key={personCard.id} value={personCard.number}>{getPersonCardName(personCard)}</option>
                            )
                            }
                        </Form.Select>
                    }
                    {transferType == 1 &&
                        <Form.Control className='mt-3'
                            value={receiverCardNumber.replace(/(\d{4})(?=\d)/g, '$1 ')}
                            onChange={e => onChangeReceiverCardNumber(e.target.value)} />
                    }
                    <Form.Control className='mt-3' value={amount} onChange={e => updateAmount(e.target.value)} placeholder='Сумма перевода' />
                </Form>
                {alert &&
                    <Alert className='mt-3 p-1 text-center' variant='danger'>{alert}</Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addTransfer}>Перевести</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateMoneyTransfer;
