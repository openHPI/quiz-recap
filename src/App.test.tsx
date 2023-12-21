import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Quiz recap components', async () => {
  render(<App />);

  const titleElement = screen.getByText(/Quiz recap/i);
  const submitButton = screen.getByRole('button');
  const answers = await screen.findAllByRole('checkbox');
  // ToDo: Load testing dataset instead
  const question = screen.getByText(/Was zeigt uns ein Histogramm an?/i);

  expect(titleElement).toBeInTheDocument();

  expect(submitButton).toBeInTheDocument();
  expect(submitButton).not.toBeDisabled();

  expect(answers.length).toBeGreaterThanOrEqual(1);
  expect(question).toBeInTheDocument();
});
