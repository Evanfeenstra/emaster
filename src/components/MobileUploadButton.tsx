import React from 'react';
import styled from 'styled-components'

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
export default function MobileUploadButton({ onClick }: Props) {
  return <Wrap onClick={onClick} 
    data-testid="mobile-upload-button"
  >
    UPLOAD A TRACK
    <Arrow src="/img/right_arrow.svg" />
  </Wrap>
}

const Arrow = styled.img`
  height:25px;
  width:25px;
`
const Wrap = styled.button`
  cursor:pointer;
  position:relative;
  padding: 12px 24px;
  min-width: 280px;
  width: auto;
  width: fit-content;
  max-width: calc(100% - 96px);
  box-shadow: 0 8px 16px -4px rgba(0,0,0,.5);
  margin: 28px auto 84px;
  white-space: nowrap;
  height: 46px;
  border-radius: 24px;
  background: linear-gradient(185deg,#eb2552 0,#ba1891 100%);
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  border: none;
`