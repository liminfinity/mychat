import { useContext, useEffect, useRef, useState } from 'react'
import MessageInput from './messageInput'
import MessageButton from './messageButton'
import { QueryContext } from '../../../context/CommonContext';
import { SendMessageContext, SpeakingContext } from '../../../context/ChatContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react'
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import SpeechButton from './speechButton';

export default function MessageForm() {
  const [message, setMessage] = useState('');
  const [isOpenEmoji, setOpenEmoji] = useState(false);
  const [isSpeaking, setSpeaking] = useState(false);
  const sendMessage = useContext(SendMessageContext);
  const smilePicker = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (message) {
      sendMessage(message);
      setSpeaking(false);
      setMessage('');
    }
    
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
    <QueryContext.Provider value={{message, setMessage}}>
      <SpeakingContext.Provider value={{isSpeaking, setSpeaking}}>
        <form onSubmit={handleSubmit} className='pt-3 flex px-2 910:px-0 gap-3 910:gap-4 items-center border-t-2 bg-mainColor'>
            <label className='flex-grow'>
              <MessageInput className=' w-full' placeholder='Type a message'/>
            </label>
            {"webkitSpeechRecognition" in window && <SpeechButton/>}
            <div className='relative flex justify-center items-center' ref={smilePicker}>
              <FontAwesomeIcon className='w-6 h-6 cursor-pointer transition-all hover:text-sendMessage' icon={faSmile} onClick={() => setOpenEmoji(!isOpenEmoji)}/>
              {isOpenEmoji && <EmojiPicker className='emojiPicker' onEmojiClick={handleEmojiClick}/>}
            </div>
            <MessageButton>Send <FontAwesomeIcon icon={faLocationArrow}/></MessageButton>
          </form>
      </SpeakingContext.Provider>
    </QueryContext.Provider>
  )
}
