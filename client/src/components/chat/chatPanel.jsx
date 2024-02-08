import { useContext, Fragment } from 'react'
import { ActivePartnerContext } from '../../context/ChatContext'
import PenFriendInfo from './penFriendInfo';
import MessageForm from './sendMessage/messageForm';
import DialogPanel from './dialogPanel';

export default function ChatPanel() {
    const {activePartner} = useContext(ActivePartnerContext)
    return (
        <>
            {!activePartner && (
                <div className='py-5 flex justify-center items-center'>
                    <span className='font-medium text-xl'>Select chat</span>
                </div>
            )}
            {activePartner && (
                <Fragment key={activePartner.id}>
                    <PenFriendInfo/>
                    <DialogPanel/>
                    <MessageForm/>
                </Fragment>
            )}
        </>
    )
}
