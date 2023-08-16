import React, { useEffect, useState } from "react";
import CategoryService from "../services/categoryService";
import { Navbar, Container } from "react-bootstrap/";

export default function Categories() {
  const [categories, setCategory] = useState([]);

  useEffect(() => {
    let categoryService = new CategoryService();
    categoryService.getCategories().then((result) => {
      console.log(result);
      setCategory(result.data.categories);
    });
  }, []);
  return (
    <div>
      {categories.map((category) => (
        <React.Fragment key={category.Id}>
          <Navbar className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#home" style={{ fontSize: "1em" }}>
                {category.name}{" "}
              </Navbar.Brand>
            </Container>
          </Navbar>
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}
