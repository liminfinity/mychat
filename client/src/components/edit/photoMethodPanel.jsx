import { useContext, useRef } from 'react'
import { QueryContext } from '../../context/CommonContext';

import { CameraOpenContext } from '../../context/EditContext';
import { MobileChatContext } from '../../context/ChatContext';

export default function PhotoMethodPanel({className, setOpen}) {
    const fileInput = useRef(null);
    const {setForm} = useContext(QueryContext);
    const {setCameraOpen} = useContext(CameraOpenContext)
    const {isMobile} = useContext(MobileChatContext)
    function handleFileClick(e) {
        e.preventDefault();
        fileInput.current.click()
    }
    function handleFileChange(e) {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = () => {
            const buffer = new Uint8Array(fileReader.result);
            setForm((draftForm) => {
                draftForm.avatarBuffer = buffer,
                draftForm.tempAvatar = URL.createObjectURL(new Blob([buffer], {
                    type: 'image/png'
                })) 
            })
        }
    }

    function handleCameraOpen() {
        setCameraOpen(true)
        setOpen(false)
    }

    
    return (
        <>
            <ul className={'whiteGlass animate-openModal rounded-lg p-2 z-50' + (className || '')}>
                <li>
                    <input onClick={handleFileClick} className='photoInput ' type="button" 
                    value={"File" + (isMobile ? ' or photo' : '')} />
                    <input ref={fileInput} className='hidden' type="file" name="" onChange={handleFileChange}/>
                </li>
                {!isMobile && (
                    <li>
                        <input onClick={handleCameraOpen} className='photoInput' type="button" value="Make a photo" />
                    </li>
                )}
            </ul>
        </>
    )
}
