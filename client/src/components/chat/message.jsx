import { useContext } from 'react'
import { ActiveFriendContext } from '../../Context/ChatContext'

export default function Message({message}) {
    const activeFriend = useContext(ActiveFriendContext)
    const timestamp = new Date(message.timestamp)
    const isFriend = activeFriend.id === message.sender 
    return (
        <li>
            <span>{(isFriend ? activeFriend.username : '') + ' ' + message.content}</span>
            <span>{timestamp.toLocaleTimeString()}</span>
        </li>
    )
}
