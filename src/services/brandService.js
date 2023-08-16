import axios from "axios";

export default class BrandService {
  getBrands() {
    return axios.get("http://localhost:5032/api/Brand");
  }
  createBrand(data) {
    return axios.post("http://localhost:5032/api/Brand", data);
  }
  updateBrand(data) {
    return axios.put("http://localhost:5032/api/Brand", data);
  }

  deleteBrandById(id) {
    return axios.delete(
      "http://localhost:5032/api/Brand/" + id,
      { config: "DELETE" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
