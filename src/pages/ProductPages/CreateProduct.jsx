import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProductService from "../../services/productService";
import { Modal } from "react-bootstrap";

class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      productCode: 0,
      price: 0,
      stock: 0,
      description: "",
      categoryId: 0,
      brandId: 0,
    };
    this.productService = new ProductService();

    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeProductCodeHandler = this.changeProductCodeHandler.bind(this);
    this.changePriceHandler = this.changePriceHandler.bind(this);
    this.changeStockHandler = this.changeStockHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.changeCategoryIdHandler = this.changeCategoryIdHandler.bind(this);
    this.changeBrandIdHandler = this.changeBrandIdHandler.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
  }

  changeNameHandler = (e) => {
    this.setState({ name: e.target.value });
  };
  changeProductCodeHandler = (e) => {
    this.setState({ productCode: e.target.value });
  };
  changePriceHandler = (e) => {
    this.setState({ price: e.target.value });
  };
  changeStockHandler = (e) => {
    this.setState({ stock: e.target.value });
  };
  changeDescriptionHandler = (e) => {
    this.setState({ description: e.target.value });
  };
  changeCategoryIdHandler = (e) => {
    this.setState({ categoryId: e.target.value });
  };
  changeBrandIdHandler = (e) => {
    this.setState({ brandId: e.target.value });
  };

  HandleSubmit = (e) => {
    e.preventDefault();
    let newProduct = {
      name: this.state.name,
      productCode: this.state.productCode,
      price: this.state.price,
      stock: this.state.stock,
      description: this.state.description,
      categoryId: this.state.categoryId,
      brandId: this.state.brandId,
    };
    console.log("newProduct => " + JSON.stringify(newProduct));
    this.productService.createProduct(newProduct).then((response) => {
      console.log(response.status, response.data);
    });
  };

  render() {
    return (
      <Form>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Product name</Form.Label>
          <Form.Control
            name="productName"
            id="productName"
            type="text"
            placeholder="Enter product name"
            value={this.state.name}
            onChange={this.changeNameHandler}
          />
          <Form.Text className="text-muted">
            Full name of your product.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="productCode">
          <Form.Label>Product Code</Form.Label>
          <Form.Control
            name="productCode"
            id="productCode"
            type="number"
            placeholder="Product code"
            value={this.state.productCode}
            onChange={this.changeProductCodeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            type="number"
            placeholder="Price"
            value={this.state.price}
            onChange={this.changePriceHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="productStock">
          <Form.Label>Product Stock</Form.Label>
          <Form.Control
            name="stock"
            type="number"
            placeholder="Product stock"
            value={this.state.stock}
            onChange={this.changeStockHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            type="text"
            placeholder="Product Description"
            value={this.state.description}
            onChange={this.changeDescriptionHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="categoryId">
          <Form.Label>Category ID</Form.Label>
          <Form.Control
            name="categoryId"
            type="number"
            placeholder="Category ID"
            value={this.state.categoryId}
            onChange={this.changeCategoryIdHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="brandId">
          <Form.Label>Brand ID</Form.Label>
          <Form.Control
            name="brandId"
            type="number"
            placeholder="Brand ID"
            value={this.state.brandId}
            onChange={this.changeBrandIdHandler}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.HandleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default CreateProduct;
