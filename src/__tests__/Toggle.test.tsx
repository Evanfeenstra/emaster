import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Toggle from '../components/Toggle';

/* TEST toggle UI */
test('toggle', async () => {

  render(<Toggle items={['normal','reference']} 
    value="reference" onChange={()=>{}}
  />);

  const surface = screen.queryByTestId('toggle-surface') as HTMLElement

  expect(surface).toBeInTheDocument()

  expect(surface?.innerHTML).toContain('reference')

  expect(surface?.innerHTML).not.toContain('normal')

  const style = window.getComputedStyle(surface);

  expect(style.transform).not.toContain('translateX(0px)')

})
