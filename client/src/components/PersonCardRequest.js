import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Context } from '..';
import { fetchCards, fetchCardRequests, fetchCardTypes } from '../http/cardApi';
import { observer } from 'mobx-react-lite';

const PersonCardRequest = observer(() => {
    const { card } = useContext(Context)

    const getCardTypeName = (cardTypeId) => {
        if (card.types.length == 0)
            return '';
        return card.types.find((type) => type.id == cardTypeId).name
    }

    return (
        <React.Fragment>
            <h1 className='mt-2 text-center'>
                Заявки на карты
            </h1>
            {card.userRequests.length === 0 ?
                <div className='mt-2'>
                    <h3 style={{ color: 'gray' }}>У вас нет заявок</h3>
                </div>
                :
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Карта</th>
                            <th>Дата заявки</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {card.userRequests.map(request =>
                            <tr key={request.id}>
                                <td>{getCardTypeName(request.cardTypeId)}</td>
                                <td>{request.date}</td>
                                <td>{request.status}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            }
        </React.Fragment>
    );
})

export default PersonCardRequest;
