import React from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import "./Loader.scss";
const Loader = () => (
    <Row className="align-items-center loading">
        <Col className="align-content-center offset-6" md={1}>
            <Spinner animation="grow" size="lg" variant="light" />
        </Col>
    </Row>
)
export default Loader;