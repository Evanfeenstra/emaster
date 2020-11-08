import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App, {breakpoint} from '../App';

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

test('app responsiveness', async () => {
  
  // bigger than the mobile breakpoint
  resizeWindow(breakpoint+1)

  await act(async () => {
    render(<App />);
  })

  // no mobile button
  const mobileUploadButton = screen.queryByTestId('mobile-upload-button') as HTMLElement
  expect(mobileUploadButton).toBeNull()

  // smaller than the mobile breakpoint
  await act(async () => {
    resizeWindow(breakpoint-1)
  })

  // now mobile button should be in the document
  const mobileUploadButton2 = screen.queryByTestId('mobile-upload-button') as HTMLElement
  expect(mobileUploadButton2).toBeInTheDocument()

})

function resizeWindow(width:number){
  window = Object.assign(window, { innerWidth: width });
  window.dispatchEvent(new Event('resize'));
}