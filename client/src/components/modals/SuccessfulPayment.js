import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Image, Modal, Row } from 'react-bootstrap';
import checkMark from '../../assets/check_mark.png'
import { Context } from '../..';
import { createFavouritePayment, fetchOneFavouritePayment } from '../../http/paymentApi';
import { useNavigate } from 'react-router-dom';
import { PERSONAL_ACCOUNT_ROUTE } from '../../utils/consts';

function SuccessfulPayment({ show, onHide, payment, fromFavourite }) {
    const navigate = useNavigate()

    const { account } = useContext(Context)
    const [favouritePayment, setFavouritePayment] = useState(null)
    const [alert, setAlert] = useState('')

    useEffect(() => {
        if (payment && account)
            fetchOneFavouritePayment(account.id, payment.id).then(data => setFavouritePayment(data))
    }, [account, payment]);

    const addFavouritePayment = async () => {
        try {
            await createFavouritePayment(account.id, payment.id);
            const data = await fetchOneFavouritePayment(account.id, payment.id)
            setFavouritePayment(data)
        }
        catch (e) {
            setAlert(e.response.data.message)
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Уведомление
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column align-items-center'>
                <Row>
                    <Image src={checkMark} style={{ width: 150, height: 150 }} />
                </Row>
                <Row>Платеж прошел успешно</Row>
                {alert &&
                    <Alert className='mt-3 p-1 text-center' variant='danger'>{alert}</Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                {!favouritePayment &&
                    <Button variant='outline'
                        onClick={() => {
                            addFavouritePayment();
                            
                        }}>
                        Добавить в избранное
                    </Button>
                }
                {!fromFavourite &&
                    <Button variant="outline-dark" onClick={() => navigate(PERSONAL_ACCOUNT_ROUTE)}>Вернуться в личный кабинет</Button>}
                <Button variant="outline-success" onClick={onHide}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SuccessfulPayment;
