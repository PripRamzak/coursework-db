import React from 'react';
import { Container } from 'react-bootstrap';
import PersonCard from '../components/PersonCard';
import PersonCardRequest from '../components/PersonCardRequest';
import PersonLoan from '../components/PersonLoan';

function PersonalAccount() {
    return (
        <Container>
            <PersonCard />
            <PersonLoan />
            <PersonCardRequest />
        </Container >
    );
}

export default PersonalAccount;
