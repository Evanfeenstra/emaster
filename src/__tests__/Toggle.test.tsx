import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Toggle from '../components/Toggle';
import {modes} from '../App'

/* TEST toggle UI */
test('toggle', async () => {

  render(<Toggle items={modes} 
    value={modes[1]} onChange={()=>{}}
  />);

  const surface = screen.queryByTestId('toggle-surface') as HTMLElement

  expect(surface).toBeInTheDocument()

  expect(surface?.innerHTML).toContain('reference')

  expect(surface?.innerHTML).not.toContain('normal')

  const style = window.getComputedStyle(surface);

  expect(style.transform).not.toContain('translateX(0px)')

})
