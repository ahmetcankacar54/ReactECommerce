import axios from "axios";

export default class UserService {
  getUsers() {
    return axios.get("http://localhost:5032/api/User");
  }
  createUser(data) {
    return axios.post("http://localhost:5032/api/User", data);
  }
  updateUser(data) {
    return axios.put("http://localhost:5032/api/User", data);
  }

  deleteUserById(id) {
    return axios.delete(
      "http://localhost:5032/api/User/" + id,
      { config: "DELETE" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
