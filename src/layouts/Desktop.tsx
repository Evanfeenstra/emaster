import React from 'react'
import {useStore} from '../hooks'
import Text from '../components/Text'
import {UploadButtons,Controls,ScrollDown,Row} from './Shared'
import Button from '../components/Button'
import Toggle from '../components/Toggle'
import {modes} from '../App'

export default function Desktop() {
  const { selected, set } = useStore()

  return <>
    <Text />

    <UploadButtons />

    <Controls>
      <Toggle items={modes}
        value={selected} onChange={s => set({ selected: s })}
      />
      <Button text="options" onClick={() => { }} style={{ marginLeft: 24 }} />
    </Controls>

    <Row>
      <ScrollDown src="/img/icon_scroll_down.svg" />
    </Row>

  </>
}