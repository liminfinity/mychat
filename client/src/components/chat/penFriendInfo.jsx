import { useContext } from 'react'
import { ActiveFriendContext } from '../../Context/ChatContext'

export default function PenFriendInfo() {
    const activeFriend = useContext(ActiveFriendContext)
    return (
        <div>
            <span>{activeFriend.username}</span>
        </div>
    )
}
