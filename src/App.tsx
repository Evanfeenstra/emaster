import React, {useState} from 'react';
import styled from 'styled-components'
import Upload from './components/Upload'
import Text from './components/Text'
import Toggle from './components/Toggle'
import Button from './components/Button'

function App() {
  const [selected,setSelected] = useState('normal')

  function openOptions(){}

  const showReference = selected==='reference'
  return <Wrap>
    <Text />
    <UploadWrap>
      {showReference ? 
        <>
          <Upload filekey="original" name="original" />
          <Upload filekey="reference" name="reference" style={{marginLeft:65}} />
        </> :
        <Upload filekey="main" key="main" /> // "key" here prevents "original" from keeping "main" state on toggle
      }
    </UploadWrap>
    <Controls>
      <Toggle items={['normal','reference']} 
        value={selected} onChange={setSelected}
      />
      <Button text="options" onClick={openOptions} />
    </Controls>
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
    background:rgba(0,0,0,0.69);
    top:0;left:0;bottom:0;right:0;
  }
`
const Controls = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:35px;
`
const UploadWrap = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
`
export default App;
