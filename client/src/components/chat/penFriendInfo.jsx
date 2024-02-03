import { useContext } from 'react'
import { ActiveFriendContext } from '../../Context/ChatContext'
import Avatar from './Avatar'
export default function PenFriendInfo() {
    const activeFriend = useContext(ActiveFriendContext)
    const isOnline = activeFriend?.isOnline;
    return (
        <div className='pb-5 flex items-center gap-6 border-b-2'>
            <div className={'relative after:absolute after:top-0 after:left-8 after:block after:w-5 after:h-5 after:rounded-full after:border-white after:border-4 after:bg-offlineStatus' + (isOnline ? ' after:bg-onlineStatus' : '')}>
                <Avatar src={activeFriend.avatar} className=' w-11'/>
            </div>
            <span>{activeFriend.username}</span>
        </div>
    )
}
