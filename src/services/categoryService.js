import axios from "axios";

export default class CategoryService {
  getCategories() {
    return axios.get("http://localhost:5032/api/Category");
  }
  createCategory(data) {
    return axios.post("http://localhost:5032/api/Category", data);
  }
  updateCategory(data) {
    return axios.put("http://localhost:5032/api/Category", data);
  }

  deleteCategoryById(id) {
    return axios.delete(
      "http://localhost:5032/api/Category/" + id,
      { config: "DELETE" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
