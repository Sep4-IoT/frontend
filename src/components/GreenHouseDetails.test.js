import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import GreenHouseDetails from './GreenHouseDetails';

// Mock axios
jest.mock('axios');

const mockGreenhouseData = {
  GreenHouseId: 1,
  GreenHouseName: 'Test Greenhouse',
  Description: 'A test greenhouse',
  Temperature: 25,
  LightIntensity: 300,
  Co2Levels: 400,
  Humidity: 50,
  IsWindowOpen: false
};

describe('GreenHouseDetails Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockGreenhouseData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading spinner initially', () => {
    render(<GreenHouseDetails />);
    expect(screen.getByText(/Loading greenhouse details.../i)).toBeInTheDocument();
  });

  test('renders greenhouse details after fetching data', async () => {
    render(<GreenHouseDetails />);

    await waitFor(() => {
      expect(screen.getByText(/Test Greenhouse/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/ID: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Window opened: No/i)).toBeInTheDocument();
    expect(screen.getByText(/Temperature: 25/i)).toBeInTheDocument();
    expect(screen.getByText(/Light intensity: 300/i)).toBeInTheDocument();
    expect(screen.getByText(/CO2 levels: 400/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity: 50/i)).toBeInTheDocument();
  });

  test('updates window status when button is clicked', async () => {
    axios.patch.mockResolvedValue({ data: { message: 'Window status updated successfully' } });

    render(<GreenHouseDetails />);

    await waitFor(() => {
      expect(screen.getByText(/Test Greenhouse/i)).toBeInTheDocument();
    });

    const button = screen.getByText(/Open Window/i);
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Window opened: Yes/i)).toBeInTheDocument();
    });
  });

  test('handles error when fetching data fails', async () => {
    axios.get.mockRejectedValue(new Error('Failed to fetch'));

    render(<GreenHouseDetails />);

    await waitFor(() => {
      expect(screen.getByText(/Error fetching greenhouse data/i)).toBeInTheDocument();
    });
  });
});
