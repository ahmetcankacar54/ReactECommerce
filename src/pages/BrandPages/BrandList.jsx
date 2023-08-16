import React, { useEffect, useState } from "react";
import { Table, Row, Button, Modal, Form, Alert } from "react-bootstrap/";
import { number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import BrandService from "../../services/brandService";

function BrandList() {
  const [brands, setBrands] = useState([]);
  const [show, setShow] = useState(false);
  const [brandId, setBrandId] = useState(11);
  const [showDelete, setShowDelete] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);

  let brandService = new BrandService();

  const initialValues = {
    id: 1,
    name: "Apple",
    year: 1987,
  };

  const brandSchema = object({
    id: number().positive().integer().required(),
    name: string(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(brandSchema),
  });

  const onSubmit = (data) => {
    brandService.updateBrand(data).then((result) => {
      console.log(result);
    });
    console.log(data);
  };

  const handleDelete = () => {
    console.log(brandId);
    brandService.deleteBrandById(brandId).then((result) => {
      console.log(result);
    });
  };

  const getCategories = useEffect(() => {
    brandService.getBrands().then((result) => {
      console.log(result);
      setBrands(result.data.brands);
    });
  }, []);

  return (
    <>
      <Row xs={1} md={4} className="g-4">
        <Table striped bordered hover>
          <thead>
            <tr key="category.id">
              <th>Id</th>
              <th>Brand Name</th>
              <th>Brand Year</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => (
              <tr>
                <td name="id">{brand.id}</td>
                <td name="name">{brand.name}</td>
                <td name="yeear">{brand.year}</td>

                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setBrandId(brand.id);
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
                <Modal.Title>Delete Brand</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure, want to delete the brand?</Modal.Body>
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
                <Modal.Title>Update Brand</Modal.Title>
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
                    <Form.Label>Brand name</Form.Label>
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
                    <Form.Label>Brand year</Form.Label>
                    <Form.Control
                      name="year"
                      type="string"
                      {...register("year")}
                      placeholder={initialValues.year}
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
        <h6>The Brand Updated Successfully!</h6>
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
        <h6>The Brand Deleted Successfully!</h6>
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

export default BrandList;
