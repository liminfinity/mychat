import { useContext } from 'react'
import { ActivePartnerContext, OnlineIdsContext } from '../../context/ChatContext'
import Avatar from './Avatar'
import { getUsername } from '../../utils/formatMessage'
export default function PenFriendInfo() {
    const {activePartner} = useContext(ActivePartnerContext)
    const {onlineIds} = useContext(OnlineIdsContext)
    const isOnline = onlineIds.has(activePartner.id);

    const username =  getUsername(activePartner.firstName, activePartner.lastName)

    return (
        <div className='pb-5 flex items-center gap-6 border-b-2'>
            <div className={'relative after:absolute after:top-0 after:left-8 after:block after:w-5 after:h-5 after:rounded-full after:border-white after:border-4 after:bg-offlineStatus' + (isOnline ? ' after:bg-onlineStatus' : '')}>
                <Avatar src={activePartner.avatar} className=' w-11'/>
            </div>
            <span>{username}</span>
        </div>
    )
}
