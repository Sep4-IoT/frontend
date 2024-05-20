//index.js
import React from "react"
import ReactDOM from "react-dom/client"
import Root from "./routes/Root"
import HomePage from "./routes/HomePage"
import GreenhousePage from "./routes/GreenhousePage"
import HistoryPage from "./routes/HistoryPage"
import { RouterProvider, createHashRouter } from "react-router-dom"

const router = createHashRouter([
  {
      path: "/",
      element: <Root />,
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
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)