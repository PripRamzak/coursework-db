import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { fetchPayments } from '../../http/paymentApi';

function CardStatement({ show, onHide, cardId }) {
    const [payments, setPayments] = useState([])

    useEffect(() => {
        fetchPayments(cardId).then(data => setPayments(data))
    }, [show])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="xl"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Выписка по карте
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Сумма</th>
                            <th>Код платежа</th>
                            <th>Тип</th>
                            <th>Дата платежа</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment =>
                            <tr>
                                <td>{payment.amount}</td>
                                <td>{payment.code}</td>
                                <td>{payment.type}</td>
                                <td>{payment.date}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CardStatement;
