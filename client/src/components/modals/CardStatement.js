import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { fetchCardStatement, fetchPayments, fetchUserPayments } from '../../http/paymentApi';
import { useNavigate } from 'react-router-dom';
import { REPORT_ROUTE } from '../../utils/consts';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
import Report from '../Report';


function CardStatement({ show, onHide, cardId }) {
    const [userPayments, setUserPayments] = useState([])

    const getTimeDate = (timedate) => {
        let date = new Date(timedate);
        const year = new Intl.DateTimeFormat('ru', { day: 'numeric', year: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' }).format(date);
        return year;
    }

    useEffect(() => {
        fetchCardStatement(cardId).then(data => setUserPayments(data))
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
                            <th>Сумма платежа</th>
                            <th>Название платежа</th>
                            <th>Тип</th>
                            <th>Дата платежа</th>
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userPayments.map(userPayment =>
                            <tr key={userPayment.id}>
                                <td>{userPayment.amount} BYN</td>
                                <td>{userPayment.payment.name}</td>
                                <td>{userPayment.type}</td>
                                <td>{getTimeDate(userPayment.date)}</td>
                                <td>
                                    <PDFDownloadLink className='me-2' document={<Report payment={userPayment} />} fileName={'payment_' + userPayment.id +'.pdf'}>
                                        {({ blob, url, loading, error }) => (loading ? 'Загрузка отчета...' : 'Сохранить в PDF')}
                                    </PDFDownloadLink>
                                </td>
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
