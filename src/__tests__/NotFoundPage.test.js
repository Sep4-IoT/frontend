import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import NotFoundPage from '../routes/NotFoundPage'
import HomePage from '../routes/HomePage'

test('renders NotFoundPage for unknown routes', () => {
  render(
    <MemoryRouter initialEntries={['/some/bad/route']}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  )

  expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument()
  expect(
    screen.getByText(/The page you are looking for does not exist./i)
  ).toBeInTheDocument()
})
