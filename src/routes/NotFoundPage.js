import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="wrapper">
      <div className="notfound-container">
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">Go back to the homepage</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
