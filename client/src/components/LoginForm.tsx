import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import { Button, Form, Container } from 'react-bootstrap';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);
    return (
        <Container>
            <Form.Label htmlFor="inputPassword5">Email</Form.Label>
            <Form.Control
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
            />
        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
        <Form.Control
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
        />
        <Form.Text id="passwordHelpBlock" muted>
            Your password must be any non-empty password (even one character).
        </Form.Text>
            <Button type="button" value="input" onClick={() => store.login(email, password)}>
                Login
            </Button>
            <Button onClick={() => store.registration(email, password)}>
                Registration
            </Button>
        </Container>
    );
};

export default observer(LoginForm);