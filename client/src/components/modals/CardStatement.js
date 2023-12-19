import React, { useEffect, useRef, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { fetchPayments } from '../../http/paymentApi';
import { useNavigate } from 'react-router-dom';
import { REPORT_ROUTE } from '../../utils/consts';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
import Report from '../Report';


function CardStatement({ show, onHide, cardId }) {
    const [payments, setPayments] = useState([])
    const downloadRef = useRef(null)

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
                            <th>Действие</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment =>
                            <tr key={payment.id}>
                                <td>{payment.amount} BYN</td>
                                <td>{payment.code}</td>
                                <td>{payment.type}</td>
                                <td>{payment.date}</td>
                                <td>
                                    <PDFDownloadLink className='me-2' document={<Report payment={payment} />} fileName={'payment_' + payment.id +'.pdf'}>
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
