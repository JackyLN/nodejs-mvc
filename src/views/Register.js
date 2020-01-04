import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';


class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formEmail: '',
      formPassword: '',
      formAge: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (event) => {

    const { history } = this.props;
    
    event.preventDefault();
    fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.formEmail,
        password: this.state.formPassword,
        age: this.state.formAge
      })
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.message == 'User existed') {
        alert(data.message);
      }
      else {
        history.push('/');
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  
  render() {
    return (
      <Container>
        <Alert variant="primary">Register page</Alert>
        <Link to="/">
          <Button variant="info">Back</Button>
        </Link>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="formEmail" type="email" placeholder="Enter email" value={this.state.formEmail} onChange={this.handleInputChange}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="formPassword" type="password" placeholder="Password" value={this.state.formPassword} onChange={this.handleInputChange} />
          </Form.Group>
          <Form.Group controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control name="formAge" type="number" placeholder="Age" value={this.state.formAge} onChange={this.handleInputChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Register;
