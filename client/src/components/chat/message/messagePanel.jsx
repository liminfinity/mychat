import { useContext } from 'react'
import { ActivePartnerContext, UserContext } from '../../../context/ChatContext'
import Avatar from '../Avatar'
import MessageContent from './messageContent'
import { getDate } from '../../../utils/formatMessage'

export default function MessagePanel({message, className}) {
    const {activePartner} = useContext(ActivePartnerContext)
    const user = useContext(UserContext)
    const timestamp = new Date(message.timestamp)
    const isFriend = activePartner.id === message.sender
    const timestampMessage = getDate(timestamp);
    return (
        <li className={'flex w-2/3 items-center gap-5' + (!isFriend ? ' flex-row-reverse' : '') + (className || '')}>
            <Avatar src={isFriend ? activePartner.avatar : user.avatar} className=' w-11'/>
            <MessageContent sender={message.sender} content={message.content}/>
            <span className='self-end'>{timestampMessage}</span>
        </li>
    )
}
