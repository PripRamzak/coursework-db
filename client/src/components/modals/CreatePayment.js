import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { createPayment, fetchPaymentsGroup } from '../../http/paymentApi';

function CreatePayment({ show, onHide, paymentsGroupId }) {
    const [name, setName] = useState('')
    const [paymentParameters, setPaymentParameters] = useState([])
    const [alert, setAlert] = useState('')

    const addPayment = async () => {
        setAlert('')
        try {
            await createPayment(name, paymentsGroupId !== 0 ? paymentsGroupId : null, paymentParameters).then(() => {
                setName('')
                onHide()
            })
        }
        catch (e) {
            setAlert(e.response.data.message)
        }
    }

    const addParameter = () => {
        setPaymentParameters([...paymentParameters, ''])
    }

    const removeParameter = (idx) => {
        setPaymentParameters(paymentParameters.filter((_, index) => index !== idx))
    }

    const changeParameter = (idx, value) => {
        setPaymentParameters(paymentParameters.map((parameter, index) => index === idx ? value : parameter))
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать платеж
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder={'Название платежа'} />
                    {paymentParameters.map((parameter, index) =>
                        <Row className='mt-2' key={index}>
                            <Col md={6}>
                                <Form.Control
                                    value={parameter}
                                    onChange={(e) => changeParameter(index, e.target.value)}
                                    placeholder='Название параметра'
                                />
                            </Col>
                            <Col className='d-flex justify-content-end' md={6}>
                                <Button variant='danger' onClick={() => removeParameter(index)}>Удалить</Button>
                            </Col>
                        </Row>
                    )
                    }
                </Form>
                {alert &&
                    <Alert className='mt-3 p-1 text-center' variant='danger'>{alert}</Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button className='mt-2' variant='outline-dark' onClick={addParameter}>Добавить новое свойство</Button>
                <Button variant="outline-success" onClick={addPayment}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreatePayment;
