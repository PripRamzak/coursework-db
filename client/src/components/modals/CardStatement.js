import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { fetchCardStatement, fetchPayments, fetchUserPayments } from '../../http/paymentApi';
import { useNavigate } from 'react-router-dom';
import { REPORT_ROUTE } from '../../utils/consts';
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer';
import { format, subWeeks } from 'date-fns';
import Report from '../Report';


function CardStatement({ show, onHide, cardId }) {
    const [userPayments, setUserPayments] = useState([])
    const [filtredUserPayments, setFiltredUserPayments] = useState([])

    const [startDate, setStartDate] = useState(() => {
        const initialDate = subWeeks(new Date(), 1)
        initialDate.setHours(0, 0, 0);
        return initialDate;
    })
    const [endDate, setEndDate] = useState(() => {
        const initialDate = new Date()
        initialDate.setHours(23, 59, 59);
        return initialDate;
    })

    const getTimeDate = (timedate) => {
        let date = new Date(timedate);
        const year = new Intl.DateTimeFormat('ru', { day: 'numeric', year: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric' }).format(date);
        return year;
    }

    const handleStartDate = (selectedDate) => {
        selectedDate.setHours(0, 0, 0)
        setStartDate(selectedDate)
    }

    const handleEndDate = (selectedDate) => {
        selectedDate.setHours(23, 59, 59)
        setEndDate(selectedDate)
    }

    console.log(show)

    useEffect(() => {
        console.log('effect')
        if (show) {
            fetchCardStatement(cardId).then(data => setUserPayments(data))
        }
        else {
            setUserPayments([]);
            setFiltredUserPayments([]);
            handleStartDate(subWeeks(new Date(), 1))
            handleEndDate(new Date())
        }
    }, [show])

    useEffect(() => {
        setFiltredUserPayments(userPayments.filter(userPayment => new Date(userPayment.date) >= startDate && new Date(userPayment.date) <= endDate))
    }, [userPayments, startDate, endDate])

    console.log(userPayments)

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
                <Row>
                    <Col md={6}>
                        <Form.Control
                            className='mt-3'
                            value={format(startDate, "yyyy-MM-dd")}
                            onChange={(e) => { handleStartDate(new Date(e.target.value)) }}
                            type='date'
                        />
                    </Col>
                    <Col md={6}>
                        <Form.Control
                            className='mt-3'
                            value={format(endDate, "yyyy-MM-dd")}
                            onChange={(e) => { handleEndDate(new Date(e.target.value)) }}
                            type='date'
                        />
                    </Col>
                </Row>
                <Table className='mt-2' striped bordered hover>
                    <thead>
                        <tr>
                            <th>Сумма платежа</th>
                            <th>Название платежа</th>
                            <th>Тип</th>
                            <th>Дата платежа</th>
                            <th>Информация</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtredUserPayments.map(userPayment =>
                            <tr key={userPayment.id}>
                                <td>{userPayment.amount} BYN</td>
                                <td>{userPayment.payment.name}</td>
                                <td>{userPayment.type}</td>
                                <td><div>{getTimeDate(userPayment.date)}</div></td>
                                <td>
                                    {userPayment.payment.parameters.map((parameter, index) => (
                                        <div>
                                            {parameter}:  {userPayment.data[index]}
                                        </div>
                                    ))
                                    }
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
