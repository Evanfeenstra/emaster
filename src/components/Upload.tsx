import React, { useCallback, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { toBase64, downloadBase64File } from './utils'
import * as localForage from 'localforage'

const acceptTypes = 'audio/*,.mp3,.wav,.m4a,.aif,.wma,.flac,.aiff,.aax,.ogg'

interface UploadProps {
  filekey: string
}
export default function Upload({ filekey }: UploadProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [filename, setFilename] = useState<string>('')
  const hasFile = filename ? true : false
  const contentKey = `${filekey}_content`
  const nameKey = `${filekey}_name`

  const onDrop = useCallback(async acceptedFiles => {
    if(hasFile) return
    if(acceptedFiles.length===0) return
    setUploading(true)
    const file = acceptedFiles[0]
    await sleep(1000)
    const base64 = await toBase64(file)

    localForage.setItem(contentKey, base64)
    localForage.setItem(nameKey, file.name)
    setFilename(file.name)
    await sleep(10)

    setUploading(false)
  }, [])

  useEffect(() => {
    // localForage.clear(); // uncomment for testing
    (async () => {
      const filename = await localForage.getItem(nameKey)
      if (filename) setFilename(String(filename))
      setVisible(true)
    })()
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptTypes
  })

  async function download(){
    if(!hasFile) return
    const content = await localForage.getItem(contentKey)
    downloadBase64File(String(content), filename)
  }

  return <Wrap visible={visible}>
    <Main {...getRootProps()} show={!uploading}>
      {!hasFile && <Input {...getInputProps()} placeholder={filekey} />}
      {/* <Progress /> */}
      <UploadPicWrap onClick={download}>
        <UploadPic src="/img/upload.svg" download={hasFile} alt="upload" />
      </UploadPicWrap>
      <Content>
        <Arrow src={hasFile ? "/img/icon_download.svg" : "/img/icon_upload-1.svg"} alt="upload-arrow" />
        <Text bold>
          {hasFile ? 'Download your file' : 'Drop your track here'}
        </Text>
        <Text>
          {hasFile ? filename : 'Or click to browse'}
        </Text>
      </Content>
    </Main>
    <Progress show={uploading} />
  </Wrap>
}

function Progress({ show }: { show: boolean }) {
  return <Svg height="184" width="184" show={show}>
    <circle
      height="184" width="184"
      r="85" cx="92" cy="92"
      stroke="#3d3d3d"
      strokeWidth="10"
      fill="transparent"
    />
  </Svg>
}

const breathe = keyframes`
  from {transform: scale(0.1)}
  to {transform: scale(1)}
`
interface SvgProps {
  show: boolean;
}
const Svg = styled.svg<SvgProps>`
  display:${p => p.show ? 'block' : 'none'};
  position:absolute;
  transform-origin: center;
  animation: ${breathe} 1.3s linear infinite;
`

const rotate360 = keyframes`
  from {transform: rotate(0deg)}
  to {transform: rotate(360deg)}
`
const UploadPicWrap = styled.div`
  position:absolute;
  height: 184px;
  width: 184px;
  z-index:50;
  transition: .3s transform ease;
  transform-origin: center bottom;
`
interface UploadPicProps {
  download: boolean
}
const UploadPic = styled.img<UploadPicProps>`
  position:absolute;
  z-index:50;
  transform-origin: center center;
  ${p => p.download && 'filter: hue-rotate(240deg)'};
`
const Content = styled.div`
  transition: .3s -webkit-transform ease;
  transition: .3s transform ease;
  position: relative;
  top: 18px;
  z-index: 5000;
  pointer-events: none;
  display:flex;
  flex-direction:column;
  align-items:center;
  width: 100%;
  height: 177px;
  justify-content: center;
`
interface TextProps {
  bold?: boolean;
}
const Text = styled.h4<TextProps>`
  font-weight:${p => p.bold ? 'bold' : 'normal'};
  color:white;
  margin:0;
  opacity:0;
  max-width: 215px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
interface MainProps {
  show: boolean
}
const Main = styled.div<MainProps>`
  opacity:${p => p.show ? 1 : 0};
  z-index:210;
  cursor: pointer;
  height:184px;
  width:184px;
  display: inline-flex;
  position:absolute;
  transition: .3s transform ease;
  transform-origin: center bottom;
  &:hover ${UploadPicWrap} {
    transform:scale3d(1.67,1.67,1.67);
  }
  &:hover ${UploadPic} {
    animation: ${rotate360} 3s linear infinite;
  }
  &:hover ${Content} {
    transform: translateY(-82px);
  }
  &:hover ${Text} {
    opacity:1;
    transition: .3s opacity ease;
  }
  &:before{
    content:"";
    pointer-events:none;
    position:absolute;
    width:100px;
    height:100px;
    top:0;left:0;right:0;bottom:0;
    transform-origin:center;
    margin:auto;
    background:rgba(0,0,0,.92);;
    transition: .2s transform ease;
    z-index: -2;
    border-radius:100%;
  }
  &:hover:before{
    transform:scale(30);
  }
`
interface WrapProps {
  visible: boolean
}
const Wrap = styled.div<WrapProps>`
  opacity:${p => p.visible ? 1 : 0};
  transition:opacity 0.2s ease;
  height:184px;
  width:184px;
  position:relative;
`
const Input = styled.input`
  transition: .3s transform ease;
  transform-origin: center bottom;
`
const Arrow = styled.img`
  height:92px;
  width:92px;
`
async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}