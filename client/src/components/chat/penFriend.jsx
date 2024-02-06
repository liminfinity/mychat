import { useContext } from 'react'
import { ActiveFriendContext, SetActiveFriendContext, UserContext } from '../../context/ChatContext'
import Avatar from './Avatar';
import Title from '../common/Title';
import { getDate } from '../../utils/formatMessage';


export default function PenFriend({friend}) {
    const user = useContext(UserContext);
    const activeFriend = useContext(ActiveFriendContext);
    const setActiveFriend = useContext(SetActiveFriendContext)
    const lastMessage = friend.lastMessage;
    const timestamp = new Date(lastMessage.timestamp)
    const timeMessage = getDate(timestamp)
    const isOnline = friend?.isOnline;
    function handleClick() {
      setActiveFriend(friend)
    }
    
    return (
      <li onClick={handleClick} className={'bg-mainColor pl-6 py-4 pr-4 grid grid-rows-2 grid-cols-9 items-center justify-center cursor-pointer border-t-2 transition-all' + (activeFriend?.id === friend.id ? ' shadow-activeFriend' : '')}>
          <div className={'row-start-1 row-span-3 col-start-1 col-span-2 self-stretch flex justify-start items-center relative after:absolute after:top-0 after:left-10 after:block after:w-5 after:h-5 after:rounded-full after:border-white after:border-4 after:bg-offlineStatus' + (isOnline ? ' after:bg-onlineStatus' : '')}>
            <Avatar src={friend.avatar}/>
          </div>
          <Title level={3} className='row-start-1 row-span-1 col-start-3 col-span-4 indent-3 text-title font-medium text-lg'>{friend.username}</Title>
          <span className='row-start-1 row-span-1 col-start-8 col-span-2 justify-self-end'>{timeMessage}</span>
          <span className='row-start-2 row-span-1 col-start-3 col-span-7 indent-2'>{(user.id === lastMessage.sender ? 'You: ' : '') + lastMessage.content}</span>
      </li>
    )
  }
