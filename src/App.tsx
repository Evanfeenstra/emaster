import React from 'react';
import styled from 'styled-components'
import Upload from './components/Upload'
import Text from './components/Text'

function App() {
  return <Wrap>
    <Text />
    <Upload filekey="main" />
    <Controls>

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
`

export default App;
