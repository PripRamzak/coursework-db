import React, { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { createPayment } from '../../http/paymentApi';

function CreatePayment({ show, onHide, cardId }) {
    const [amount, setAmount] = useState(0)
    const [code, setCode] = useState('')
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    const addPayment = async () => {
        if (amount < 0) {
            setAlertMessage('Некорректная сумма платежа')
            setAlert(true)
            return
        }

        try {
            await createPayment(amount, code, cardId).then(data => {
                setAmount(0)
                setCode('')
                onHide()
            })
        }
        catch (e) {
            if (e.response.data.message == 'Incorrect code or amount') {
                setAlertMessage('Вы не заполнили все поля')
            }
            else if (e.response.data.message == 'Not enough money') {
                setAlertMessage('Недостаточно средств')
            }
            setAlert(true)
        }
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
                    <Form.Control value={code} onChange={e => setCode(e.target.value)} placeholder={'Код платежа'} />
                    <Form.Control
                        value={amount.toString()}
                        onChange={e => setAmount(Number(e.target.value))}
                        className='mt-3'
                        placeholder='Сумма платежа'
                        type='number' />
                </Form>
                {alert &&
                    <Alert className='mt-3 p-1 text-center' variant='danger'>{alertMessage}</Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addPayment}>Оплатить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreatePayment;
