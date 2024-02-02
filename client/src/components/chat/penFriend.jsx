import { useContext } from 'react'
import { SetActiveFriendContext, UserContext } from '../../Context/ChatContext'
import styles from "../../styles/common.module.scss"

export default function PenFriend({friend}) {
    const user = useContext(UserContext);
    const setActiveFriend = useContext(SetActiveFriendContext)
    const lastMessage = friend.lastMessage;
    const timestamp = new Date(lastMessage.timestamp)
    const isOnline = friend?.isOnline;

    function handleClick() {
      setActiveFriend(friend)
    }
    
    return (
      <li onClick={handleClick} className='grid grid-rows-2 grid-cols-4 items-center justify-center'>
          <div className={'relative after:absolute after:top-0 after:left-10 after:block after:w-5 after:h-5 after:rounded-full after:border-white after:border-4 after:bg-offlineStatus' + (isOnline ? ' after:bg-onlineStatus' : '')}>
            <img src={friend.avatar} className={styles.avatar + ' row-start-1 row-end-2 col-start-1 col-end-2'} alt="" />
          </div>
          <span className='row-start-1 row-end-1 col-start-2 col-end-3'>{friend.username}</span>
          <span className='row-start-1 row-end-1 col-start-3 col-end-4'>{timestamp.toLocaleTimeString()}</span>
          <span className='row-start-2 row-end-2 col-start-2 col-end-4'>{(user.id === lastMessage.sender ? 'You: ' : '') + lastMessage.content}</span>
      </li>
    )
  }
