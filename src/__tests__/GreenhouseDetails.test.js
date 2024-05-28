import React from 'react';
import GreenhouseDetails from '../components/GreenhouseDetails';
import { render, screen, waitFor, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

test('renders loading spinner initially', () => {
  render(<GreenhouseDetails />);
  expect(screen.getByText(/Loading greenhouse details.../i)).toBeInTheDocument();
});

test('renders greenhouse details as null after loading', () => {
  render(<GreenhouseDetails />);
  expect(screen.queryByText(/ID:/i)).toBeNull();
  expect(screen.queryByText(/Window opened:/i)).toBeNull();
  expect(screen.queryByText(/Greenhouse name:/i)).toBeNull();
  expect(screen.queryByText(/Description:/i)).toBeNull();
  expect(screen.queryByText(/Temperature:/i)).toBeNull();
  expect(screen.queryByText(/Light intensity:/i)).toBeNull();
  expect(screen.queryByText(/CO2 levels:/i)).toBeNull();
  expect(screen.queryByText(/Humidity:/i)).toBeNull();
});

// test('renders greenhouse details after successful fetch', async () => {
//   const mockData = {
//     greenHouseId: 1,
//     greenHouseName: 'Test Greenhouse',
//     description: 'A test greenhouse',
//     temperature: 25,
//     lightIntensity: 300,
//     co2Levels: 400,
//     humidity: 60,
//     isWindowOpen: true
//   };

//   fetchMock.mockResponseOnce(JSON.stringify(mockData));

//   await act(async () => {
//     render(<GreenhouseDetails />);
//   });

//   await waitFor(() => expect(screen.getByText(/Id: 1/i)).toBeInTheDocument());

//   expect(screen.getByText(/Id: 1/)).toBeInTheDocument();
//   expect(screen.getByText(/Window opened: Yes/i)).toBeInTheDocument();
//   expect(screen.getByText(/Name: Test Greenhouse/i)).toBeInTheDocument();
//   expect(screen.getByText(/Description: A test greenhouse/i)).toBeInTheDocument();
//   expect(screen.getByText(/Temperature: 25°C/i)).toBeInTheDocument();
//   expect(screen.getByText(/Light intensity: 300 lx/i)).toBeInTheDocument();
//   expect(screen.getByText(/CO2 levels: 400 ppm/i)).toBeInTheDocument();
//   expect(screen.getByText(/Humidity: 60%/i)).toBeInTheDocument();
// });
