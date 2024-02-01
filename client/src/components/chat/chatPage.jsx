import { useState, useRef, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import Title from '../common/Title';
import MyFriends from './myFriends';
import { FriendsContext, SetFriendsContext, UserContext } from '../../Context/ChatContext';
import io from 'socket.io-client'

export default function ChatPage() {
    const [friends, setFriends] = useState([]);
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
    return (
        <UserContext.Provider value={location.state.user}>
            <main>
              <section>
                <Title level={2}>Чат</Title>
              </section>
              <section>
                <FriendsContext.Provider value={friends}>
                    <SetFriendsContext.Provider value={setFriends}>
                        <MyFriends/>
                    </SetFriendsContext.Provider>
                </FriendsContext.Provider>
              </section>
          </main>
        </UserContext.Provider>
    )
}
