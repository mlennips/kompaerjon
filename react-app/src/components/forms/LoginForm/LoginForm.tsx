import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../services/AuthService';
import './LoginForm.scss';

interface LoginFormProps { }

const LoginForm: FC<LoginFormProps> = () => {
  let navigate = useNavigate();

  const handleLogin = (event: any) => {
    // Prevent page reload
    event.preventDefault();
    var { email, password } = document.forms[0];
    AuthService.login(email.value, password.value).then(value => {
      // warten auf token 
      navigate('/users/' + value.userId);
    });
  };

  return <>
    <Form onSubmit={handleLogin}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      {/* <Form.Label>Email</Form.Label> */}
      <Form.Control type="email" name="email" placeholder="Email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      {/* <Form.Label>Passwort</Form.Label> */}
      <Form.Control type="password" name="password" placeholder="Passwort" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Anmelden
    </Button>
  </Form>
  </>
};

export default LoginForm;
