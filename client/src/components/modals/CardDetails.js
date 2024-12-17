import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function CardDetails({ show, onHide, card }) {

    if (!card)
        return;

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="sm"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Реквизиты карты
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Номер карты: {card.number}</p>
                <p>Срок карты: {card.expire_date}</p>
                <p>CVV: {card.cvv}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CardDetails;
