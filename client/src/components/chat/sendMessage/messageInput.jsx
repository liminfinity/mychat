import React, { useContext } from 'react'
import { QueryContext, SetQueryContext } from '../../../Context/CommonContext'

export default function MessageInput({placeholder, className}) {
  
  const message = useContext(QueryContext);
  const setMessage = useContext(SetQueryContext);

  return (
    <>
      <input className={'input' + (className || '')} type="text" placeholder={placeholder} value={message} onChange={(e) => setMessage(e.target.value)}/>
    </>
  )
}
