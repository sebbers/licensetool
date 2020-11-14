import axios from "../utils/axios";
import LocalStorage from './localStorage';

const API_URL = "https://license-test.digitalanarchy.com/api/v1/admin/";


const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
        admin: true,
        username,
        password,
    })
    .then((response) => {
      if (response.data) {
        LocalStorage.setToken(response.data)
        LocalStorage.setUser({ username })
      }

      return response.data;
    });
};

const logout = () => {
  LocalStorage.clearToken();
  LocalStorage.clearUser();
};

const getCurrentUser = () => {
  return LocalStorage.getUser();
};


export default {
  login,
  logout,
  getCurrentUser
};