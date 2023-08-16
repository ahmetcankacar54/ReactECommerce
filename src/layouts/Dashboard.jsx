import React from "react";
import Navigation from "./Navigation";
import Categories from "./Categories";
import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/UserPages/SignUp";
import SingleProductPage from "../pages/ProductPages/SingleProductPage";
import LogIn from "../pages/UserPages/LogIn";
import ProductList from "../pages/ProductPages/ProductList";
import CreateProduct from "../pages/ProductPages/CreateProduct";
import UpdateProduct from "../pages/ProductPages/UpdateProduct";
import UserList from "../pages/UserPages/UserList";
import CategoryList from "../pages/CategoryPages/CategoryList";
import BrandList from "../pages/BrandPages/BrandList";
import OrderList from "../pages/OrderPages/OrderList";

export default function Dashboard() {
  return (
    <>
      <Navigation />
      <div className="container dasboard-container">
        <div className="row" style={{ marginTop: "2em" }}>
          <div className="col-2">
            <Categories />
          </div>
          <div className="col-10">
            <Routes>
              <Route exact path="/" element={<ProductList />} />
              <Route exact path="/products" element={<ProductList />} />
              <Route path="/product/add" element={<CreateProduct />} />
              <Route path="/products/:id" element={<SingleProductPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route path="/update" element={<UpdateProduct />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/brands" element={<BrandList />} />
              <Route path="/orders" element={<OrderList />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
