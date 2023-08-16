import React, { useEffect, useState } from "react";
import { Table, Row, Button, Modal, Form, Alert } from "react-bootstrap/";
import { number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import OrderService from "../../services/orderService";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);
  const [orderId, setOrderId] = useState(11);
  const [showDelete, setShowDelete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);

  let orderService = new OrderService();

  const initialValues = {
    id: 1,
    orderNumber: 1,
    adress: "Next Level Loft Ofis Ankara/Cankaya",
    productId: 1,
    userId: 1,
  };

  const orderSchema = object({
    id: number().positive().integer().required(),
    orderNumber: number().positive().integer().required(),

    adress: string(),
    productId: number().positive().integer().required(),
    userId: number().positive().integer().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(orderSchema),
  });

  const onSubmit = (data) => {
    orderService.updateOrder(data).then((result) => {
      console.log(result);
    });
    console.log(data);
  };

  const handleDelete = () => {
    console.log(orderId);
    orderService.deleteOrderById(orderId).then((result) => {
      console.log(result);
    });
  };

  const getCategories = useEffect(() => {
    orderService.getOrders().then((result) => {
      console.log(result);
      setOrders(result.data.orders);
    });
  }, []);

  return (
    <>
      <Row xs={1} md={4} className="g-4">
        <Table striped bordered hover>
          <thead>
            <tr key="order.id">
              <th>Id</th>
              <th>Order Number</th>
              <th>Adress</th>
              <th>Product ID</th>
              <th>User ID</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr>
                <td name="id">{order.id}</td>
                <td name="orderNumber">{order.orderNumber}</td>
                <td name="adress">{order.adress}</td>
                <td name="productId">{order.productId}</td>
                <td name="userId">{order.userId}</td>

                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setOrderId(order.id);
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
                <Modal.Title>Delete Order</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure, want to delete the order?</Modal.Body>
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
                <Modal.Title>Update Order</Modal.Title>
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
                    <Form.Label>Order Number</Form.Label>
                    <Form.Control
                      name="orderNumber"
                      type="integer"
                      {...register("orderNumber")}
                      placeholder={initialValues.orderNumber}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Adress</Form.Label>
                    <Form.Control
                      name="adress"
                      type="string"
                      {...register("adress")}
                      placeholder={initialValues.adress}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control
                      name="productId"
                      type="integer"
                      {...register("productId")}
                      placeholder={initialValues.productId}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>User ID</Form.Label>
                    <Form.Control
                      name="userId"
                      type="integer"
                      {...register("userId")}
                      placeholder={initialValues.userId}
                    />
                  </Form.Group>
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
        <h6>The Order Updated Successfully!</h6>
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
        <h6>The Order Deleted Successfully!</h6>
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

export default OrderList;
