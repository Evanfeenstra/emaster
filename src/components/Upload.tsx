import React, { useCallback, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components'
import { useDropzone } from 'react-dropzone'
import { toBase64, downloadBase64File } from './utils'
import * as localForage from 'localforage'

const acceptTypes = 'audio/*,.mp3,.wav,.m4a,.aif,.wma,.flac,.aiff,.aax,.ogg'

interface UploadProps {
  filekey: string // key for localForage
  noGrow: boolean // dont grow on hover, in mobile view
  name?: string // name to display
  style?: { [k: string]: any }
}
export default function Upload({ filekey, name, noGrow, style }: UploadProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [filename, setFilename] = useState<string>('')
  const hasFile = filename ? true : false
  const contentKey = `${filekey}_content`
  const nameKey = `${filekey}_name`

  const onDrop = useCallback(async acceptedFiles => {
    if (hasFile) return
    if (acceptedFiles.length === 0) return
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

  async function download() {
    if (!hasFile) return
    const content = await localForage.getItem(contentKey)
    downloadBase64File(String(content), filename)
  }

  const inputProps = getInputProps()
  const rootProps = getRootProps()
  const extraStyle = style || {}
  return <Wrap visible={visible} style={extraStyle}>
    <Main {...rootProps} show={!uploading} hasName={name ? true : false} noGrow={noGrow}>
      {!hasFile && <Input {...inputProps} placeholder={filekey} />}
      <UploadPicWrap onClick={download} data-testid="click-to-download">
        <UploadPic src="/img/upload.svg" download={hasFile} alt="upload" />
      </UploadPicWrap>
      <Content>
        <Arrow alt="upload-arrow" hasFile={hasFile}
          src={hasFile ? "/img/icon_download.svg" : "/img/icon_upload-1.svg"}
        />
        <Text bold>
          {name ? name.toUpperCase() : !noGrow && (
            hasFile ? 'Download your file' : 'Drop your track here'
          )}
        </Text>
        {!name && !noGrow && <Text>
          {hasFile ? filename : 'Or click to browse'}
        </Text>}
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
  font-size:14px;
  max-width: 215px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
const pulse = keyframes`
  0% {transform: scale(1)}
  50% {transform: scale(1.05)}
  100% {transform: rotate(1)}
`
interface ArrowProps {
  hasFile: boolean
}
// down arrow pic has more padding :(
const Arrow = styled.img<ArrowProps>`
  height:${p => p.hasFile ? 100 : 92}px;
  width:${p => p.hasFile ? 100 : 92}px;
  transform-origin: center bottom;
  margin-bottom:${p => p.hasFile ? -9 : 0}px;
`
interface MainProps {
  show: boolean
  hasName: boolean
  noGrow: boolean
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
  & ${Content} {
    top:${p => p.noGrow ? 0 : (p.hasName ? -4 : 14)}px;
  }
  & ${Text} {
    opacity: ${p => p.hasName ? 1 : 0};
  }
  &:hover ${Text} {
    opacity:1;
    transition: .3s opacity ease;
  }
  &:hover ${UploadPic} {
    animation: ${rotate360} 3s linear infinite;
  }
  &:hover ${Arrow} {
    animation: ${pulse} 1s ease infinite;
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
  &:hover ${Content} {
    transform: translateY(${p => p.noGrow ? 0 :
    p.hasName ? -62 : -82
  }px);
  }
  &:hover ${UploadPicWrap} {
    ${p => !p.noGrow && `transform:scale3d(1.67,1.67,1.67);`}
  }
  &:hover:before{
    ${p => !p.noGrow && `transform:scale(30);`}
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
async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}