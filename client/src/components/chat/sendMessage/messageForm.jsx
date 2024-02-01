import { useState } from 'react'
import MessageInput from './messageInput'
import MessageButton from './messageButton'
import { QueryContext, SetQueryContext } from '../../../Context/CommonContext';

export default function MessageForm() {
  const [message, setMessage] = useState('');
  return (
    <QueryContext.Provider value={message}>
        <SetQueryContext.Provider value={setMessage}>
          <form>
            <label>
              <MessageInput placeholder='Написать сообщение'/>
            </label>
            <MessageButton>Отправить</MessageButton>
          </form>
        </SetQueryContext.Provider>
    </QueryContext.Provider>
  )
}
