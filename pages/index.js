import React from "react"
import Container from "../components/Container"
import Button from "react-bootstrap/lib/Button"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"

import { TodoFormInputs, TodoFormDescription } from "../components/TodoForm"

const index = () => {
    return (
        <Row>
            <Col md={12} lg={12}>
                <Container type="with-title" align="is-centered">
                    <h1>Todo list</h1>
                </Container>
                <Container type="form">
                    <TodoFormInputs />
                </Container>
            </Col>
        </Row>
    )
}

export default index
