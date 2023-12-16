import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { activation, createPerson, registration } from '../../http/userApi';

function CreateWorkerAccount({ show, onHide }) {
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [identNumber, setIdentNumber] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [sex, setSex] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const addWorkerAccount = async () => {
        try {
            const account = await registration(email, password, 'WORKER');
            const person = await createPerson(lastName, firstName, middleName, identNumber, birthDate, sex)
            activation(account.id, person.id)
        }
        catch (e) {
            alert(e.responce.data.message)
        }
        setLastName('')
        setFirstName('')
        setMiddleName('')
        setIdentNumber('')
        setBirthDate('')
        setSex('')
        setEmail('')
        setPassword('')
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Введите данные сотрудника
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Control value={lastName} onChange={e => setLastName(e.target.value)} className='mt-3' placeholder='Фамилия сотрудника' />
                <Form.Control value={firstName} onChange={e => setFirstName(e.target.value)} className='mt-3' placeholder='Имя сотрудника' />
                <Form.Control value={middleName} onChange={e => setMiddleName(e.target.value)} className='mt-3' placeholder='Отчество сотрудника' />
                <Form.Control
                    value={identNumber}
                    onChange={e => setIdentNumber(e.target.value)}
                    className='mt-3'
                    placeholder='Идентификациооный номер пасмпорта сотрудника' />
                <Form.Control value={birthDate} onChange={e => setBirthDate(e.target.value)} className='mt-3' type='date' />
                <Dropdown className='mt-3'>
                    <Dropdown.Toggle variant='outline-dark' style={{ width: '100%' }}>{sex || 'Пол'}</Dropdown.Toggle>
                    <Dropdown.Menu style={{ width: '100%' }}>
                        <Dropdown.Item onClick={() => setSex('Мужчина')}>Мужчина</Dropdown.Item>
                        <Dropdown.Item onClick={() => setSex('Женщина')}>Женщина</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control value={email} onChange={e => setEmail(e.target.value)} className='mt-3' placeholder='Электронная почта сотрудника' />
                <Form.Control value={password} onChange={e => setPassword(e.target.value)} className='mt-3' placeholder='Пароль сотрудника' />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={addWorkerAccount}>Создать аккаунт сотрудника</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateWorkerAccount;
