import React from "react";
import History from "../components/History";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let mockAxios;

beforeEach(() => {
  mockAxios = new MockAdapter(axios);
  mockAxios.reset();
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

  mockAxios.onGet("https://javierperalta.dk/SEP4/greenhouses/1/history").reply(200, mockData);

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
