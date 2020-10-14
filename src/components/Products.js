import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductService from "../services/product.service";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {    
    ProductService.getProducts().then(
      (response) => {
        setProducts(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        // setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          {/* <strong>{currentUser.username}</strong> Products */}
          Products
        </h3>
      </header>
      {/* <p>
        <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
        {currentUser.token.substr(currentUser.token.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      */}
      <ul>
        {products &&
          products.map((product, index) => <li key={index}>{product.name}</li>)}
      </ul> 
    </div>
  );
};

export default Products;