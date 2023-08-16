import React, { useEffect, useState } from "react";
import { Table, Row, Button, Modal, Form, Alert } from "react-bootstrap/";
import { number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CategoryService from "../../services/categoryService";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [categoryId, setCategoryId] = useState(11);
  const [showDelete, setShowDelete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);

  let categoryService = new CategoryService();

  const initialValues = {
    id: 1,
    name: "Computer Gadgets",
  };

  const categorySchema = object({
    id: number().positive().integer().required(),
    name: string(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const onSubmit = (data) => {
    categoryService.updateCategory(data).then((result) => {
      console.log(result);
    });
    console.log(data);
  };

  const handleDelete = () => {
    console.log(categoryId);
    categoryService.deleteCategoryById(categoryId).then((result) => {
      console.log(result);
    });
  };

  const getCategories = useEffect(() => {
    categoryService.getCategories().then((result) => {
      console.log(result);
      setCategories(result.data.categories);
    });
  }, []);

  return (
    <>
      <Row xs={1} md={4} className="g-4">
        <Table striped bordered hover>
          <thead>
            <tr key="category.id">
              <th>Id</th>
              <th>Category Name</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr>
                <td name="id">{category.id}</td>
                <td name="name">{category.name}</td>

                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setCategoryId(category.id);
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
                <Modal.Title>Delete Category</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure, want to delete the category?
              </Modal.Body>
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
                <Modal.Title>Update Category</Modal.Title>
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
                    <Form.Label>Category name</Form.Label>
                    <Form.Control
                      name="name"
                      type="string"
                      {...register("name")}
                      placeholder={initialValues.name}
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

export default CategoryList;
