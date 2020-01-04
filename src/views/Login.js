import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';


class Login extends Component {

  render() {
    return (
      <Container>
        <Alert variant="primary">Login page</Alert>
        <Link to="/">
          <Button variant="info">Back</Button>
        </Link>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
