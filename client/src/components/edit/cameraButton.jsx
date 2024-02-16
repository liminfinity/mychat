import React from 'react'

export default function CameraButton({children, handleClick, disabled}) {
    return <button disabled={disabled} onClick={handleClick} type="button" className={"button flex justify-center items-center gap-2 bg-sendMessage text-mainColor hover:bg-sendMessageHover disabled:bg-sendMessageDisabled rounded-xl py-3 px-2 flex-1"}>{children}</button>
  }
