
import React from 'react';
import styled, { css } from 'styled-components'

export default function Text() {
  return <>
    <MasterYourTrack>Master Your Track,</MasterYourTrack>
    <Instantly>Instantly</Instantly>
    <P>An online mastering engine that’s fast, easy to use, and sounds incredible</P>
    <P style={{ fontWeight: 500 }}>Made by Grammy-winning engineers, powered by AI</P>
    <P style={{ margin: 25 }}>
      <Arrow />
      Upload your track and hear it now for free
      <Arrow />
    </P>
  </>
}

const bigtext = css`
  z-index:1000;
  font-size:72px;
  line-height:82px;
  font-weight: 700;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 6.4vh;
    line-height: 1.2;
  }
`
const MasterYourTrack = styled.div`
  ${bigtext}
  margin:36px 0 6px 0;
  color: #fff;
  text-shadow: 0 0 29px #000;
  @media (max-width: 768px) {
    width:250px;
  }
`
const Instantly = styled.div`
  ${bigtext}
  height: 85px;
  width: 350px;
  color: #ff003e;
  font-style: italic;
  background: -webkit-linear-gradient(#ff003e,#a409ad);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  margin-bottom: 32px;
`
const P = styled.h1`
  z-index:100;
  text-align: center;
  color: #fff;
  font-size: 19px;
  font-weight: 300;
  line-height: 18px;
  margin: 0 0 16px 0;
  display:flex;
  align-items:center;
`
function Arrow() {
  return <img src="/img/icon_arrow_down-1.svg" style={{ margin: 8 }} />
}