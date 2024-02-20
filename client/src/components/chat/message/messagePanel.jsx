import { useContext } from 'react'
import { ActivePartnerContext } from '../../../context/ChatContext'
import Avatar from '../Avatar'
import MessageContent from './messageContent'
import { getDate } from '../../../utils/formatMessage'
import { useAuth } from '../../../hook/useAuth'

export default function MessagePanel({message, className}) {
    const {activePartner} = useContext(ActivePartnerContext)
    const {user} = useAuth()
    const timestamp = new Date(message.timestamp)
    const isFriend = activePartner.id === message.sender
    const timestampMessage = getDate(timestamp);
    return (
        <li className={'flex w-full 1100:w-2/3 items-center gap-2 550:gap-5' + (!isFriend ? ' flex-row-reverse' : '') + (className || '')}>
            <Avatar src={isFriend ? activePartner.avatar : user.avatar} className=' w-8 550:w-11 self-end'/>
            <MessageContent sender={message.sender} content={message.content}/>
            <span className='self-end text-sm 550:text-base'>{timestampMessage}</span>
        </li>
    )
}
