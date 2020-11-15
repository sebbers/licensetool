import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import Textarea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";
import SerialService from "../services/serial.service";
import ProductService from "../services/product.service";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vquantity = (value) => {
  if (value < 1) {
    return (
      <div className="alert alert-danger" role="alert">
        The quantity must be at least 1.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Create = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expireDate, setExpireDate] = useState(new Date());
  const [offlineLicense, setOfflineLicense] = useState(0);
  const [activations, setActivations] = useState("");
  const [email, setEmail] = useState("");
  const [mac, setMac] = useState("");
  const [comments, setComments] = useState("");
  
  
  const [productName, setProductName] = useState("");

  useEffect(() => {    
    ProductService.getProducts().then(
      (response) => {
        setProducts(response.data);
      },
      // (error) => {
      //   const _content =
      //     (error.response && error.response.data) ||
      //     error.message ||
      //     error.toString();

      //   setContent(_content);
      // }
    );
  }, []);

  const onChangeProduct = (e) => {
    const product = e.target.value;
    setProduct(product);
  };

  const onChangeQuantity = (e) => {
    const quantity = e.target.value;
    setQuantity(quantity);
  };

  const onOfflineLicenseChange = (e) => {
    const offlineLicense = e.target.value;
    setOfflineLicense(offlineLicense);
  };

  const onChangeActivations = (e) => {
    const activations = e.target.value;
    setActivations(activations);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeMac = (e) => {
    const mac = e.target.value;
    setMac(mac);
  };

  const onChangeComments = (e) => {
    const comments = e.target.value;
    setComments(comments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    const formatedDate = expireDate.toJSON()

    if (checkBtn.current.context._errors.length === 0) {
      SerialService.createSerial({product, email, formatedDate, mac, comments}).then(
        (response) => {
          setMessage(response.data.email);
          setSuccessful(true);

          console.log(response)
          console.log(response.data.product)
          setProductName(response.data.product)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  const createNewButton = () => {
    setSuccessful(!successful)
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
      {successful && (
        <div className="">
          <h2 className="text-center">You created a license for:</h2>
          <p className="lead">{productName}</p>
          <button onClick={createNewButton} className="btn btn-primary btn-block">Create another license</button>
        </div>
      )}
      {!successful && (
        <Form onSubmit={handleSubmit} ref={form}>
            <div>
              <div className="form-group">
                <label htmlFor="product">Product</label>
                <Select 
                  name='product' 
                  value={product} 
                  onChange={onChangeProduct}
                  validations={[required]}
                >
                  <option value=''>Select a product</option>
                  {products && products.map((product, index) => <option value={product.name}>{product.serialPrefix}</option>)}
                </Select>
              </div>

              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <Input
                  type="text"
                  className="form-control"
                  name="quantity"
                  value={quantity}
                  onChange={onChangeQuantity}
                  validations={[required, vquantity]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Expiration Date</label>
                <DatePicker selected={expireDate} onSelect={date => console.log(date.toJSON())} onChange={date => setExpireDate(date)} dateFormat="yyyy/MM/dd" />
              </div>

              <div className="form-group">
                <label htmlFor="offlineLicense">Offline License</label>
                <Input 
                  type="checkbox" 
                  value="1" 
                  name="offlineLicense" 
                  checked={offlineLicense} 
                  onChange={onOfflineLicenseChange} 
                />
              </div>

              <div className="form-group">
                <label htmlFor="activations">Number of activations</label>
                <Input
                  type="text"
                  className="form-control"
                  name="activations"
                  value={activations}
                  onChange={onChangeActivations}
                  validations={[required, vquantity]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Lock to Email Address</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mac">Lock to specific MAC</label>
                <Input
                  type="text"
                  className="form-control"
                  name="mac"
                  value={mac}
                  onChange={onChangeMac}
                  // validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="comments">Comments/Metadata</label>
                <Textarea
                  type="text"
                  className="form-control"
                  name="comments"
                  value={comments}
                  onChange={onChangeComments}
                  // validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Create</button>
              </div>
            </div>

          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        )}
      </div>
    </div>
  );
};

export default Create;