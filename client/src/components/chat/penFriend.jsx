import { useContext } from 'react'
import { SetActiveFriendContext, UserContext } from '../../Context/ChatContext'
export default function PenFriend({friend}) {
    const user = useContext(UserContext);
    const setActiveFriend = useContext(SetActiveFriendContext)
    const lastMessage = friend.lastMessage;
    const timestamp = new Date(lastMessage.timestamp)

    function handleClick() {
      setActiveFriend(friend)
    }
    
    return (
      <li onClick={handleClick}>
          <span>{friend.username}</span>
          <span>{(user.id === lastMessage.sender ? 'Вы: ' : '') + lastMessage.content}</span>
          <span>{timestamp.toLocaleTimeString()}</span>
      </li>
    )
  }
