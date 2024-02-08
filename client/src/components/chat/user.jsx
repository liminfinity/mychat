import { useContext } from 'react'
import Avatar from './Avatar'
import { getUsername } from '../../utils/formatMessage'
import { ActivePartnerContext } from '../../context/ChatContext'

export default function User({user}) {
  const username = getUsername(user.firstName, user.lastName)
  const {setActivePartner} = useContext(ActivePartnerContext)
  return (
    <li onClick={() => setActivePartner(user)} className='flex items-center py-2 px-4 rounded-lg gap-5 cursor-pointer transition-all duration-300 hover:shadow-activeUser'>
        <Avatar src={user.avatar}/>
        <span className='text-title font-medium text-lg'>{username}</span>
    </li>
  )
}
