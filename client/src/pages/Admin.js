import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateCardType from '../components/modals/CreateCardType';
import CreateWorkerAccount from '../components/modals/CreateWorkerAccount';
import CreateLoanType from '../components/modals/CreateLoanType';
import { exportAccounts, exportPersons } from '../http/userApi';
import { exportCardRequests, exportCardTypes, exportCards } from '../http/cardApi';
import { exportLoanRequests, exportLoanTypes, exportLoans } from '../http/loanApi';
import { exportPayments } from '../http/paymentApi';

function Admin() {
	const [workerVisible, setWorkerVisible] = useState(false)
	const [cardVisible, setCardVisible] = useState(false)
	const [loanVisible, setLoanVisible] = useState(false)

	const exportData = async () => {
		await exportAccounts()
		await exportPersons()
		await exportCards()
		await exportCardTypes()
		await exportCardRequests()
		await exportLoans()
		await exportLoanTypes()
		await exportLoanRequests()
		await exportPayments()
	}
	
	return (
		<Container className='d-flex flex-column'>
			<Button variant={"outline-dark"} className='mt-2' onClick={() => setWorkerVisible(true)}>Создать аккаунт сотрудника</Button>
			<Button variant={"outline-dark"} className='mt-2' onClick={() => setCardVisible(true)}>Добавить новую карту</Button>
			<Button variant={"outline-dark"} className='mt-2' onClick={() => setLoanVisible(true)}>Добавить новый кредит</Button>
			<Button variant={"outline-dark"} className='mt-2' onClick={exportData}>Экспортировать базу данных</Button>
			<CreateWorkerAccount show={workerVisible} onHide={() => setWorkerVisible(false)} />
			<CreateCardType show={cardVisible} onHide={() => setCardVisible(false)} />
			<CreateLoanType show={loanVisible} onHide={() => setLoanVisible(false)} />
		</Container>
	);
}

export default Admin;
