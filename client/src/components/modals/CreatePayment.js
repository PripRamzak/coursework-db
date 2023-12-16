import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createPayment } from '../../http/paymentApi';

function CreatePayment({ show, onHide, cardId }) {
    const [amount, setAmount] = useState(0)
    const [receiver, setReceiver] = useState('')

    const addPayment = () => {
        createPayment(amount, receiver, cardId).then(data => {
            setAmount(0)
            setReceiver('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Совершить платеж
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={receiver} onChange={e => setReceiver(e.target.value)} placeholder={'Получатель платежа'} />
                    <Form.Control
                        value={amount.toString()}
                        onChange={e => setAmount(Number(e.target.value))}
                        className='mt-3'
                        placeholder='Сумма платежа'
                        type='number' />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addPayment}>Оплатить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreatePayment;
