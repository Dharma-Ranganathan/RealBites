// import React from "react";
import "../styles/ErrorPage.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h3 className="error-title">"An Unexpected Error Occured !"</h3>
      <p>404 PAGE NOT FOUND</p>
      <Link to={"/"}>
        <span>Back to Home Page</span>
      </Link>
    </div>
  );
};

export default ErrorPage;
