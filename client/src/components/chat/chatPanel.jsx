import { useContext, Fragment } from 'react'
import { ActiveFriendContext } from '../../Context/ChatContext'
import PenFriendInfo from './penFriendInfo';
import MessageForm from './sendMessage/messageForm';
import DialogPanel from './dialogPanel';

export default function ChatPanel() {
    const activeFriend = useContext(ActiveFriendContext)
    return (
        <section>
            {!activeFriend && (
                <div>
                    <span>Чат не выбран</span>
                </div>
            )}
            {activeFriend && (
                <Fragment key={activeFriend.id}>
                    <PenFriendInfo/>
                    <DialogPanel/>
                    <MessageForm/>
                </Fragment>
            )}
        </section>
    )
}
