import React from "react";
import History from "../components/History";
import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test("renders history data after successful fetch", async () => {
  const mockData = [
    {
      date: "2024-05-20T08:00:00Z",
      Temperature: 25,
      LightIntensity: 300,
      Co2Levels: 400,
      Humidity: 60,
    },
  ];

  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  render(
    <BrowserRouter>
      <History />
    </BrowserRouter>
  );

  await waitFor(() =>
    expect(screen.getByText(/Temperature /i)).toBeInTheDocument()
  );

  expect(screen.getByText(/25/i)).toBeInTheDocument();
  expect(screen.getByText(/300 lux/i)).toBeInTheDocument();
  expect(screen.getByText(/400 ppm/i)).toBeInTheDocument();
  expect(screen.getByText(/60 %/i)).toBeInTheDocument();
});
