import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to the NASA App/i);
  expect(linkElement).toBeInTheDocument();
});
