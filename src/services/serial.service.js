import axios from "../utils/axios";
import authHeader from "./auth-header";

const API_URL = "https://license-test.digitalanarchy.com/api/v1/admin/serials";


const getSerials = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getSerial = (serial) => {
  return axios.get(API_URL + `/${serial}`, { headers: authHeader() });
};

export default {
  getSerials,
  getSerial
};