import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Table, Container, Button, Row, Col } from 'react-bootstrap';

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isUsed: false,
      dataTable: []
    }

    //this.fetchDataTable = this.fetchDataTable.bind(this)
  }

  componentDidMount() {
    this.fetchDataTable();
  }

  handleEdit = (event) => {
  }

  handleDetele = (event) => {
    const target = event.target;
    const userid = target.getAttribute('userid');
    const deleteUrl = 'http://localhost:3000/user/' + userid;
    fetch(deleteUrl, {
      method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == 'Deleted This User'){
        alert(data.message)
        this.fetchDataTable();
      }
    });
  }

  fetchDataTable = () => {
    fetch('http://localhost:3000/user')
      .then(response => response.json())
      .then(data => {
        if(data.message == null && data.message == 'No users'){
          this.setState({ isUsed: false});
        } else {
          this.setState({
            isUsed: true,
            dataTable: data
          });
          console.log(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });;
  }
  
  render() {
    let that = this;
    const { isUsed } = this.state;

    const userTable = (
      <Table striped bordered hover size="sm" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Password</th>
            <th>Age</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.dataTable.map(function(dt, index) {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{dt.email}</td>
                  <td>{dt.password}</td>
                  <td>{dt.age}</td>
                  <td>
                    <Button variant="warning" userid={dt._id} onClick={that.handleEdit}>Edit</Button>
                    <Button variant="danger" userid={dt._id} onClick={that.handleDetele}>Delete</Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    );

    const MainMarkup = isUsed
      ? userTable :
      (
        <Alert variant="success">There is no user</Alert>
      );

    return (
      <Container>
        <Alert variant="primary">User List</Alert>
        {MainMarkup}

        <Row>
          <Col>
            <Link to="/register">
              <Button variant="primary">Register</Button>
            </Link>
          </Col>
          <Col>
            <Link to="/login">
              <Button variant="info">Login</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
