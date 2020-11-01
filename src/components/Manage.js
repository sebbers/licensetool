import React, { useEffect, useState } from "react";
import Serials from "./Serials";
import SerialService from "../services/serial.service";

const Manage = () => {
  const [serials, setSerials] = useState([]);

  useEffect(() => {    
    SerialService.getSerials().then(
      (response) => {
        setSerials(response.data);
      },
      // (error) => {
      //   const _content =
      //     (error.response && error.response.data) ||
      //     error.message ||
      //     error.toString();

      //   // setContent(_content);
      // }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Manage</h3>
      </header>
      <Serials data={serials} />
    </div>
  );
};

export default Manage;