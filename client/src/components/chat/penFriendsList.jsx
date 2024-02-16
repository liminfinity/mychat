import { useContext } from 'react'
import PenFriend from './penFriend'
import { FriendsContext } from '../../context/ChatContext'

export default function PenFriendsList() {
  const {friends} = useContext(FriendsContext)
  const frSorted = [...friends].sort((fr1, fr2) => new Date(fr2.lastMessage.timestamp) - new Date(fr1.lastMessage.timestamp))
  
  return (
    <>
      {!friends.length && (
        <div className='pt-5 flex justify-center items-center'>
            <span className='font-medium text-lg'>No friends</span>
        </div>
      )}
      {Boolean(friends.length) && (
        <ul className='overflow-y-auto overflow-x-hidden last:border-b-2'>
          {frSorted.map(friend => {
            return <PenFriend friend={friend} key={friend.id}/>
          })}
        </ul>
      )}
      
    </>
  )
}