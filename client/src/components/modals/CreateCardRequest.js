import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { createCardRequest, fetchCardRequests, fetchCardTypes } from '../../http/cardApi';
import { Context } from '../..';

function CreateCardRequest({ show, onHide, personId }) {
    const { card } = useContext(Context)
    const [typeId, setTypeId] = useState(0)
    const [type, setType] = useState('')

    useEffect(() => {
        fetchCardTypes().then(data => card.setTypes(data))
    }, [])

    const addCardRequest = () => {
        createCardRequest(personId, typeId).then(data => {
            setTypeId('')
            onHide()
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="sm"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Оставьте заявку на карту
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Dropdown className='mt-3 mb-3 d-flex justify-content-center'>
                    <Dropdown.Toggle variant='light'>{type || 'Карта'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {card.types.map(type =>
                            <Dropdown.Item key={type.id} onClick={() => {
                                setTypeId(type.id)
                                setType(type.name)
                            }}>{type.name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addCardRequest}>Оставить заявку</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateCardRequest;
