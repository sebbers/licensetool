import axios from "../utils/axios";
import authHeader from "./auth-header";

const API_URL = "https://license-test.digitalanarchy.com/api/v1/admin/serials";


const getSerials = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getSerial = (serial) => {
  return axios.get(API_URL + `/${serial}`, { headers: authHeader() });
};

const createSerial = ({...data}) => {
  return axios
    .post(API_URL, {
      "product": data.product,
      "email": data.email,
      "comment": data.comments,
      "expiration": data.formatedDate,
      "version": "4.0",
      "activations": [
        {
          "mac": data.mac
        }
      ],
      "deactivations": [
        {
          "mac": data.mac
        }
      ],
    })
    .then((response) => {
      return response;
    });
};

export default {
  getSerials,
  getSerial,
  createSerial
};