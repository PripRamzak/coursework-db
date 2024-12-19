import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import mcDuck from '../assets/mc-duck.png';
import cardImage from '../assets/card_prev.png'
import ActivationNotification from '../components/modals/ActivationNotification';

const Bank = observer(() => {
    const { account } = useContext(Context)

    const [notificationVisible, setNotificationVisible] = useState(false)

    useEffect(() => {
        if (account.activationRequest)
            if (account.activationRequest.status != 'Обрабатывается') {
                console.log(true)
                setNotificationVisible(true)
            }
    }, [account.activationRequest])

    return (
        <Container>
            <Carousel width='500' data-bs-theme="dark">
                <Carousel.Item>
                    <Row>
                        <Col xs={12} sm={4} md={4}>
                            <Image height={500} src={mcDuck} />
                        </Col>
                    </Row>
                    <Carousel.Caption>
                        <h2>Не копите, а вкладывайте</h2>
                        <p>СкруджБанк - место, где ваши деньги любят</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Row className='d-flex justify-content-center'>
                        <Col xs={12} sm={4} md={4}>
                            <Image className='mb-5' width='100%' height={450} src={cardImage} />
                        </Col>
                    </Row>
                    <Carousel.Caption>
                        <h2>Лучшие банковские карты</h2>
                        <p>Самый стильный дизайн</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <ActivationNotification show={notificationVisible} onHide={() => setNotificationVisible(false)} />
        </Container >
    );
})

export default Bank;
