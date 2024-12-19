import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { updatePaymentsGroup } from '../../http/paymentApi';

function UpdatePaymentsGroup({ show, onHide, paymentsGroup }) {
    const [name, setName] = useState('')
    const [alert, setAlert] = useState('')

    const update = async () => {
        setAlert('')
        try {
            await updatePaymentsGroup(paymentsGroup.id, name).then(() => {
                setName('')
                onHide()
            })
        }
        catch (e) {
            setAlert(e.response.data.message)
        }
    }

    useEffect(() => {
        if (paymentsGroup)
            setName(paymentsGroup.name)
    }, [paymentsGroup])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Обновить группу платежей
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder={'Название группы платежей'} />
                </Form>
                {alert &&
                    <Alert className='mt-3 p-1 text-center' variant='danger'>{alert}</Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={update}>Обновить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdatePaymentsGroup;
