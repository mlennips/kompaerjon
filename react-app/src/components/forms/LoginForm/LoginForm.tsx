import React, { FC, SyntheticEvent, useContext } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import './LoginForm.scss';

interface LoginFormProps { }

const LoginForm: FC<LoginFormProps> = () => {
  let navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = (event: SyntheticEvent) => {
    event.preventDefault();
    var { email, password } = document.forms[0];
    login(email.value, password.value);
  };

  return <>
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        {/* <Form.Label>Email</Form.Label> */}
        <Form.Control type="email" name="email" placeholder="Email" defaultValue="demo@lennips.de" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        {/* <Form.Label>Passwort</Form.Label> */}
        <Form.Control type="password" name="password" placeholder="Passwort" defaultValue="Demo%1234" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Anmelden
      </Button>
    </Form>
  </>
};

export default LoginForm;
