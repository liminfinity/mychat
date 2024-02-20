import { useContext, useEffect, useRef } from 'react'
import { ActivePartnerContext, FriendsContext, GetFriendsContext, MessagesContext } from '../../context/ChatContext'
import MessagePanel from './message/messagePanel'
import { MessagesConnect } from '../../utils/axiosCreate'
import { useAuth } from '../../hook/useAuth'

export default function DialogPanel() {
    const {user} = useAuth()
    const {activePartner} = useContext(ActivePartnerContext)
    const {messages, setMessages} = useContext(MessagesContext)
    const getFriends = useContext(GetFriendsContext)
    const {setFriends} = useContext(FriendsContext)
    const listRef = useRef(null)
    useEffect(() => {
        async function getMessages() {
            const res = await MessagesConnect.get('/', {
                params: {
                    userId: user.id,
                    partnerId: activePartner.id
                }
            })
            const {messages} = res.data;
            setMessages(messages);
            const friends = await getFriends();
            setFriends(friends)
        }
        getMessages()
    }, [])
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
          }
    }, [messages])
    return (
        <ul ref={listRef} className='py-8 px-3 flex-grow flex flex-col gap-12 overflow-y-auto overflow-x-hidden'>
            {messages.map(message => {
                return <MessagePanel key={message.id} message={message} className={message.sender === user.id ? ' self-end' : ' self-start'}/>
            })}
        </ul>
    )
}
