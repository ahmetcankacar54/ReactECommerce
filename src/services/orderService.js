import axios from "axios";

export default class OrderService {
  getOrders() {
    return axios.get("http://localhost:5032/api/Order");
  }
  createOrder(data) {
    return axios.post("http://localhost:5032/api/Order", data);
  }
  updateOrder(data) {
    return axios.put("http://localhost:5032/api/Order", data);
  }

  deleteOrderById(id) {
    return axios.delete(
      "http://localhost:5032/api/Order/" + id,
      { config: "DELETE" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
