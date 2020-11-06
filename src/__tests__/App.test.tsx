import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

test('toggle interaction', async () => {

  render(<App />);

  // check only one upload button

  const toggle = screen.queryByTestId('toggle-clickable') as HTMLElement

  // check two

})