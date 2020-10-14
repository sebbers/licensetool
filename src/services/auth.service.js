import axios from "axios";

const API_URL = "https://license-test.digitalanarchy.com/api/v1/admin/";

// const register = (username, email, password) => {
//   return axios.post(API_URL + "signup", {
//     email,
//     username,
//     password,
//   });
// };

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
        admin: true,
        username,
        password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
//   register,
  login,
  logout,
  getCurrentUser,
};