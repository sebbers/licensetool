import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://license-test.digitalanarchy.com/api/v1/admin/products";


const getProducts = () => {
    return axios.get(API_URL, { headers: authHeader() });
  };

export default {
  getProducts
};