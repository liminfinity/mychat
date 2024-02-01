import { useContext, useEffect } from 'react'
import { ActiveFriendContext, MessagesContext, SetMessagesContext, UserContext } from '../../Context/ChatContext'
import axios from 'axios'
import Message from './message'

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
        <ul>
            {messages.map(message => {
                return <Message key={message.id} message={message}/>
            })}
        </ul>
    )
}
