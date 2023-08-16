import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UserService from "../../services/userService";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    };
    this.UserService = new UserService();

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
  }

  changeNameHandler = (e) => {
    console.log(e.target.value);
    this.setState({ name: e.target.value });
  };
  changeEmailHandler = (e) => {
    this.setState({ email: e.target.value });
  };
  changePasswordHandler = (e) => {
    this.setState({ password: e.target.value });
  };
  changePhoneNumberHandler = (e) => {
    this.setState({ phoneNumber: e.target.value });
  };

  HandleSubmit = (e) => {
    e.preventDefault();
    let newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber,
    };
    console.log("New User => " + JSON.stringify(newUser));
    this.UserService.createUser(newUser).then((response) => {
      console.log(response.status, response.data);
    });
  };

  render() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.changeEmailHandler}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            name="name"
            type="text-muted"
            placeholder="Full Name"
            value={this.state.name}
            onChange={this.changeNameHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            name="phoneNumber"
            type="phone"
            placeholder="Phone Number"
            value={this.state.phoneNumber}
            onChange={this.changePhoneNumberHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.changePasswordHandler}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.HandleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default SignUp;
