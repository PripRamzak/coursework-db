import React, { useContext, useState } from 'react';
import { Button, Card, Container, Dropdown, Form } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '..';
import { activation, createPerson } from '../http/userApi';
import { observer } from 'mobx-react-lite';
import { BANK_ROUTE } from '../utils/consts';
const Activation = observer(() => {
    const { account } = useContext(Context)
    const navigate = useNavigate()
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [identNumber, setIdentNumber] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [sex, setSex] = useState('')


    const click = async () => {
        try {
            const person = await createPerson(lastName, firstName, middleName, identNumber, birthDate, sex)
            const data = await activation(account.id, person.id)
            account.setAccount(data)
            navigate(BANK_ROUTE)
        }
        catch (e) {
            alert(e.responce.data.message)
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">Активация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="Фамилия" value={lastName} onChange={e => setLastName(e.target.value)} />
                    <Form.Control className="mt-3" placeholder="Имя" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <Form.Control className="mt-3" placeholder="Отчество" value={middleName} onChange={e => setMiddleName(e.target.value)} />
                    <Form.Control className="mt-3" placeholder="Идентификационный номер" value={identNumber} onChange={p => setIdentNumber(p.target.value)} />
                    <Form.Control className="mt-3" value={birthDate} onChange={p => setBirthDate(p.target.value)} type='date' />
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle variant='outline-dark' style={{ width: '100%' }}>{sex || 'Пол'}</Dropdown.Toggle>
                        <Dropdown.Menu style={{ width: '100%' }}>
                            <Dropdown.Item onClick={() => setSex('Мужчина')}>Мужчина</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSex('Женщина')}>Женщина</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button className='mt-3' variant='success' onClick={click}>Активировать</Button>
                </Form>
            </Card>
        </Container>
    );
})

export default Activation;
