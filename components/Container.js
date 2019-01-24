import React from "react"
import Col from "react-bootstrap/lib/Col"

const Container = props => {
    return (
        <Col className={`nes-container ${props.type}  ${props.align}`}>
            {props.children}
        </Col>
    )
}

export default Container
