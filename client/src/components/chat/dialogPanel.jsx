import { useContext, useEffect } from 'react'
import { ActiveFriendContext, MessagesContext, SetMessagesContext, UserContext } from '../../context/ChatContext'
import axios from 'axios'
import MessagePanel from './message/messagePanel'

export default function DialogPanel() {
    const user = useContext(UserContext)
    const friend = useContext(ActiveFriendContext)
    const messages = useContext(MessagesContext)
    const setMessages = useContext(SetMessagesContext)

    useEffect(() => {
        async function getMessages() {
            const queryParams = new URLSearchParams({userId: user.id, friendId: friend.id});
            const result = await axios(`http://localhost:5000/chat/messages?${queryParams}`);
            const messages = result.data.messages;
            setMessages(messages);
        }
        getMessages()
    }, [])
    return (
        <ul className='py-8 px-3 flex-grow flex flex-col gap-12 overflow-y-auto overflow-x-hidden'>
            {messages.map(message => {
                return <MessagePanel key={message.id} message={message} className={message.sender === user.id ? ' self-end' : ' self-start'}/>
            })}
        </ul>
    )
}
