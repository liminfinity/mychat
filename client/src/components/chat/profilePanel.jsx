import { useContext } from 'react'
import { UserContext } from '../../context/ChatContext'
import Avatar from './Avatar'
export default function ProfilePanel() {
    const user = useContext(UserContext)


    return (
        <div className='flex justify-center items-center gap-4'>
            <span>Hello, <span className='text-text_color_myName font-medium'>{user.firstName}</span></span>
            <Avatar src={user.avatar}/>
        </div>
    )
}
