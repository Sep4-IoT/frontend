// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import HomePage from "./routes/HomePage";
import GreenhousePage from "./routes/GreenhousePage";
import HistoryPage from "./routes/HistoryPage";
import ErrorPage from "./routes/ErrorPage";
import NotFoundPage from "./routes/NotFoundPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/greenhouse",
        element: <GreenhousePage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
