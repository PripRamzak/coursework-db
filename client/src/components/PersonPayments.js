import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Image, Row, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { PAYMENTS_ROUTE } from '../utils/consts';
import { deleteFavouritePayment, fetchFavoutirePayments } from '../http/paymentApi';
import { Context } from '..';
import paymentIcon from '../assets/payment_icon.png'
import CreateUserPayment from './modals/CreateUserPayment';
import SuccessfulPayment from './modals/SuccessfulPayment';

const PersonPayments = observer(() => {
    const navigate = useNavigate();

    const { account, card } = useContext(Context)
    const [favouritePayments, setFavouritePayments] = useState([])

    const [paymentModalVisible, setPaymentModalVisible] = useState(false)
    const [SuccessfulPaymentVisible, setSuccessfulPaymentVisible] = useState(false)

    const handleDeleteFavouritePayment = async (paymentId) => {
        await deleteFavouritePayment(account.id, paymentId);
        await fetchFavoutirePayments(account.id).then(data => setFavouritePayments(data))
    }

    useEffect(() => {
        if (account)
            fetchFavoutirePayments(account.id).then(data => setFavouritePayments(data))
    }, [account])

    if (card.userCards.length === 0)
        return <></>

    return (
        <React.Fragment>
            <h1 className='mt-4 text-center'>
                Платежи
            </h1>
            <Button className='mt-1 w-100' variant='outline-dark' onClick={() => navigate(PAYMENTS_ROUTE)}>Совершить платеж</Button>
            {favouritePayments.length !== 0 &&
                <h2 className='mt-3 text-center' style={{ color: 'gray' }}>
                    Избранные платежи
                </h2>
            }
            {favouritePayments.map(payment =>
                <>
                    <Row>
                        <Col md={3}>
                            <Card>
                                <Card.Body>
                                    <Card.Title className='text-center'>{payment.payment.name}</Card.Title>
                                    <div className='d-flex justify-content-center mt-3'>
                                        <Image src={paymentIcon} width={100} height={100} />
                                    </div>
                                    <div className="d-flex justify-content-end mt-3">
                                        <Button variant='outline-dark' onClick={() => setPaymentModalVisible(true)}>Оплатить</Button>
                                        <Button className='ms-1'
                                            variant='outline-danger'
                                            onClick={() => handleDeleteFavouritePayment(payment.payment.id)}
                                        >
                                            Удалить
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <CreateUserPayment show={paymentModalVisible}
                            onHide={() => { setPaymentModalVisible(false); setSuccessfulPaymentVisible(true) }}
                            payment={payment.payment} />
                        <SuccessfulPayment show={SuccessfulPaymentVisible}
                            onHide={() => setSuccessfulPaymentVisible(false)}
                            payment={payment.payment}
                            fromFavourite={true} />
                    </Row>
                    {/* <div className="d-flex justify-content-between mt-4">
                        <Button disabled={currentPage === 1}>Назад</Button>
                        <Button disabled={currentPage >= Math.ceil(favouritePayments.length / ITEMS_PER_PAGE)}>Вперед</Button>
                    </div> */}
                </>
            )
            }
        </React.Fragment>
    );
})

export default PersonPayments;
