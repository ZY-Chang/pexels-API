import React from "react";
import { Link } from "react-router-dom";

const nav = () => {
  return (
    <nav>
      <ul>
        <li>
          {/* <a href=""></a> */}
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default nav;
