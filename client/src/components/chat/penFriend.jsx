import { useContext } from 'react'
import { UserContext } from '../../Context/ChatContext'
export default function PenFriend({friend}) {
    const user = useContext(UserContext);
    const lastMessage = friend.lastMessage;
    return (
      <li>
          <span>{friend.username}</span>
          <span>{(user.id === lastMessage.sender ? 'Вы: ' : '') + lastMessage.content}</span>
          <span>{lastMessage.timestamp}</span>
      </li>
    )
  }
