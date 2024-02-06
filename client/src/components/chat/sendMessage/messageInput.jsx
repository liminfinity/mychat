import React, { useContext } from 'react'
import { QueryContext } from '../../../context/CommonContext'

export default function MessageInput({placeholder, className}) {
  
  const {message, setMessage} = useContext(QueryContext);

  return (
    <>
      <input className={'input' + (className || '')} type="text" placeholder={placeholder} value={message} onChange={(e) => setMessage(e.target.value)}/>
    </>
  )
}
