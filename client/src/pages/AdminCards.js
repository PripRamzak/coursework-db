import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap';
import { Context } from '..';
import { fetchCardTypes, fetchCards, fetchCardsCount } from '../http/cardApi';
import { observer } from 'mobx-react-lite';
import { fetchPersons } from '../http/userApi';
import { fetchPayments } from '../http/paymentApi';
import CreateCardType from '../components/modals/CreateCardType';
import UpdateCardType from '../components/modals/UpdateCardType';

const AdminCards = observer(() => {
    const { card } = useContext(Context)

    const [selectedCard, setSelectedCard] = useState(null)
    const [createCardVisible, setCreateCardVisible] = useState(false)
    const [updateCardVisible, setUpdateCardVisible] = useState(false)

    useEffect(() => {
        if (!updateCardVisible)
        fetchCardTypes().then(data => card.setTypes(data))
    }, [updateCardVisible])

    return (
        <Container>
            <h2 className='mt-2 text-center'>Карты</h2>
            <Row className='d-flex justify-content-center'>
                <Button variant={"outline-dark"} className='mt-2' style={{ width: '50%' }} onClick={() => setCreateCardVisible(true)}>Добавить новую карту</Button>
            </Row>
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>Карта</th>
                        <th>Описание</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {card.types.map(type =>
                        <tr>
                            <td>{type.name}</td>
                            <td>{type.description}</td>
                            <td className='d-flex justify-content-center'>
                                <Button variant='outline-primary' onClick={() => {setSelectedCard(type); setUpdateCardVisible(true)}}>
                                    Редактировать
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <CreateCardType show={createCardVisible} onHide={() => setCreateCardVisible(false)} />
            <UpdateCardType show={updateCardVisible} onHide={() => setUpdateCardVisible(false)} card={selectedCard}/>
        </Container>
    );
})

export default AdminCards;
