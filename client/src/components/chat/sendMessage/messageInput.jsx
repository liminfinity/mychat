import React, { useContext } from 'react'
import { QueryContext, SetQueryContext } from '../../../Context/CommonContext'

export default function MessageInput({placeholder}) {
  
  const message = useContext(QueryContext);
  const setMessage = useContext(SetQueryContext);

  return (
    <>
      <input type="text" placeholder={placeholder} value={message} onChange={(e) => setMessage(e.target.value)}/>
    </>
  )
}
