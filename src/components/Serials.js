import React from "react";
import { Link } from "react-router-dom";

const Serials = ({ data }) => {
  return (
    <div className="container">
      {/* <header className="jumbotron">
        <h3>Serials</h3>
      </header> */}
      <ul>
        {data &&
          data.map((line, index) => {
            const link = `/serials/${line.serial}`;
            return (
              <li className="nav-item">
                {line.name}
                <Link to={link} className="nav-link">
                  View
                </Link>
              </li>
            );
          })}
      </ul> 
    </div>
  );
};

export default Serials;