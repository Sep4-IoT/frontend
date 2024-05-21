import React from "react";
import GreenhouseDetails from "../components/GreenhouseDetails";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import fetchMock from "jest-fetch-mock";

jest.mock("axios");
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test("renders greenhouse details after successful fetch", async () => {
  const mockData = {
    id: "1",
    greenHouseName: "GreenHouse1",
    description: "First Green House",
    temperature: 25,
    lightIntensity: 300,
    co2Levels: 400,
    humidity: 60,
    isWindowOpen: false,
  };

  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  render(<GreenhouseDetails />);

  await waitFor(() => expect(screen.getByText(/Id: 1/i)).toBeInTheDocument());

  expect(screen.getByText(/Id: 1/i)).toBeInTheDocument();
  expect(screen.getByText(/GreenHouse1/i)).toBeInTheDocument();
  expect(screen.getByText(/First Green House/i)).toBeInTheDocument();
  expect(screen.getByText(/25°C/i)).toBeInTheDocument();
  expect(screen.getByText(/300 lx/i)).toBeInTheDocument();
  expect(screen.getByText(/400 ppm/i)).toBeInTheDocument();
  expect(screen.getByText(/60%/i)).toBeInTheDocument();
  expect(screen.getByText(/Window opened: No/i)).toBeInTheDocument();
});

test("updates greenhouse window status on button click", async () => {
  const mockData = {
    id: "1",
    greenHouseName: "GreenHouse1",
    description: "First Green House",
    temperature: 25,
    lightIntensity: 300,
    co2Levels: 400,
    humidity: 60,
    isWindowOpen: false,
  };

  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  render(<GreenhouseDetails />);

  await waitFor(() => expect(screen.getByText(/Id: 1/i)).toBeInTheDocument());

  const button = screen.getByText(/Open Window/i);

  axios.patch.mockResolvedValueOnce({
    data: { message: "Window status updated successfully" },
  });

  fireEvent.click(button);

  await waitFor(() =>
    expect(screen.getByText(/Close Window/i)).toBeInTheDocument()
  );

  expect(screen.getByText(/Window opened: Yes/i)).toBeInTheDocument();
});
