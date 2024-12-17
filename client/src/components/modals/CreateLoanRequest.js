import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { createLoanRequest, fetchLoanTypes } from '../../http/loanApi';
import { Context } from '../..';

function CreateLoanRequest({ show, onHide }) {
    const { account, card, loan } = useContext(Context)

    const [selectedType, setSelectedType] = useState(null)
    const [cardId, setCardId] = useState(0)
    const [typeNotChoosen, setTypeNotChoosen] = useState(true)
    const [amount, setAmount] = useState(0)
    const [years, setYears] = useState(0)
    const [fullPayment, setFullPayment] = useState(0)
    const [payment, setPayment] = useState(0)
    const [file, setFile] = useState(null)
    const [alert, setAlert] = useState(false)

    const addRequest = () => {
        if (!file || selectedType == {}) {
            setAlert(true)
            return
        }

        const formData = new FormData()
        formData.append('amount', amount)
        formData.append('years', years)
        formData.append('file', file)
        formData.append('typeId', selectedType.id)
        formData.append('personId', account.personId)
        formData.append('cardId', cardId)

        try {
            createLoanRequest(formData).then(() => {
                setSelectedType(null)
                setCardId(0)
                setTypeNotChoosen(true)
                setAmount(0)
                setYears(0)
                setFile(null)
                onHide()
            })
        }
        catch (e) {
            setAlert(true)
        }
    }

    const calculatePayment = (amount, years, annualInterestRate) => {
        const payment = amount * (annualInterestRate / (100 * 12) / (1 - Math.pow((1 + annualInterestRate / (100 * 12)), -1 * years * 12)))
        setPayment(Number(payment).toFixed(2))
        setFullPayment(Number(payment * 12 * years).toFixed(2))
    }

    const getPersonCardName = (personCard) => {
        const cardName = card.types.find(type => type.id === personCard.cardTypeId).name;
        return cardName + ' ' + personCard.number.replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    useEffect(() => {
        if (selectedType)
            calculatePayment(amount, years, selectedType.annual_interest_rate)
    }, [amount, years])

    useEffect(() => {
        if (card.userCards.length !== 0)
            setCardId(card.userCards[0].id)
    }, [card])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оформить заявку на кредит
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle variant='light'>{selectedType ? selectedType.name : 'Кредит'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {loan.types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => {
                                        setSelectedType(type)
                                        setTypeNotChoosen(false)
                                        setAmount(type.min_amount)
                                        setYears(type.min_term)
                                    }}>
                                    {type.name}
                                </Dropdown.Item>)
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Group className='mt-3 d-flex align-items-center' as={Row}>
                        <Form.Label>Сумма кредита</Form.Label>
                        <Col md={9}>
                            <Form.Range
                                min={selectedType ? selectedType.min_amount : 0}
                                max={selectedType ? selectedType.max_amount : 0}
                                step={1000}
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                disabled={typeNotChoosen} />
                        </Col>
                        <Col md={3}>
                            <Form.Control value={amount} readOnly />
                        </Col>
                    </Form.Group>
                    <Form.Group className='mt-3 d-flex align-items-center' as={Row}>
                        <Form.Label>Срок кредита</Form.Label>
                        <Col md={9}>
                            <Form.Range
                                min={selectedType ? selectedType.min_term : 0}
                                max={selectedType ? selectedType.max_term : 0}
                                step={1}
                                value={years} onChange={e => setYears(e.target.value)} disabled={typeNotChoosen} />
                        </Col>
                        <Col md={3}>
                            <Form.Control value={years} readOnly />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Карта, на которую поступит кредит</Form.Label>
                        <Form.Select onChange={e => setCardId(e.target.value)}>
                            {card.userCards.map(personCard =>
                                <option key={personCard.id} value={personCard.id}>{getPersonCardName(personCard)}</option>
                            )
                            }
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Общая сумма выплат</Form.Label>
                        <Form.Control value={fullPayment} readOnly />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Ежемесячный платеж</Form.Label>
                        <Form.Control value={payment} readOnly />
                    </Form.Group>
                    <Form.Group className='mt-3 d-flex flex-column'>
                        <Form.Label>Справка о доходах</Form.Label>
                        <Form.Text>PDF файл</Form.Text>
                        <Form.Control onChange={selectFile} type='file' />
                    </Form.Group>
                </Form>
                {alert &&
                    <Alert className='mt-3 p-1 text-center' variant='danger'>Вы не заполнили все поля</Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addRequest}>Оформить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateLoanRequest;
