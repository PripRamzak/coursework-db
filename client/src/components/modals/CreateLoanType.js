import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createLoanType } from '../../http/loanApi';

function CreateLoanType({ show, onHide }) {
    const [name, setName] = useState('')
    const [minAmount, setMinAmount] = useState(0)
    const [maxAmount, setMaxAmount] = useState(0)
    const [minTerm, setMinTerm] = useState(0)
    const [maxTerm, setMaxTerm] = useState(0)
    const [annualInterestRate, setAnnualInterestRate] = useState(0)
    const [file, setFile] = useState(null)
    const [text, setText] = useState('')

    const addType = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('annual_interest_rate', annualInterestRate)
        formData.append('min_amount', minAmount)
        formData.append('max_amount', maxAmount)
        formData.append('min_term', minTerm)
        formData.append('max_term', maxTerm)
        formData.append('img', file)
        formData.append('description', text)
        createLoanType(formData).then(data => {
            setName('')
            setAnnualInterestRate(0)
            setMinAmount(0)
            setMaxAmount(0)
            setMinTerm(0)
            setMaxTerm(0)
            setFile(null)
            setText('')
            onHide()
        })
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
                    <Form.Group className='mt-3'>
                        <Form.Label>Изображение для сайта</Form.Label>
                        <Form.Control onChange={selectFile} type='file' />
                    </Form.Group>
                    <Form.Control className='mt-3' as='textarea' rows={4} value={text} onChange={e => setText(e.target.value)} placeholder={'Описание кредита'} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateLoanType;
