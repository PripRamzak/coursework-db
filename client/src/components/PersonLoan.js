import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import CreateLoanRequest from './modals/CreateLoanRequest';
import LoanPayment from './modals/LoanPayment';

const PersonLoan = observer(() => {
    const { account, loan } = useContext(Context)

    const [loanRequestVisible, setLoanRequestVisible] = useState(false)
    const [loanPaymentVisible, setLoanPaymentVisible] = useState(false)

    const getLoanTypeName = (loanTypeId) => {
        if (loan.types.length === 0)
            return ''
        return loan.types.find(type => type.id === loanTypeId).name
    }

    const getLoanTypeImg = (loanTypeId) => {
        if (loan.types.length === 0)
            return ''
        return loan.types.find(type => type.id === loanTypeId).img
    }

    return (
        <React.Fragment>
            <h1 className='mt-2 text-center'>
                Кредиты
            </h1>
            {loan.userLoans.length === 0 ?
                <div className='d-flex flex-column text-center mt-2'>
                    <h3 style={{ color: 'gray' }}>У вас нет кредитов</h3>
                    <Button className='mt-2 d-flex' variant='outline-dark' onClick={() => setLoanRequestVisible(true)}>Оформить</Button>
                    <CreateLoanRequest show={loanRequestVisible} onHide={() => setLoanRequestVisible(false)} />
                </div>
                :
                <div className='mt-3 d-flex justify-content-center'>
                    <Card style={{ width: '80%' }}>
                        <Card.Body >
                            <Card.Title className='h1 text-center' style={{ fontSize: '1.75rem' }}>{getLoanTypeName(loan.userLoans[0].loanTypeId)}</Card.Title>
                            <Row className='mt-3'>
                                <Col className='d-flex justify-content-center' md={5}>
                                    <Card.Img
                                        height={300}
                                        style={{ width: '65%' }}
                                        src={process.env.REACT_APP_API_URL + getLoanTypeImg(loan.userLoans[0].loanTypeId)} />
                                </Col>
                                <Col className='ms-4 ' md={6}>
                                    <Row className='text-center'>
                                        <Card.Text className='mb-0' style={{ fontSize: '1.35rem' }}>
                                            <span className='fw-bold'>Дата окончания кредита:</span> {loan.userLoans[0].date}
                                        </Card.Text>
                                        <Card.Text className='mb-5' style={{ fontSize: '1.35rem' }}>
                                            <span className='fw-bold'>Оставшаяся сумма кредита:</span> {loan.userLoans[0].amount.toFixed(2)}
                                        </Card.Text>
                                    </Row>
                                    <Row className='ms-2 d-flex justify-content-center align-items-end' style={{ height: '55%' }}>
                                        <Button variant='outline-dark' onClick={() => setLoanPaymentVisible(true)}>
                                            Оплатить кредит
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            }
            <LoanPayment show={loanPaymentVisible} onHide={() => setLoanPaymentVisible(false)} />
        </React.Fragment>
    );
})

export default PersonLoan;
