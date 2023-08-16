import React, { useState } from "react";
import { Button, Navbar, Form, Container, Nav } from "react-bootstrap/";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  function handleSignOut() {
    setisAuthenticated(false);
  }
  function handleSignIn() {
    setisAuthenticated(true);
  }
  return (
    <>
      <div>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand as={NavLink} to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bag-heart"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
                />
              </svg>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/users">
                  Users
                </Nav.Link>
                <Nav.Link as={NavLink} to="/brands">
                  Brands
                </Nav.Link>
                <Nav.Link as={NavLink} to="/categories">
                  Categories
                </Nav.Link>
                <Nav.Link as={NavLink} to="/orders">
                  Orders
                </Nav.Link>
                <Nav.Link as={NavLink} to="/product/add">
                  Add New Product
                </Nav.Link>
              </Nav>
              <div className="d-flex">
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
                <Button variant="primary" as={NavLink} to="/signup">
                  Sign Up
                </Button>
                <Button variant="primary" as={NavLink} to="/login">
                  Log In
                </Button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}
