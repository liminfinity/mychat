import { useContext, useState } from 'react'
import MessageInput from './messageInput'
import MessageButton from './messageButton'
import { QueryContext, SetQueryContext } from '../../../Context/CommonContext';
import { SendMessageContext } from '../../../Context/ChatContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react'

export default function MessageForm() {
  const [message, setMessage] = useState('');
  const [isOpenEmoji, setOpenEmoji] = useState(false);
  const sendMessage = useContext(SendMessageContext);

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(message)
  }
  function handleEmojiClick({emoji}) {
    setMessage(message + emoji)
  }

  return (
    <QueryContext.Provider value={message}>
        <SetQueryContext.Provider value={setMessage}>
          <form onSubmit={handleSubmit}>
            <label>
              <MessageInput placeholder='Type a message'/>
            </label>
            <MessageButton>Send <FontAwesomeIcon icon={faLocationArrow}/></MessageButton>
          </form>
          <div>
            <FontAwesomeIcon icon={faFaceSmile} onClick={() => setOpenEmoji(!isOpenEmoji)}/>
            {isOpenEmoji && <EmojiPicker onEmojiClick={handleEmojiClick}/>}
          </div>
        </SetQueryContext.Provider>
    </QueryContext.Provider>
  )
}
