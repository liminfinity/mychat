import { useContext, Fragment } from 'react'
import { ActiveFriendContext } from '../../context/ChatContext'
import PenFriendInfo from './penFriendInfo';
import MessageForm from './sendMessage/messageForm';
import DialogPanel from './dialogPanel';

export default function ChatPanel() {
    const activeFriend = useContext(ActiveFriendContext)
    return (
        <>
            {!activeFriend && (
                <div className='py-5 flex justify-center items-center'>
                    <span className='font-medium text-xl'>Select chat</span>
                </div>
            )}
            {activeFriend && (
                <Fragment key={activeFriend.id}>
                    <PenFriendInfo/>
                    <DialogPanel/>
                    <MessageForm/>
                </Fragment>
            )}
        </>
    )
}
