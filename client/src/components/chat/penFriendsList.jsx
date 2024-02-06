import { useContext } from 'react'
import PenFriend from './penFriend'
import { FriendsContext } from '../../context/ChatContext'

export default function PenFriendsList() {
  const friends = useContext(FriendsContext)
  
  return (
    <ul className='overflow-y-auto overflow-x-hidden last:border-b-2'>
      {friends.map(friend => {
        return <PenFriend key={friend.id} friend={friend}/>
      })}
    </ul>
  )
}