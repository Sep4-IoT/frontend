import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import GreenHouseDetails from '../components/GreenHouseDetails';

jest.mock('axios');

describe('GreenHouseDetails', () => {
  it('fetches and displays greenhouse data', async () => {
    axios.get.mockResolvedValue({
      data: [{
        greenHouseId: 2,
        GreenHouseName: 'Tropical Zone',
        description: 'A warm environment',
        temperature: '28°C',
        lightIntensity: 'High',
        co2Levels: 'Moderate',
        humidity: 'High',
        isWindowOpen: false
      }],
      status: 200
    });

    render(<GreenHouseDetails />);

    // Check for loading state
    expect(screen.getByText(/loading greenhouse details/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText('Tropical Zone')).toBeInTheDocument();
      });
      
      await waitFor(() => {
        expect(screen.getByText('A warm environment')).toBeInTheDocument();
      });
      
      await waitFor(() => {
        expect(screen.getByText('28°C')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('High')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText('Moderate')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByText('High')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByText('No')).toBeInTheDocument();
    });
  });
});

