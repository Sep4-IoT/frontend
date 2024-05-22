import React from 'react'
import GreenhouseDetails from '../components/GreenhouseDetails'
import { render, screen } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'

beforeEach(() => {
  fetchMock.resetMocks()
})

test('renders loading spinner initially', () => {
  render(<GreenhouseDetails />)
  expect(screen.getByText(/Loading/i)).toBeInTheDocument()
})
