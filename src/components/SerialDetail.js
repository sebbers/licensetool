import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SerialService from "../services/serial.service";

const SerialDetail = () => {
  let { id } = useParams();
  const [serial, setSerial] = useState({});

  useEffect(() => {    
    SerialService.getSerial(id).then(
      (response) => {
        setSerial(response.data);
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
      Serial Detail

      {serial && 
        <>
          {serial.name}
        </>
      }
    </div>
  );
};

export default SerialDetail;