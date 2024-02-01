import { useEffect, useRef, useState } from "react"
import io from 'socket.io-client'
import {useLocation} from 'react-router-dom'

export default function Chat() {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef(null);
    const location = useLocation();
    useEffect(() => {
        socket.current = io('http://localhost:5000', {
            path: '/chat',
            query: {
                user: JSON.stringify(location.state.user)
            }
        })
        return () => {
            socket.current.disconnect();
        }
    }, [])
    useEffect(() => {
        socket.current.on('USER:ONLINE', user => {
            setOnlineUsers((prevUsers) => [user, ...prevUsers])
        })
        return () => {
            socket.current.removeAllListeners('USER:ONLINE')
        }
    }, [])
    return (
        <div>
            <section>
                <h2>Чат</h2>
            </section>
            <section>Пользователи онлайн:</section>
            {onlineUsers && (
                <ul>
                    {onlineUsers.map(user => (
                        <li key={user.id}>{user.username}</li>
                    ))}
                </ul>
            )}
            
        </div>
    )
}
