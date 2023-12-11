import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import { fetchCardTypes } from '../http/cardApi';

const Cards = observer(() => {
    const { card } = useContext(Context)

    useEffect(() => {
        fetchCardTypes().then(data => card.setTypes(data))
    }, [])

    return (
        <Container>
            <Row>
                {card.types.map(type =>
                    <Col className='mt-3' md={4}>
                        <Card className="d-flex flex-column align-items-center" style={{width: 350, cursor: 'pointer', borderWidth: '2px'}}>
                            <h2 style={{color: 'gray'}}>{type.name}</h2>
                            <Image className='mt-1' width={300} height={200} src={process.env.REACT_APP_API_URL + type.img} />
                            <Card.Body className="d-flex justify-content-center">{type.description}</Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    );
})

export default Cards;