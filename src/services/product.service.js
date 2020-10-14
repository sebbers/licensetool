import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://license-test.digitalanarchy.com/api/v1/admin/products";

// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

const getProducts = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

// const getUserBoard = () => {
//   return axios.get(API_URL + "user", { headers: authHeader() });
// };

// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };

// const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };

export default {
  // getPublicContent,
  getProducts,
  // getUserBoard,
  // getModeratorBoard,
  // getAdminBoard,
};