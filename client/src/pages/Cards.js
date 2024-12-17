import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { fetchCardTypes } from '../http/cardApi';

const Cards = observer(() => {
    const { card } = useContext(Context)

    return (
        <Container>
            <Row>
                {card.types.map(type =>
                    <Col key={type.id} className='mt-3' md={4}>
                        <Card className="text-center" style={{ width: 350, cursor: 'pointer', borderWidth: '2px' }}>
                            <Card.Body>
                                <Card.Title className='d-flex justify-content-center' style={{ color: 'gray' }}>{type.name}</Card.Title>
                                <Card.Img className='mt-1' width={300} height={200} src={process.env.REACT_APP_API_URL + type.img} />
                                <Card.Text className='mt-2'>{type.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    );
})

export default Cards;