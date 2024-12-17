import React, { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import PersonCard from '../components/PersonCard';
import PersonCardRequest from '../components/PersonCardRequest';
import PersonLoan from '../components/PersonLoan';
import PersonPayments from '../components/PersonPayments';
import { fetchCardRequests, fetchCards } from '../http/cardApi';
import { fetchLoans } from '../http/loanApi';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const PersonalAccount = observer(() => {
    const { account, card, loan } = useContext(Context)

    useEffect(() => {
        fetchCards(account.personId).then(data => card.setUserCards(data))
        fetchLoans(account.personId).then(data => loan.setUserLoans(data))
        fetchCardRequests(account.personId).then(data => card.setUserRequests(data))
    }, [account])


    return (
        <Container>
            <PersonCard />
            <PersonPayments />
            <PersonLoan />
            <PersonCardRequest />
        </Container >
    );
})

export default PersonalAccount;
