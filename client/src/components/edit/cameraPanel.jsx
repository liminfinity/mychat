import React, { useContext, useEffect, useRef, useState } from 'react'
import Title from '../common/Title'
import { CameraOpenContext } from '../../context/EditContext'
import CircularProgress from '@mui/material/CircularProgress';
import { QueryContext } from '../../context/CommonContext';
import CameraButton from './cameraButton';

export default function CameraPanel() {
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const canvasRef = useRef(null);
    const {setCameraOpen} = useContext(CameraOpenContext);
    const [isLoadingCamera, setLoadingCamera] = useState(true)
    const {setForm} = useContext(QueryContext);
    const modalRef = useRef(null);

    function captureAvatar() {
      const ctx = canvasRef.current.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(videoRef.current, 0, 0, 270, 200);
      canvasRef.current.toBlob(blob => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(blob);
        fileReader.addEventListener('load', () => {
          setForm((draftForm) => {
            draftForm.avatarBuffer = new Uint8Array(fileReader.result),
            draftForm.tempAvatar = URL.createObjectURL(blob)
          })
          closeCamera()
        })
      })

    }
    function handleOutsideClick(e) {
        if (!modalRef.current.contains(e.target)) {
          setCameraOpen(false)
          closeCamera()
        }
    }
    useEffect(() => {
        setTimeout(() => document.addEventListener('click', handleOutsideClick))
        return () => document.removeEventListener('click', handleOutsideClick)
    }, []) 

    function closeCamera() {
      try {
        streamRef.current.getVideoTracks().forEach(track => track.stop())
        videoRef.current.srcObject = null;
        setCameraOpen(false)
      } catch(e) {
        throw new Error(`Camera didn't close`)
      } 
      
    }
    useEffect(() => {
        function openCamera() {
          try {
            setLoadingCamera(false)
            videoRef.current?.play()
          } catch(e) {
            throw new Error(`Camera didn't open`)
          }
          
        }
        async function loadStream() {
          try {
            if (navigator?.mediaDevices) {
              const mediaDevices = navigator.mediaDevices;
              streamRef.current = await mediaDevices.getUserMedia({
                  video: true
              })
              videoRef.current.srcObject = streamRef.current;
              videoRef.current.addEventListener('loadedmetadata', openCamera)
            }
          } catch(e) {
            setLoadingCamera(true)
            throw new Error(`Stream didn't load`)
          }
          
        }
        loadStream();
        return () => {
          videoRef.current?.removeEventListener('loadedmetadata', openCamera)
        }
    }, [])
  return (
    <div ref={modalRef} className='fixed whiteGlass rounded-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-3 flex flex-col w-5/6 justify-center items-center gap-4 animate-openModal' >
        <Title level={3}>Take a photo of yourself</Title>
        {isLoadingCamera && <CircularProgress/>}
        <video ref={videoRef} className={'rounded-lg ' + (isLoadingCamera ? "hidden" : '')} src=""></video>
        <canvas width={270} height={200} ref={canvasRef} className='hidden'></canvas>
        <div className='flex items-center justify-between w-full gap-2'>
            <CameraButton disabled={isLoadingCamera} handleClick={closeCamera}>Cancel</CameraButton>
            <CameraButton disabled={isLoadingCamera} handleClick={captureAvatar}>Make a photo</CameraButton>
        </div>
    </div>
  )
}
