import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Upload from '../components/Upload';
import * as localForage from 'localforage'
import { act } from 'react-dom/test-utils'

/* TEST FILE UPLOAD, CORRECT FILE TYPE */
test('file upload', async () => {

  const filekey = 'main'
  const contentKey = `${filekey}_content`
  const nameKey = `${filekey}_name`

  await act(async () => {
    render(<Upload filekey={filekey} />);
  })

  const inputEl = screen.getByPlaceholderText(filekey)

  const file = new File(['data:audio/mpeg;base64,'], 'hello.mp3', {
    type: 'audio/mp3',
  })
  Object.defineProperty(inputEl, 'files', { value: [file] })
  // upload the file
  await act(() => {
    fireEvent.change(inputEl)
  })

  // wait for the "Download" message to appear
  await waitFor(async () => {
    expect(screen.getByText('Download your file')).toBeInTheDocument()
  }, { timeout: 2000 }) // there's a 1010 ms delay

  // check file name is stored in localForage
  const storedName = await localForage.getItem(nameKey)
  expect(storedName).not.toBeNull()

  // check content is stored in localForage
  const storedContent = await localForage.getItem(contentKey)
  expect(storedContent).not.toBeNull()

  // check the image is hue shifted
  const imgEl = screen.getByAltText('upload')
  const style = window.getComputedStyle(imgEl)
  expect(style.filter).toContain('hue-rotate')

  // check the arrow is flipped
  const arrowEl = screen.getByAltText('upload-arrow')
  expect(arrowEl.getAttribute('src')).toEqual('/img/icon_download.svg')
})

/* TEST FILE UPLOAD WITH WRONG TYPE */
test('file upload wrong filetype', async () => {

  const filekey = 'wrong'
  await act(async () => {
    render(<Upload filekey={filekey} />);
  })

  const inputEl = screen.getByPlaceholderText(filekey)

  const file = new File(['data:image/jpeg;base64,'], 'hello.jpg', {
    type: 'image/jpg',
  })
  Object.defineProperty(inputEl, 'files', { value: [file] })
  // upload the file
  await act(() => {
    fireEvent.change(inputEl)
  })

  // make sure NOT in document, because wrong file type
  await waitFor(async () => {
    expect(screen.queryByText('Download your file')).toBeNull()
  }, { timeout: 2000 }) // there's a 1010 ms delay

})


/* TEST EXISTING FILE */
test('existing file', async () => {

  const filekey = 'existing'
  const nameKey = `${filekey}_name`
  const contentKey = `${filekey}_content`
  await localForage.setItem(nameKey, 'existing.wav')
  await localForage.setItem(contentKey, 'data:audio/wav;base64,')

  await act(async () => {
    render(<Upload filekey={filekey} />);
  })

  // The "Download" message should already be there
  await waitFor(async () => {
    expect(screen.getByText('Download your file')).toBeInTheDocument()
  }) // there's a 1010 ms delay

})

// test download