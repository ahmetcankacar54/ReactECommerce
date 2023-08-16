import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ProductService from "../../services/productService";
import {
  Button,
  Row,
  Carousel,
  Card,
  Col,
  Dropdown,
  DropdownButton,
  Container,
  Modal,
  Alert,
} from "react-bootstrap/";

export default function SingleProductPage() {
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  let productService = new ProductService();

  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let productService = new ProductService();
    productService.getByProductId(id).then((result) => {
      console.log(result);
      setProduct(result.data.product);
    });
  }, []);

  function deleteProductHandler() {
    productService.deleteProductById(id).then((result) => {
      console.log(result);
    });
  }

  return (
    <>
      <Row xs={1} className="g-4">
        <Col className="col-6">
          <Card key={product.id}>
            <Carousel>
              <Carousel.Item interval={3000}>
                <img
                  class="w-100 card-img-top"
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp-spacegray-select-202206_GEO_TR?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664497359572"
                  alt="image"
                />
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <img
                  class="w-100 card-img-top"
                  src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673229"
                  alt="image"
                />
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <img
                  class="w-100 card-img-top"
                  src="data:image/jpeg;base64,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"
                  alt="image"
                />
              </Carousel.Item>
            </Carousel>
          </Card>
        </Col>
        <Col className="col-6">
          <Card key={product.id}>
            <Card.Body>
              <Container className="d-flex justify-content-between ">
                <Card.Title>{product.name}</Card.Title>
                <DropdownButton
                  id="dropdown-variants-Secondary"
                  title="Edit"
                  className="justify-content-md-end "
                >
                  <Dropdown.Item href="/update">Update Product</Dropdown.Item>
                  <Dropdown.Item onClick={handleShow}>
                    Delete Product
                  </Dropdown.Item>
                </DropdownButton>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure, want to delete the product?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cancel
                    </Button>

                    <Button
                      variant="danger"
                      alert
                      onClick={(event) => {
                        handleClose();
                        setShowAlert(true);
                        deleteProductHandler();
                      }}
                    >
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Container>

              <Card.Text>
                Category: <br />
                {product.categoryId}{" "}
              </Card.Text>

              <Card.Text>
                Brand: <br />
                {product.brandId}{" "}
              </Card.Text>
              <Card.Text>
                Description: <br />
                {product.description}
              </Card.Text>
              <Card.Text>
                Stock:
                <br />
                {product.stock}{" "}
              </Card.Text>
              <Card.Text>
                Price:
                <br /> {product.price} ₺
              </Card.Text>
              <Button variant="primary">Add To Cart</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Alert show={showAlert} variant="success">
        <Alert.Heading>Product Deleted Successfully!</Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button
            as={NavLink}
            to="/"
            onClick={() => setShowAlert(false)}
            variant="outline-success"
          >
            Back To Mainpage
          </Button>
        </div>
      </Alert>
    </>
  );
}
