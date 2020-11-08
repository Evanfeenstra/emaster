import React from 'react'
import Upload from '../components/Upload'
import {useStore} from '../hooks'
import styled from 'styled-components'

export function UploadButtons() {
  const { selected, mobileUpload } = useStore()
  const showReference = selected === 'reference'
  return <UploadWrap mobileUpload={mobileUpload}>
    {showReference ?
      <>
        <Upload filekey="original" name="original" noGrow={mobileUpload} />
        <Upload filekey="reference" name="reference" noGrow={mobileUpload} second />
      </> :
      <Upload filekey="main" key="main" noGrow={mobileUpload} /> // "key" here prevents "original" from keeping "main" state on toggle
    }
  </UploadWrap>
}

interface UploadWrapProps {
  mobileUpload: boolean
}
const UploadWrap = styled.div<UploadWrapProps>`
  width:100%;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  ${p => !p.mobileUpload && `
    @media (max-width: 768px) {
      display:none;
    }
  `}
  @media (max-width: 400px) {
    flex-direction:column;
  }
`

export const ScrollDown = styled.img`
  position:relative;
  cursor: pointer;
`

export const Controls = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:35px;
  @media (max-width: 768px) {
    display:none;
  }
`

export const Row = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:32px;
  margin-bottom:32px;
`