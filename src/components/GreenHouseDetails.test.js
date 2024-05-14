// GreenHouseDetails.test.js
import React from 'react';
import GreenHouseDetails from './GreenHouseDetails';
import { render, screen } from '@testing-library/react';

test('renders loading spinner initially', () => {
  render(<GreenHouseDetails />);
  expect(screen.getByText(/Loading greenhouse details.../i)).toBeInTheDocument();
});
