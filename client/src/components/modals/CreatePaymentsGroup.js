import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { createPaymentsGroup, fetchPaymentsGroup } from '../../http/paymentApi';

function CreatePaymentsGroup({ show, onHide, parentId }) {
    const [name, setName] = useState('')
    const [alert, setAlert] = useState('')

    const addPaymentsGroup = async () => {
        setAlert('')
        try {
            await createPaymentsGroup(name, parentId !== 0 ? parentId : null).then(() => {
                setName('')
                onHide()
            })
        }
        catch (e) {
            setAlert(e.response.data.message)
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
                    Создать группу платежей
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
                <Button variant="outline-success" onClick={addPaymentsGroup}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreatePaymentsGroup;
