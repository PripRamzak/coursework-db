import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { fetchCardTypes } from '../http/cardApi';
import { deletePayment, deletePaymentsGroup, fetchPayments, fetchPaymentsGroup } from '../http/paymentApi';
import folderIcon from '../assets/folder-icon.png'
import paymentIcon from '../assets/payment_icon.png'
import CreateUserPayment from '../components/modals/CreateUserPayment';
import { useNavigate } from 'react-router-dom';
import { PERSONAL_ACCOUNT_ROUTE } from '../utils/consts';
import SuccessfulPayment from '../components/modals/SuccessfulPayment';
import CreatePaymentsGroup from '../components/modals/CreatePaymentsGroup';
import CreatePayment from '../components/modals/CreatePayment';
import UpdatePaymentsGroup from '../components/modals/UpdatePaymentsGroup';
import UpdatePayment from '../components/modals/UpdatePayment';


const AdminPayments = observer(() => {
    const navigate = useNavigate()

    const [paymentsGroups, setPaymentsGroups] = useState([])
    const [payments, setPayments] = useState([])
    const [selectedPaymentsGroup, setSelectedPaymentsGroup] = useState(null)
    const [selectedPayment, setSelectedPayment] = useState(null)
    const [paymentsGroupsHistory, setPaymentsGroupsHistory] = useState([0])
    const [lastPaymentsGroup, setLastPaymentsGroup] = useState(0)

    const [createPaymentsGroupVisible, setCreatePaymentsGroupVisible] = useState(false)
    const [createPaymentVisible, setCreatePaymentVisible] = useState(false)
    const [updatePaymentsGroupVisible, setUpdatePaymentsGroupVisible] = useState(false)
    const [updatePaymentVisible, setUpdatePaymentVisible] = useState(false)

    const changePaymentsGroup = (paymentsGroup) => {
        setPaymentsGroupsHistory([...paymentsGroupsHistory, paymentsGroup.id])
    }

    const goBack = () => {
        if (paymentsGroupsHistory.at(-1) === 0)
            navigate(PERSONAL_ACCOUNT_ROUTE)
        setPaymentsGroupsHistory(paymentsGroupsHistory.filter((_, index) => index !== paymentsGroupsHistory.length - 1))
    }

    const handleDeletePaymentsGroup = async (paymentsGroupId) => {
        await deletePaymentsGroup(paymentsGroupId)
        fetchPaymentsGroup(lastPaymentsGroup).then(data => setPaymentsGroups(data))
    }

    const handleDeletePayment = async (paymentId) => {
        await deletePayment(paymentId)
        fetchPayments(lastPaymentsGroup).then(data => setPayments(data))
    }

    useEffect(() => {
        setLastPaymentsGroup(paymentsGroupsHistory.at(-1))
    }, [paymentsGroupsHistory])

    useEffect(() => {
        fetchPaymentsGroup(lastPaymentsGroup).then(data => setPaymentsGroups(data))
        fetchPayments(lastPaymentsGroup).then(data => setPayments(data))
    }, [lastPaymentsGroup])

    useEffect(() => {
        if (!createPaymentsGroupVisible || !updatePaymentsGroupVisible) {
            fetchPaymentsGroup(lastPaymentsGroup).then(data => setPaymentsGroups(data))
        }
    }, [createPaymentsGroupVisible, updatePaymentsGroupVisible])

    useEffect(() => {
        if (!createPaymentVisible || !updatePaymentVisible) {
            fetchPayments(lastPaymentsGroup).then(data => setPayments(data))
        }
    }, [createPaymentVisible, updatePaymentVisible])

    return (
        <Container>
            <h1 className='text-center'>Платежи</h1>
            <Row className='mb-3'>
                <Col md={6}>
                    <Button className='mt-2'
                        variant={"outline-dark"}
                        style={{ width: '100%' }}
                        onClick={() => setCreatePaymentsGroupVisible(true)}
                    >
                        Добавить новую группу платежей
                    </Button>
                </Col>
                <Col md={6}>
                    <Button className='mt-2'
                        variant={"outline-dark"}
                        style={{ width: '100%' }}
                        onClick={() => setCreatePaymentVisible(true)}
                    >
                        Добавить новый платеж
                    </Button>
                </Col>
            </Row>
            {paymentsGroups.map((paymentsGroup, index) =>
                <Row className='mt-2' key={index}>
                    <Card className='d-flex justify-content-center' onClick={() => changePaymentsGroup(paymentsGroup)}
                        style={{ height: 40, cursor: 'pointer', background: '#EEEEEE' }}>
                        <Row>
                            <Col md={1} style={{ width: 50 }}>
                                <Image src={folderIcon} width={25} height={25} />
                            </Col>
                            {paymentsGroup.name}
                            <Col className='d-flex justify-content-end'>
                                <Button size='sm'
                                    variant='outline'
                                    onClick={e => { e.stopPropagation(); setSelectedPaymentsGroup(paymentsGroup); setUpdatePaymentsGroupVisible(true) }}
                                >
                                    Редактировать
                                </Button>
                                <Button className='ms-2'
                                    size='sm'
                                    variant='outline-danger'
                                    onClick={e => { e.stopPropagation(); handleDeletePaymentsGroup(paymentsGroup.id) }}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            )
            }
            {payments.map((payment, index) =>
                <Row className='mt-2' key={index}>
                    <Card className='d-flex justify-content-center'
                        style={{ height: 40, cursor: 'pointer', background: '#EEEEEE' }}>
                        <Row>
                            <Col md={1} style={{ width: 50 }}>
                                <Image src={paymentIcon} width={25} height={25} />
                            </Col>
                            {payment.name}
                            <Col className='d-flex justify-content-end'>
                                <Button size='sm'
                                    variant='outline'
                                    onClick={e => { e.stopPropagation(); setSelectedPayment(payment); setUpdatePaymentVisible(true) }}
                                >
                                    Редактировать
                                </Button>
                                <Button className='ms-2'
                                    size='sm'
                                    variant='outline-danger'
                                    onClick={e => { e.stopPropagation(); handleDeletePayment(payment.id) }}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            )
            }
            {lastPaymentsGroup !== 0 &&
                <Row className='mt-2' onClick={() => goBack()}>
                    <Card className='d-flex justify-content-center'
                        style={{ height: 30, cursor: 'pointer', background: '#EEEEEE' }}>
                        <Row>
                            <Col md={1} style={{ width: 50 }} />
                            Назад
                        </Row>
                    </Card>
                </Row>}
            <CreatePaymentsGroup show={createPaymentsGroupVisible} onHide={() => setCreatePaymentsGroupVisible(false)} parentId={lastPaymentsGroup} />
            <CreatePayment show={createPaymentVisible} onHide={() => setCreatePaymentVisible(false)} paymentsGroupId={lastPaymentsGroup} />
            <UpdatePaymentsGroup show={updatePaymentsGroupVisible}
                onHide={() => setUpdatePaymentsGroupVisible(false)}
                paymentsGroup={selectedPaymentsGroup} />
            <UpdatePayment show={updatePaymentVisible} onHide={() => setUpdatePaymentVisible(false)} payment={selectedPayment} />
        </Container>
    );
})

export default AdminPayments;