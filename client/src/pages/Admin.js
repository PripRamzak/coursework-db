import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateCardType from '../components/modals/CreateCardType';
import CreateDevice from '../components/modals/CreateDevice';
import CreateWorkerAccount from '../components/modals/CreateWorkerAccount';

function Admin() {
	const [typeVisible, setTypeVisible] = useState(false)
	const [workerVisible, setWorkerVisible] = useState(false)
	const [deviceVisible, setDeviceVisible] = useState(false)
	return (
		<Container className='d-flex flex-column'>
			<Button variant={"outline-dark"} className='mt-2' onClick={() => setTypeVisible(true)}>Добавить новую карту</Button>
			<Button variant={"outline-dark"} className='mt-2' onClick={() => setWorkerVisible(true)}>Создать аккаунт сотрудника</Button>
			<Button variant={"outline-dark"} className='mt-2' onClick={() => setDeviceVisible(true)}>Добавить устройство</Button>
			<CreateCardType show={typeVisible} onHide={() => setTypeVisible(false)} />
			<CreateWorkerAccount show={workerVisible} onHide={() => setWorkerVisible(false)} />
			{/*<CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />*/}
		</Container>
	);
}

export default Admin;
