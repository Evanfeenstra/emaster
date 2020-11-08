import React from 'react';
import styled from 'styled-components'
import Mobile from './layouts/Mobile'
import Desktop from './layouts/Desktop'
import { ToggleMode } from './types'
import { StoreProvider, useViewport } from './hooks'

export const modes: ToggleMode[] = ['normal', 'reference']

export const breakpoint = 768;

function App() {
  const { width } = useViewport()
  return <StoreProvider>
    <Wrap>
      {width < breakpoint ?
        <Mobile /> :
        <Desktop />
      }
    </Wrap>
  </StoreProvider>
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

export default App;
