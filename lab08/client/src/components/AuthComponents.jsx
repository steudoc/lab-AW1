import { useState } from "react";
import { Button, Col, Form, Row, Alert } from "react-bootstrap";
import { Link } from "react-router";

export function LoginForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const credentials = { username, password };
        await props.handleLogin(credentials);
    }

    return(
        <Row className="d-flex justify-content-center mt-5">
            <Col md={6}>
                {props.message && <Row> <Col md={12}>
                    <Alert variant={props.message.type} onClose={() => props.setMessage("")} dismissible>{props.message.msg}</Alert>
                </Col></Row>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="username" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="username" required value={username} onChange={(ev) => setUsername(ev.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="password" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" required value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                    </Form.Group>
                    <Button type="submit">Login</Button>
                    <Link className="btn btn-danger mx-2 my-2" to={"/"}>Cancel</Link>
                </Form>
            </Col>
        </Row>
    );
}

export function LogoutButton(props) {
    return <Button variant="outline-light" onClick={props.logout}>Logout</Button>;
}