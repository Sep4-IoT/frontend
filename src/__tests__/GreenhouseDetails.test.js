import React from "react";
import GreenhouseDetails from "../components/GreenhouseDetails";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter } from "react-router-dom";

let mockAxios;

beforeEach(() => {
  mockAxios = new MockAdapter(axios);
  mockAxios.reset();
});

test("renders greenhouse details after successful fetch", async () => {
  const mockData = {
    Id: 1,
    Name: "GreenHouse1",
    Description: "First Green House",
    Temperature: 25,
    LightIntensity: 300,
    Co2Levels: 400,
    Humidity: 60,
    isWindowOpen: false,
  };

  mockAxios.onGet("https://javierperalta.dk/SEP4/greenhouses/1/current").reply(200, mockData);

  render(
    <BrowserRouter>
      <GreenhouseDetails />
    </BrowserRouter>
  );

  await waitFor(() => expect(screen.getByText(/GreenHouse1/i)).toBeInTheDocument());

  expect(screen.getByText(/GreenHouse1/i)).toBeInTheDocument();
  expect(screen.getByText(/First Green House/i)).toBeInTheDocument();
  expect(screen.getByText(/25/i)).toBeInTheDocument();
  expect(screen.getByText(/300/i)).toBeInTheDocument();
  expect(screen.getByText(/400/i)).toBeInTheDocument();
  expect(screen.getByText(/60/i)).toBeInTheDocument();
  expect(screen.getByText(/No/i)).toBeInTheDocument();
});

test("updates greenhouse window status on button click", async () => {
  const mockData = {
    Id: 1,
    Name: "GreenHouse1",
    Description: "First Green House",
    Temperature: 25,
    LightIntensity: 300,
    Co2Levels: 400,
    Humidity: 60,
    isWindowOpen: false,
  };
  
  mockAxios.onGet("https://javierperalta.dk/SEP4/greenhouses/1/current").reply(200, mockData);
  mockAxios.onPatch("https://javierperalta.dk/SEP4/greenhouses/1").reply(200, {
    message: "Window status updated successfully"
  });

  render(
    <BrowserRouter>
      <GreenhouseDetails />
    </BrowserRouter>
  );

  await waitFor(() => expect(screen.getByText(/GreenHouse1/i)).toBeInTheDocument());
  const button = screen.getByRole('button', { name: /Open Window/i });
  fireEvent.click(button);

  await waitFor(() => expect(screen.getByText(/Close Window/i)).toBeInTheDocument());
  expect(screen.getByText(/Yes/i)).toBeInTheDocument();
});