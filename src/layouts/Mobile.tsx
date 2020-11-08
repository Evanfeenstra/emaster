import React from 'react'
import styled from 'styled-components'
import { useStore } from '../hooks'
import Text from '../components/Text'
import { UploadButtons, ScrollDown, Row } from './Shared'
import Button from '../components/Button'
import Toggle from '../components/Toggle'
import { modes } from '../App'
import MobileUpload from '../components/MobileUpload'

export default function Mobile() {
  const { selected, mobileUpload, set } = useStore()
  return <>

    <Text mobileUpload={mobileUpload} />

    {mobileUpload && <Row>
      <Toggle items={modes}
        value={selected} onChange={s => set({ selected: s })}
      />
    </Row>}

    <UploadButtons />

    {!mobileUpload && <MobileUploadWrap>
      <MobileUpload onClick={() => set({ mobileUpload: true })} />
    </MobileUploadWrap>}

    {mobileUpload && <Row>
      <Button text="options" onClick={() => { }} />
    </Row>}

    <Row>
      <ScrollDown src="/img/icon_scroll_down.svg" />
    </Row>

  </>
}

const MobileUploadWrap = styled.div`
  width:100%;
  position:relative;
  display:none;
  align-items:center;
  justify-content:center;
  @media (max-width: 768px) {
    display:flex;
  }
`
