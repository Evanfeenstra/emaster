import React from 'react';
import styled from 'styled-components'

interface Props {
  text: string
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  style?: { [k: string]: any }
}
export default function Button({ text, onClick, style }: Props) {
  const s = style || {}
  return <Wrap onClick={onClick} style={s}>
    {text}
  </Wrap>
}

const Wrap = styled.button`
  color:white;
  background:transparent;
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
