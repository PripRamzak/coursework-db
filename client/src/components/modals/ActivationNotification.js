import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Context } from '../..';
import { deleteActivationRequest } from '../../http/userApi';

function ActivationNotification({ show, onHide }) {
    const {account} = useContext(Context)
    
    const handleDelete = async () => {
        try {
            await deleteActivationRequest(account.activationRequest.id)
            account.setActivationRequest(null);
        }
        catch (e) {
            throw new Error(e.message);
        }
    }

    console.log(account.activationRequest)

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Уведомление
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    account.activationRequest &&
                    <p>{account.activationRequest.status == 'Одобрено' ? "Ваш запрос на активацию одобрен" : "Ваш запрос на активацию отклонен"}</p>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={() => { handleDelete(); onHide(); }}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ActivationNotification;
