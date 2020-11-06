import React from 'react';
import styled from 'styled-components'

export default function Button({text,onClick}:{text:string,onClick:React.MouseEventHandler<HTMLButtonElement>}){
  return <Wrap onClick={onClick}>
    {text}
  </Wrap>
}

const Wrap = styled.button`
  color:white;
  background:transparent;
  margin-left:24px;
  cursor: pointer;
  display:flex;
  align-items: center;
  justify-content:center;
  font-size: 16px;
  position: relative;
  height: 48px;
  border-radius: 30px;
  border: 2px solid #fff;
  text-transform: uppercase;
  padding: 11px 48px;
`