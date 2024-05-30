import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { BrowserRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";


test("renders loading spinner initially", () => {
  render(
    <BrowserRouter>
      <LoadingSpinner />
    </BrowserRouter>
  );
  expect(screen.getByText(/Loading greenhouse data.../i)).toBeInTheDocument();
});
