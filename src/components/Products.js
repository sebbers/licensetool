import React, { useEffect, useState } from "react";
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
        <h3>Products</h3>
      </header>
      <ul>
        {products &&
          products.map((product, index) => <li key={index}>{product.name}</li>)}
      </ul> 
    </div>
  );
};

export default Products;