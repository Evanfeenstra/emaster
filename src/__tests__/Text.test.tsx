import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Text from '../components/Text';

test('renders main hero text', () => {
  render(<Text mobileUpload={false} />);
  const heroEl = screen.getByText(/Master Your Track,/i);
  expect(heroEl).toBeInTheDocument();
  const instantly = screen.getByText(/Instantly/i);
  expect(instantly).toBeInTheDocument();
});
