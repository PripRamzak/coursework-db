import React, { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Context } from '..';
import { fetchCards, fetchCardRequests, fetchCardTypes, deleteCardRequest } from '../http/cardApi';
import { observer } from 'mobx-react-lite';

const PersonCardRequest = observer(() => {
    const { account, card } = useContext(Context)

    const getCardTypeName = (cardTypeId) => {
        if (card.types.length == 0)
            return '';
        return card.types.find((type) => type.id == cardTypeId).name
    }

    const getTimeDate = (timedate) => {
        let date = new Date(timedate);
        const year = new Intl.DateTimeFormat('ru', { day: 'numeric', year: 'numeric', month: 'long' }).format(date);
        return year;
    }

    const destroyCardRequest = async (requestId) => {
        await deleteCardRequest(requestId)
        fetchCardRequests(account.personId).then(data => card.setUserRequests(data))
    }

    return (
        <React.Fragment>
            {card.userRequests.length > 0 &&
                <>
                    <h1 className='mt-2 text-center'>
                        Заявки на карты
                    </h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Карта</th>
                                <th>Дата заявки</th>
                                <th>Статус</th>
                                {card.userRequests.find(request => request.status !== 'Обрабатывается') &&
                                    <th></th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {card.userRequests.map(request =>
                                <tr key={request.id}>
                                    <td>{getCardTypeName(request.cardTypeId)}</td>
                                    <td>{getTimeDate(request.date)}</td>
                                    <td>{request.status}</td>
                                    {request.status !== 'Обрабатывается' &&
                                        <td className='d-flex justify-content-center'>
                                            <Button variant='outline-success' onClick={() => destroyCardRequest(request.id)}>OK</Button>
                                        </td>
                                    }
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </>
            }
        </React.Fragment>
    );
})

export default PersonCardRequest;
