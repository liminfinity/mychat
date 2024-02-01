import { useContext, useState } from 'react'
import MessageInput from './messageInput'
import MessageButton from './messageButton'
import { QueryContext, SetQueryContext } from '../../../Context/CommonContext';
import { SendMessageContext } from '../../../Context/ChatContext';

export default function MessageForm() {
  const [message, setMessage] = useState('');
  const sendMessage = useContext(SendMessageContext)

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(message)
  }
  return (
    <QueryContext.Provider value={message}>
        <SetQueryContext.Provider value={setMessage}>
          <form onSubmit={handleSubmit}>
            <label>
              <MessageInput placeholder='Написать сообщение'/>
            </label>
            <MessageButton>Отправить</MessageButton>
          </form>
        </SetQueryContext.Provider>
    </QueryContext.Provider>
  )
}
