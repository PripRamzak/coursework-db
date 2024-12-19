import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { updateLoanTypes } from '../../http/loanApi';

function UpdateLoanType({ show, onHide, loan }) {
    const [name, setName] = useState('')
    const [minAmount, setMinAmount] = useState(0)
    const [maxAmount, setMaxAmount] = useState(0)
    const [minTerm, setMinTerm] = useState(0)
    const [maxTerm, setMaxTerm] = useState(0)
    const [annualInterestRate, setAnnualInterestRate] = useState(0)
    const [text, setText] = useState('')
    const [alert, setAlert] = useState(false)

    const update = async () => {
        try {
            await updateLoanTypes(loan.id, name, minAmount, maxAmount, minTerm, maxTerm, annualInterestRate, text).then(data => {
                setName('')
                setMinAmount(0)
                setMaxAmount(0)
                setMinTerm(0)
                setMaxTerm(0)
                setAnnualInterestRate(0)
                setText('')
                onHide()
            })
        }
        catch (e) {
            setAlert(true)
        }
    }

    useEffect(() => {
        if (loan)
        {
            setName(loan.name)
            setMinAmount(loan.min_amount)
            setMaxAmount(loan.max_amount)
            setMinTerm(loan.min_term)
            setMaxTerm(loan.max_term)
            setAnnualInterestRate(loan.annual_interest_rate)
            setText(loan.description)
            setAlert(false)
        }
    }, [loan])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Обновить данные о кредите
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder={'Название кредита'} />
                    <Form.Group className='mt-3'>
                        <Form.Label>Годовая ставка</Form.Label>
                        <Form.Control value={annualInterestRate.toString()} onChange={e => setAnnualInterestRate(Number(e.target.value))} type='number' />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Минимальная сумма кредита</Form.Label>
                        <Form.Control value={minAmount.toString()} onChange={e => setMinAmount(Number(e.target.value))} type='number' />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Максимальная сумма кредита</Form.Label>
                        <Form.Control value={maxAmount.toString()} onChange={e => setMaxAmount(Number(e.target.value))} type='number' />
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Минимальный срок кредита</Form.Label>
                        <Form.Control value={minTerm.toString()} onChange={e => setMinTerm(Number(e.target.value))} type='number' />
                        <Form.Text>Указывать в годах</Form.Text>
                    </Form.Group>
                    <Form.Group className='mt-3'>
                        <Form.Label>Максимальный срок кредита</Form.Label>
                        <Form.Control value={maxTerm.toString()} onChange={e => setMaxTerm(Number(e.target.value))} type='number' />
                        <Form.Text>Указывать в годах</Form.Text>
                    </Form.Group>
                    <Form.Control className='mt-3' as='textarea' rows={4} value={text} onChange={e => setText(e.target.value)} placeholder={'Описание кредита'} />
                </Form>
                {alert &&
                    <Alert className='mt-3 p-1 text-center' variant='danger'>Вы не заполнили все поля</Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={update}>Обновить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateLoanType;
