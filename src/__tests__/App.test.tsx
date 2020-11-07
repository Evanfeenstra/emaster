import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from '../App';

test('app toggle', async () => {

  await act(async () => {
    render(<App />);
  })

  // check only one upload button
  const uploadElements = screen.getAllByAltText('upload')
  expect(uploadElements.length).toEqual(1)

  await act(async () => {
    const toggle = screen.queryByTestId('toggle-clickable-reference') as HTMLElement
    fireEvent.click(toggle)
  })

  // check there are 2 now
  const uploadElements2 = screen.getAllByAltText('upload')
  expect(uploadElements2.length).toEqual(2)

})
