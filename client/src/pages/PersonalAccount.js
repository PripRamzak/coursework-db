import React from 'react';
import { Container } from 'react-bootstrap';
import PersonCard from '../components/PersonCard';
import PersonCardRequest from '../components/PersonCardRequest';

function PersonalAccount() {
    return (
        <Container>
            <PersonCard />
            <PersonCardRequest />
        </Container >
    );
}

export default PersonalAccount;
