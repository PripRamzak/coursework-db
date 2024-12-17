import React from 'react';
import { Button, Modal } from 'react-bootstrap';

function CardDetails({ show, onHide, card }) {

    if (!card)
        return;

    const formatDate = (dateString) => {
        const dateParts = dateString.split('-');
        const year = dateParts[0].substring(2);
        const month = dateParts[1]; 
        return `${month}/${year}`;
    };

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
                <p>Номер карты: {card.number.replace(/(\d{4})(?=\d)/g, '$1 ')}</p>
                <p>Срок карты: {formatDate(card.expire_date)}</p>
                <p>CVV: {card.cvv}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CardDetails;
