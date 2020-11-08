import React from 'react';
import styled from 'styled-components'
import { ToggleMode } from '../types'

interface Props {
  items: Array<ToggleMode>
  onChange: (s:string)=>void
  value: ToggleMode
}
export default function Toggle({ items, value, onChange }: Props) {
  return <Wrap>
    {items.map(item => {
      return <Background key={item} 
        onClick={() => onChange(item)} 
        data-testid={`toggle-clickable-${item}`}
      >
        {item}
      </Background>
    })}
    <Surface index={items.indexOf(value)} 
      data-testid="toggle-surface"
    >
      {value}
    </Surface>
  </Wrap>
}

const Wrap = styled.div`
  cursor: pointer;
  display:flex;
  align-items: center;
  justify-content:center;
  font-size: 16px;
  position: relative;
  height: 48px;
  border-radius: 30px;
  border: 2px solid #fff;
  width: 280px;
  text-transform: uppercase;
`
const Background = styled.div`
  color:grey;
  line-height: 46px;
  font-size: 16px;
  text-align: center;
  width:140px;
`
interface SurfaceProps {
  index: number
}
const Surface = styled.div<SurfaceProps>`
  transform: translateX(${p => 140 * p.index}px);
  transition: transform .3s cubic-bezier(0,1,.5,1);
  background:white;
  text-transform: uppercase;
  position:absolute;
  width: 132px;
  height: 40px;
  border-radius: 20px;
  left: 2px;
  top: 2px;
  display:flex;
  align-items: center;
  justify-content:center;
`