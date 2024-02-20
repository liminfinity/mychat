import Avatar from './Avatar'
import { useAuth } from '../../hook/useAuth'
export default function ProfilePanel() {
    const {user} = useAuth()

    return (
        <div className='flex justify-center items-center gap-4'>
            <span className='hidden sm:inline'>Hello, <span className='text-text_color_myName font-medium'>{user.firstName}</span></span>
            <Avatar src={user.avatar}/>
        </div>
    )
}
