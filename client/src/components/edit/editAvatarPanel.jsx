import { useContext, useEffect, useRef, useState } from 'react'
import Avatar from '../chat/Avatar'
import { QueryContext } from '../../context/CommonContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import PhotoMethodPanel from './photoMethodPanel'
import CameraPanel from './cameraPanel'
import { CameraOpenContext } from '../../context/EditContext'


export default function EditAvatarPanel() {
    const {form} = useContext(QueryContext)
    const [isOpen, setOpen] = useState(false);
    const [isCameraOpen, setCameraOpen] = useState(false);
    const modalRef = useRef(null);

    function handleOutsideClick(e) {
        if (!modalRef.current.contains(e.target)) {
          setOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => document.removeEventListener('click', handleOutsideClick)
    }, []) 
    return (
        <div className='relative'>
            <Avatar src={form.tempAvatar} className=' select-none w-20 h-20'/>
            <CameraOpenContext.Provider value={{isCameraOpen, setCameraOpen}}>
                <div ref={modalRef}>
                    <FontAwesomeIcon onClick={() => setOpen(!isOpen)} className='absolute photo bottom-0 right-0' icon={faCamera}/>
                    {isOpen && <PhotoMethodPanel setOpen={setOpen} className=' absolute left-full -ml-2'/>}
                    {isCameraOpen && <CameraPanel/>}
                </div>
            </CameraOpenContext.Provider>
            
        </div>

    )
}
