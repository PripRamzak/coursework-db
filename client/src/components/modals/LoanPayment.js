import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { createLoanPaymment, createMoneyTransfer, createPayment, fetchPaymentsGroup } from '../../http/paymentApi';
import { Context } from '../..';
import { fetchCards } from '../../http/cardApi';
import { fetchLoans } from '../../http/loanApi';

function LoanPayment({ show, onHide }) {
    const { account, card, loan } = useContext(Context)

    const [balance, setBalance] = useState(null)
    const [cardId, setCardId] = useState(0)
    const [amount, setAmount] = useState('')
    const [alert, setAlert] = useState('')

    const regexAmount = /^\d*\.?\d{0,2}$/

    const addTransfer = async () => {
        setAlert('')

        try {
            await createLoanPaymment(cardId, loan.userLoans[0].id, amount);
        }
        catch (e) {
            setAlert(e.response.data.message)
            return
        }
        fetchCards(account.personId).then(data => card.setUserCards(data))
        fetchLoans(account.personId).then(data => loan.setUserLoans(data))
        setBalance(null)
        setCardId(0)
        setAmount('')
        onHide()
    }

    const getPersonCardName = (personCard) => {
        const cardName = card.types.find(type => type.id === personCard.cardTypeId).name;
        return cardName + ' ' + personCard.number.replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    const updateAmount = (amount) => {
        if (regexAmount.test(amount) || amount === '')
            setAmount(amount);
    }

    useEffect(() => {
        if (card.userCards.length !== 0)
            setCardId(card.userCards[0].id)
    }, [card.userCards])

    useEffect(() => {
        if (cardId !== 0)
            setBalance(card.userCards?.find(personCard => personCard.id == cardId).balance)
    }, [cardId])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Погасить кредит
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {balance !== null &&
                        <Form.Label>{`Баланс: ${balance}`}</Form.Label>
                    }
                    <Form.Select onChange={e => setCardId(e.target.value)}>
                        {card.userCards.map(personCard =>
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
                <Button variant="outline-success" onClick={addTransfer}>Погасить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoanPayment;
