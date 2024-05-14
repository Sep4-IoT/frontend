// GreenHouseDetails.test.js
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import GreenHouseDetails from './GreenHouseDetails';
import supertest from 'supertest';
import app from './server'; 

// Mock axios
jest.mock('axios');

const request = supertest(app);

// Define mock data
const mockGreenhouseData = {
  id: 1,
  name: 'Test Greenhouse',
  windowOpened: false,
  temperature: 25,
  lightIntensity: 300,
  co2Levels: 400,
  humidity: 50
};

describe('GreenHouseDetails Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockGreenhouseData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  //passed 
  test('renders loading spinner initially', () => {
    render(<GreenHouseDetails />);
    expect(screen.getByText(/Loading greenhouse details.../i)).toBeInTheDocument();
  });

  //Failed
  test('renders Test greenhouse in the details after fetching data', async () => {
    render(<GreenHouseDetails />);
    expect(screen.getByText(/Test Greenhouse/i)).toBeInTheDocument();
  });

  //Failed
  test('updates window status when button is clicked', async () => {
    axios.patch.mockResolvedValue({ data: { message: 'Window status updated successfully' } });

    render(<GreenHouseDetails />);

    const button = screen.getByText(/Open Window/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Window opened: Yes/i)).toBeInTheDocument();
    });
  });

  //Failed
  test('handles error when fetching data fails', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch'));

    render(<GreenHouseDetails />);

    await waitFor(() => {
      expect(screen.getByText(/Error fetching greenhouse data/i)).toBeInTheDocument();
    });
  });

  // Integration test with Supertest
  //passed 
  test('fetches greenhouse data from API', async () => {
    const response = await request.get('/GreenHouse/1');
    expect(response.status).toBe(200);
    expect(response.body.GreenHouseName).toBe('Test Greenhouse');
  });

  //passed 
  test('updates greenhouse window status via API', async () => {
    const response = await request.patch('/GreenHouse/1').send({ isWindowOpen: true });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Window status updated successfully');
  });
});
