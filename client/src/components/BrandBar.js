import React, { useContext } from 'react';
import { Row, Card, Col } from 'react-bootstrap';
import { observer } from 'mobx-react-lite'
import { Context } from '../index'


const BrandBar = observer(() => {
    const { device } = useContext(Context)
    return (
        <Row className="d-flex">
            {device.brands.map(brand =>
                <Col md="auto">
                    <Card
                        key={brand.id}
                        style={{ cursor: 'pointer' }}
                        className="p-3"
                        onClick={() => device.setSelectedBrand(brand)}
                        border={brand.id === device.selectedBrand.id ? 'dark' : 'light'}>
                        {brand.name}
                    </Card>
                </Col>
            )}
        </Row>
    );
})

export default BrandBar;
