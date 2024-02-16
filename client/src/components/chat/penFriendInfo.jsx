import { useContext } from 'react'
import { ActivePartnerContext, MobileChatContext, OnlineIdsContext } from '../../context/ChatContext'
import Avatar from './Avatar'
import { getUsername } from '../../utils/formatMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
export default function PenFriendInfo() {
    const {activePartner, setActivePartner} = useContext(ActivePartnerContext)
    const {onlineIds} = useContext(OnlineIdsContext)
    const isOnline = onlineIds.has(activePartner.id);
    const {setMobileChatOpen, isMobile} = useContext(MobileChatContext)
    const username =  getUsername(activePartner.firstName, activePartner.lastName)
    function handleCloseMobileChat() {
        setMobileChatOpen(false)
        if (isMobile) {
            setActivePartner(null)
        }
    }

    return (
        <div className='pb-5 px-4 910:px-0 flex items-center gap-5 550:gap-6 border-b-2'>
            <FontAwesomeIcon className='button w-6 h-6 550:hidden hover:text-sendMessageHover' onClick={handleCloseMobileChat} icon={faArrowLeft}/>
            <div className={'relative after:absolute after:top-0 after:left-8 after:block after:w-5 after:h-5 after:rounded-full after:border-white after:border-4 after:bg-offlineStatus' + (isOnline ? ' after:bg-onlineStatus' : '')}>
                <Avatar src={activePartner.avatar} className=' w-11'/>
            </div>
            <span>{username}</span>
        </div>
    )
}
