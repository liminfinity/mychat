import { useContext } from 'react'
import { UserContext } from '../../Context/ChatContext'
import styles from '../../styles/common.module.scss'
export default function ProfilePanel() {
    const user = useContext(UserContext)
    return (
        <div className='flex justify-center items-center'>
            <span>Hello, {user.username}</span>
            <img src={user.avatar} className={styles.avatar} alt="" />
        </div>
    )
}
