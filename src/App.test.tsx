import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Quiz recap title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Quiz recap/i);
  expect(titleElement).toBeInTheDocument();
});
