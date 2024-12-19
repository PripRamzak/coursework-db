import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import mcDuck from '../assets/mc-duck.png';
import cardImage from '../assets/card_prev.png'
import { fetchCardTypes } from '../http/cardApi';
import { fetchLoanTypes } from '../http/loanApi';
import ActivationNotification from '../components/modals/ActivationNotification';

const Bank = observer(() => {
    const { account, card, loan } = useContext(Context)

    const [notificationVisible, setNotificationVisible] = useState(false)

    useEffect(() => {
        fetchCardTypes().then(data => card.setTypes(data))
        fetchLoanTypes().then(data => loan.setTypes(data))
    }, [])

    useEffect(() => {
        if (account.activationRequest)
            if (account.activationRequest.status != 'Обрабатывается')
            {
                console.log(true)
                setNotificationVisible(true)
            }
    }, [account.activationRequest])

    /*useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 4).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 4).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand]
    )*/

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
