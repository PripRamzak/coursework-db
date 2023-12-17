import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { fetchLoanTypes } from '../http/loanApi';

const Loans = observer(() => {
    const [loanTypes, setLoanTypes] = useState([])

    useEffect(() => {
        fetchLoanTypes().then(data => setLoanTypes(data))
    }, [])

    return (
        <Container>
            <Row>
                {loanTypes.map(type =>
                    <Col key={type.id} className='mt-3' md={4}>
                        <Card className="text-center" style={{ width: 300, cursor: 'pointer', borderWidth: '2px' }}>
                            <Card.Body>
                                <Card.Title style={{ color: 'gray' }}>{type.name}</Card.Title>
                                <Card.Img width={300} height={200} src={process.env.REACT_APP_API_URL + type.img} />
                                <h6>{type.annual_interest_rate}% годовых</h6>
                                <h6>До {type.max_amount} BYN</h6>
                                <h6>Срок до {type.max_term} лет</h6>
                                <Card.Text>{type.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    );
})

export default Loans;