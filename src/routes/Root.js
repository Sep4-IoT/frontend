import "../index.css";
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <nav>
        <Link to="/frontend">Home</Link>
        <Link to="/greenhouse">Greenhouse</Link>
        <Link to="/history">History</Link>
      </nav>
      <Outlet />
    </>
  );
}
