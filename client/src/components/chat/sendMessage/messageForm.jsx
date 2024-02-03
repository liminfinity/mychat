import { useContext, useEffect, useRef, useState } from 'react'
import MessageInput from './messageInput'
import MessageButton from './messageButton'
import { QueryContext, SetQueryContext } from '../../../Context/CommonContext';
import { SendMessageContext } from '../../../Context/ChatContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react'
import { faSmile } from '@fortawesome/free-regular-svg-icons';

export default function MessageForm() {
  const [message, setMessage] = useState('');
  const [isOpenEmoji, setOpenEmoji] = useState(false);
  const sendMessage = useContext(SendMessageContext);
  const smilePicker = useRef(null)

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(message)
    setMessage('')
  }
  function handleEmojiClick({emoji}) {
    setMessage(message + emoji)
  }
  function handleOutsideClick(e) {
    if (!smilePicker.current.contains(e.target)) {
      setOpenEmoji(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, []) 
  return (
    <QueryContext.Provider value={message}>
        <SetQueryContext.Provider value={setMessage}>
          <form onSubmit={handleSubmit} className='pt-3 flex gap-4 items-center border-t-2 bg-mainColor'>
            <label className='flex-grow'>
              <MessageInput className=' w-full' placeholder='Type a message'/>
            </label>
            <div className='relative' ref={smilePicker}>
              <FontAwesomeIcon className='w-6 h-6 cursor-pointer transition-all hover:text-sendMessage' icon={faSmile} onClick={() => setOpenEmoji(!isOpenEmoji)}/>
              {isOpenEmoji && <EmojiPicker style={{position: 'absolute', right: 0, bottom: 0, maxWidth: '350px', maxHeight: '350px' }} onEmojiClick={handleEmojiClick}/>}
            </div>
            <MessageButton>Send <FontAwesomeIcon icon={faLocationArrow}/></MessageButton>
          </form>
          
        </SetQueryContext.Provider>
    </QueryContext.Provider>
  )
}
