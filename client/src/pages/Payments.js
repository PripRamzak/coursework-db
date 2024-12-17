import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { fetchCardTypes } from '../http/cardApi';
import { fetchPayments, fetchPaymentsGroup } from '../http/paymentApi';
import folderIcon from '../assets/folder-icon.png'
import paymentIcon from '../assets/payment_icon.png'
import CreateUserPayment from '../components/modals/CreateUserPayment';
import { useNavigate } from 'react-router-dom';
import { PERSONAL_ACCOUNT_ROUTE } from '../utils/consts';
import SuccessfulPayment from '../components/modals/SuccessfulPayment';


const Payments = observer(() => {
    const navigate = useNavigate()

    const [paymentsGroups, setPaymentsGroups] = useState([])
    const [payments, setPayments] = useState([])
    const [selectedPayment, setSelectedPayment] = useState(null)
    const [paymentsGroupsHistory, setPaymentsGroupsHistory] = useState([0])

    const [paymentModalVisible, setPaymentModalVisible] = useState(false)
    const [SuccessfulPaymentVisible, setSuccessfulPaymentVisible] = useState(false)

    const changePaymentsGroup = (paymentsGroup) => {
        setPaymentsGroupsHistory([...paymentsGroupsHistory, paymentsGroup.id])
    }

    const goBack = () => {
        if (paymentsGroupsHistory.at(-1) === 0)
            navigate(PERSONAL_ACCOUNT_ROUTE)
        setPaymentsGroupsHistory(paymentsGroupsHistory.filter((_, index) => index !== paymentsGroupsHistory.length - 1))
    }

    useEffect(() => {
        if (!!paymentsGroupsHistory) {
            const lastPaymentGroup = paymentsGroupsHistory.at(-1)
            fetchPaymentsGroup(lastPaymentGroup).then(data => setPaymentsGroups(data))
            fetchPayments(lastPaymentGroup).then(data => setPayments(data))
        }
    }, [paymentsGroupsHistory])

    return (
        <Container>
            <h1>Платежи</h1>
            {paymentsGroups.map((paymentsGroup, index) =>
                <Row className='mt-2' key={index} onClick={() => changePaymentsGroup(paymentsGroup)}>
                    <Card className='d-flex justify-content-center'
                        style={{ height: 30, cursor: 'pointer', background: '#EEEEEE' }}>
                        <Row>
                            <Col md={1} style={{ width: 50 }}>
                                <Image src={folderIcon} width={25} height={25} />
                            </Col>
                            {paymentsGroup.name}
                        </Row>
                    </Card>
                </Row>
            )
            }
            {payments.map((payment, index) =>
                <Row className='mt-2' key={index} onClick={() => { setSelectedPayment(payment); setPaymentModalVisible(true) }}>
                    <Card className='d-flex justify-content-center'
                        style={{ height: 30, cursor: 'pointer', background: '#EEEEEE' }}>
                        <Row>
                            <Col md={1} style={{ width: 50 }}>
                                <Image src={paymentIcon} width={25} height={25} />
                            </Col>
                            {payment.name}
                        </Row>
                    </Card>
                </Row>
            )
            }
            <Row className='mt-2' onClick={() => goBack()}>
                <Card className='d-flex justify-content-center'
                    style={{ height: 30, cursor: 'pointer', background: '#EEEEEE' }}>
                    <Row>
                        <Col md={1} style={{ width: 50 }} />
                        Назад
                    </Row>
                </Card>
            </Row>
            <CreateUserPayment show={paymentModalVisible}
                onHide={() => { setPaymentModalVisible(false); setSuccessfulPaymentVisible(true) }}
                payment={selectedPayment} />
            <SuccessfulPayment show={SuccessfulPaymentVisible}
                onHide={() => setSuccessfulPaymentVisible(false)}
                payment={selectedPayment}
                fromFavourite={false} />
        </Container>
    );
})

export default Payments;