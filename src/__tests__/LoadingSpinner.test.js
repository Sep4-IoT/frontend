import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { BrowserRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks();
});

test("renders loading spinner initially", () => {
  render(
    <BrowserRouter>
      <LoadingSpinner />
    </BrowserRouter>
  );
  expect(
    screen.getByText(/Loading greenhouse details.../i)
  ).toBeInTheDocument();
});
