import React, { useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { createLoanRequest, fetchLoanTypes } from '../../http/loanApi';

function CreateLoanRequest({ show, onHide, personId }) {
    const [loanTypes, setLoanTypes] = useState([])
    const [selectedType, setSelectedType] = useState({})
    const [typeNotChoosen, setTypeNotChoosen] = useState(true)
    const [amount, setAmount] = useState(0)
    const [years, setYears] = useState(0)
    const [fullPayment, setFullPayment] = useState(0)
    const [payment, setPayment] = useState(0)
    const [file, setFile] = useState(null)

    useEffect(() => {
        fetchLoanTypes().then(data => setLoanTypes(data))
    }, [])

    useEffect(() => {
        calculatePayment(amount, years, selectedType.annual_interest_rate)
    }, [amount, years])

    const addType = () => {
        const formData = new FormData()
        formData.append('amount', amount)
        formData.append('years', years)
        formData.append('file', file)
        formData.append('typeId', selectedType.id)
        formData.append('personId', personId)
        createLoanRequest(formData).then(data => {
            setSelectedType({})
            setTypeNotChoosen(true)
            setAmount(0)
            setYears(0)
            setFile(null)
            onHide()
        })
    }

    const calculatePayment = (amount, years, annualInterestRate) => {
        const payment = amount * (annualInterestRate / (100 * 12) / (1 - Math.pow((1 + annualInterestRate / (100 * 12)), -1 * years * 12)))
        setPayment(Number(payment).toFixed(2))
        setFullPayment(Number(payment * 12 * years).toFixed(2))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle variant='light'>{selectedType.name || 'Кредит'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {loanTypes.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => {
                                        setSelectedType(type)
                                        setTypeNotChoosen(false)
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
                                min={selectedType.min_amount}
                                max={selectedType.max_amount}
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
                                min={selectedType.min_term}
                                max={selectedType.max_term}
                                step={1}
                                value={years} onChange={e => setYears(e.target.value)} disabled={typeNotChoosen} />
                        </Col>
                        <Col md={3}>
                            <Form.Control value={years} readOnly />
                        </Col>
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Общая сумма выплат</Form.Label>
                        <Form.Control value={fullPayment} readOnly />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Ежемесячный платеж</Form.Label>
                        <Form.Control value={payment} readOnly />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Справка о доходах</Form.Label>
                        <Form.Control onChange={selectFile} type='file' />
                        <Form.Text>PDF файл</Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateLoanRequest;
