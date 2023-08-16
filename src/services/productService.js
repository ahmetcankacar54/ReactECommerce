import axios from "axios";

export default class ProductService {
  getProducts() {
    return axios.get("http://localhost:5032/api/Product");
  }
  getByProductId(id) {
    return axios.get("http://localhost:5032/api/Product/" + id);
  }
  createProduct(data) {
    return axios.post("http://localhost:5032/api/Product", data);
  }
  updateProduct(data) {
    return axios.put("http://localhost:5032/api/Product/", data, {
      config: "PUT",
    });
  }
  deleteProductById(id) {
    return axios.delete(
      "http://localhost:5032/api/Product/" + id,
      { config: "DELETE" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
