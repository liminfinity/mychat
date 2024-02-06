import { useContext } from 'react'
import { ActiveFriendContext, UserContext } from '../../../context/ChatContext'
import Avatar from '../Avatar'
import MessageContent from './messageContent'
import { getDate } from '../../../utils/formatMessage'

export default function MessagePanel({message, className}) {
    const activeFriend = useContext(ActiveFriendContext)
    const user = useContext(UserContext)
    const timestamp = new Date(message.timestamp)
    const isFriend = activeFriend.id === message.sender
    const timestampMessage = getDate(timestamp);
    return (
        <li className={'flex w-2/3 items-center gap-5' + (!isFriend ? ' flex-row-reverse' : '') + (className || '')}>
            <Avatar src={isFriend ? activeFriend.avatar : user.avatar} className=' w-11'/>
            <MessageContent sender={message.sender} content={message.content}/>
            <span className='self-end'>{timestampMessage}</span>
        </li>
    )
}
