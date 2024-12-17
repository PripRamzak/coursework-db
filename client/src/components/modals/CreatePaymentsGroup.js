import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { createPaymentsGroup, fetchPaymentsGroup } from '../../http/paymentApi';

function CreatePaymentsGroup({ show, onHide }) {
    const [paymentsGroups, setPaymentsGroups] = useState([])
    const [name, setName] = useState('')
    const [parentId, setParentId] = useState(0)
    const [alert, setAlert] = useState('')

    const addPaymentsGroup = async () => {
        setAlert('')
        try {
            await createPaymentsGroup(name, parentId !== 0 ? parentId : null).then(() => {
                setName('')
                setParentId('')
                onHide()
            })
        }
        catch (e) {
            setAlert(e.response.data.message)
        }
    }

    useEffect(() => {
        fetchPaymentsGroup().then(data => setPaymentsGroups(data))
    }, [])

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
                    <Form.Label className='mt-2'>Родительская группа платежей</Form.Label>
                    <Form.Select onChange={e => setParentId(e.target.value)}>
                        <option value={0}>Отсутствует</option>
                        {paymentsGroups.map(paymentsGroup =>
                            <option key={paymentsGroup.id} value={paymentsGroup.id}>{paymentsGroup.name}</option>
                        )
                        }
                    </Form.Select>
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
