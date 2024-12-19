import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { updateCardType } from '../../http/cardApi';

function UpdateCardType({ show, onHide, card }) {
    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const [alert, setAlert] = useState(false)

    const update = async () => {

        try {
            await updateCardType(card.id, name, text).then(() => {
                setName('')
                setText('')
                onHide()
            })
        }
        catch (e) {
            setAlert(true)
        }
    }

    useEffect(() => {
        if (card) {
            setName(card.name)
            setText(card.description)
        }
    }, [card])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Обновить данные о карте
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder={'Название карты'} />
                    <Form.Control className='mt-3' as='textarea' rows={4} value={text} onChange={e => setText(e.target.value)} placeholder={'Описание карты'} />
                </Form>
                {alert &&
                    <Alert className='mt-3 p-1 text-center' variant='danger'>Вы не заполнили все поля</Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline" onClick={onHide}>Закрыть</Button>
                <Button variant="outline" onClick={update}>Обновить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateCardType;
