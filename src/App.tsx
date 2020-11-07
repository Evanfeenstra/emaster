import React, {useState} from 'react';
import styled from 'styled-components'
import Upload from './components/Upload'
import Text from './components/Text'
import Toggle from './components/Toggle'
import Button from './components/Button'
import MobileUpload from './components/MobileUpload'
import {ToggleMode} from './types'

function App() {
  const [selected,setSelected] = useState<ToggleMode>('normal')
  const [mobileUpload, setMobileUpload] = useState(false)

  function openOptions(){}

  const showReference = selected==='reference'
  return <Wrap>
    <Text mobileUpload={mobileUpload} />

    {mobileUpload && <Row>
      <Toggle items={['normal','reference']} 
        value={selected} onChange={setSelected}
      />
    </Row>}

    <UploadWrap mobileUpload={mobileUpload}>
      {showReference ? 
        <>
          <Upload filekey="original" name="original" noGrow={mobileUpload} />
          <Upload filekey="reference" name="reference" noGrow={mobileUpload} style={{marginLeft:65}} />
        </> :
        <Upload filekey="main" key="main" noGrow={mobileUpload} /> // "key" here prevents "original" from keeping "main" state on toggle
      }
    </UploadWrap>
    {!mobileUpload && <MobileUploadWrap>
      <MobileUpload onClick={()=>setMobileUpload(true)} />
    </MobileUploadWrap>}

    {!mobileUpload && <Controls>
      <Toggle items={['normal','reference']} 
        value={selected} onChange={setSelected}
      />
      <Button text="options" onClick={openOptions} style={{marginLeft:24}} />
    </Controls>}

    {mobileUpload && <Row>
      <Button text="options" onClick={openOptions} />
    </Row>}

  </Wrap>
}

const Wrap = styled.div`
  display:flex;
  flex:1;
  flex-direction:column;
  align-items:center;
  background-image:url("/img/bg.jpg");
  background-repeat:no-repeat;
  background-position:center top;
  background-size:cover;
  min-height:100vh;
  position:relative;
  &:before{
    content:"";
    position:absolute;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.5) 100%);
    top:0;left:0;bottom:0;right:0;
  }
`
const Controls = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:35px;
  @media (max-width: 768px) {
    display:none;
  }
`
const Row = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:32px;
  margin-bottom:32px;
`
interface UploadWrapProps{
  mobileUpload:boolean
}
const UploadWrap = styled.div<UploadWrapProps>`
  width:100%;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  ${p=>!p.mobileUpload && `
    @media (max-width: 768px) {
      display:none;
    }
  `}
`
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
export default App;
