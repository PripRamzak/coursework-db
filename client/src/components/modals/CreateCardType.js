import React, { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { createCardType } from '../../http/cardApi';

function CreateCardType({ show, onHide }) {
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [text, setText] = useState('')
    const [alert, setAlert] = useState(false)

    const addType = async () => {
        if (!file) {
            setAlert(true)
            return
        }

        const formData = new FormData()
            formData.append('name', name)
            formData.append('img', file)
            formData.append('description', text)

        try {
            await createCardType(formData).then(data => {
                setName('')
                setFile(null)
                setText('')
                onHide()
            })
        }
        catch (e) {
            setAlert(true)
        }
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
                    <Form.Control value={name} onChange={e => setName(e.target.value)} placeholder={'Название карты'} />
                    <Form.Control className='mt-3' placeholder='Изображение карты' type='file' onChange={selectFile} />
                    <Form.Control className='mt-3' as='textarea' rows={4} value={text} onChange={e => setText(e.target.value)} placeholder={'Описание карты'} />
                </Form>
                {alert &&
                    <Alert className='mt-3 p-1 text-center' variant='danger'>Вы не заполнили все поля</Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline" onClick={onHide}>Закрыть</Button>
                <Button variant="outline" onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateCardType;
