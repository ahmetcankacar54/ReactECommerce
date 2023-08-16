import React, { useEffect, useState } from "react";
import { Table, Row, Button, Modal, Form, Alert } from "react-bootstrap/";
import UserService from "../../services/userService";
import { number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function UserList() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(11);
  const [showDelete, setShowDelete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);

  let userService = new UserService();

  const initialValues = {
    id: 1,
    name: "Suleyman Cakir",
    email: "example@mail.com",
    password: "password",
    phoneNumber: "+90 512 345 67 89",
  };

  const userSchema = object({
    id: number().positive().integer().required(),
    name: string(),
    email: string().email(),
    password: string(),
    phoneNumber: string(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = (data) => {
    userService.updateUser(data).then((result) => {
      console.log(result);
    });
    console.log(data);
  };

  const handleDelete = () => {
    console.log(userId);
    userService.deleteUserById(userId).then((result) => {
      console.log(result);
    });
  };

  const getUsers = useEffect(() => {
    userService.getUsers().then((result) => {
      console.log(result);
      setUsers(result.data.users);
    });
  }, []);

  return (
    <>
      <Row xs={1} md={4} className="g-4">
        <Table striped bordered hover>
          <thead>
            <tr key="user.id">
              <th>Id</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td name="id">{user.id}</td>
                <td name="name">{user.name}</td>
                <td name="email">{user.email}</td>
                <td name="phonenumber">{user.phoneNumber}</td>

                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setUserId(user.id);
                      handleDeleteShow();
                    }}
                  >
                    Delete
                  </Button>
                </td>

                <td>
                  <Button onClick={handleShow}>Update</Button>
                </td>
              </tr>
            ))}

            {/* Delete Button Modal Start */}

            <Modal show={showDelete} onHide={handleDeleteClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure, want to delete the user?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteClose}>
                  Close
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDeleteClose();
                    handleDelete();
                    setShowDeleteAlert(true);
                  }}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Delete Button Modal End */}

            {/* Update Button Modal Start */}

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                      name="id"
                      type="integer"
                      {...register("id")}
                      placeholder={initialValues.id}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Full name</Form.Label>
                    <Form.Control
                      name="name"
                      type="string"
                      {...register("name")}
                      placeholder={initialValues.name}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      {...register("email")}
                      placeholder={initialValues.email}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      name="password"
                      type="pasword"
                      {...register("password")}
                      placeholder={initialValues.password}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Phone number</Form.Label>

                    <Form.Control
                      name="phoneNumber"
                      type="phoneNumber"
                      {...register("phoneNumber")}
                      placeholder={initialValues.phoneNumber}
                    />
                  </Form.Group>{" "}
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={() => {
                        handleClose();
                        setShowAlert(true);
                      }}
                    >
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal.Body>
            </Modal>

            {/* Update Button Modal End */}
          </tbody>
        </Table>
      </Row>

      {/* Update Alert Section Start */}
      <Alert show={showAlert} variant="success">
        <Alert.Heading>Success!</Alert.Heading>
        <h6>The User Updated Successfully!</h6>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowAlert(false)} variant="outline-success">
            Close
          </Button>
        </div>
      </Alert>
      {/* Update Alert Section End */}

      {/* Delete Alert Section Start */}
      <Alert show={showDeleteAlert} variant="success">
        <Alert.Heading>Success!</Alert.Heading>
        <h6>The User Deleted Successfully!</h6>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => setShowDeleteAlert(false)}
            variant="outline-success"
          >
            Close
          </Button>
        </div>
      </Alert>

      {/* Delete Alert Section End */}
    </>
  );
}

export default UserList;
