import React from "react";
import GreenhouseDetails from "../components/GreenhouseDetails";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import fetchMock from "jest-fetch-mock";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");
fetchMock.enableMocks();

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

beforeEach(() => {
  fetchMock.resetMocks();
});

test("renders greenhouse details after successful fetch", async () => {
  const navigate = jest.fn();
  mockUseNavigate.mockReturnValue(navigate);

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

  render(
    <BrowserRouter>
      <GreenhouseDetails />
    </BrowserRouter>
  );

  await waitFor(() => expect(screen.getByText(/Id: 1/i)).toBeInTheDocument());

  expect(screen.getByText(/Id: 1/i)).toBeInTheDocument();
  expect(screen.getByText(/GreenHouse1/i)).toBeInTheDocument();
  expect(screen.getByText(/First Green House/i)).toBeInTheDocument();
  expect(screen.getByText(/25/i)).toBeInTheDocument();
  expect(screen.getByText(/300/i)).toBeInTheDocument();
  expect(screen.getByText(/400/i)).toBeInTheDocument();
  expect(screen.getByText(/60/i)).toBeInTheDocument();
  expect(screen.getByText(/Window opened: No/i)).toBeInTheDocument();
});

test("updates greenhouse window status on button click", async () => {
  const navigate = jest.fn();
  mockUseNavigate.mockReturnValue(navigate);

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

  render(
    <BrowserRouter>
      <GreenhouseDetails />
    </BrowserRouter>
  );

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
