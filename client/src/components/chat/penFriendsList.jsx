import { useContext } from 'react'
import PenFriend from './penFriend'
import { FriendsContext } from '../../Context/ChatContext'

export default function PenFriendsList() {
  const friends = useContext(FriendsContext)
  
  return (
    <ul>
      {friends.map(friend => {
        return <PenFriend key={friend.id} friend={friend}/>
      })}
    </ul>
  )
}