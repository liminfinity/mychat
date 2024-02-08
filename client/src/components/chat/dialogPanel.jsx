import { useContext, useEffect } from 'react'
import { ActivePartnerContext, FriendsContext, GetFriendsContext, MessagesContext, UserContext } from '../../context/ChatContext'
import MessagePanel from './message/messagePanel'
import { MessagesConnect } from '../../utils/axiosCreate'

export default function DialogPanel() {
    const user = useContext(UserContext)
    const {activePartner} = useContext(ActivePartnerContext)
    const {messages, setMessages} = useContext(MessagesContext)
    const getFriends = useContext(GetFriendsContext)
    const {setFriends} = useContext(FriendsContext)

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
    return (
        <ul className='py-8 px-3 flex-grow flex flex-col gap-12 overflow-y-auto overflow-x-hidden'>
            {messages.map(message => {
                return <MessagePanel key={message.id} message={message} className={message.sender === user.id ? ' self-end' : ' self-start'}/>
            })}
        </ul>
    )
}
