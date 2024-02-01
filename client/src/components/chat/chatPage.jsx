import { useState, useRef, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import Title from '../common/Title';
import MyFriends from './myPenFriends';
import { FriendsContext, SetFriendsContext, UserContext, SetActiveFriendContext, ActiveFriendContext } from '../../Context/ChatContext';
import io from 'socket.io-client'
import ChatPanel from './chatPanel';
import axios from 'axios';

export default function ChatPage() {
    const [friends, setFriends] = useState([]);
    const [activeFriend, setActiveFriend] = useState(null);
    const socket = useRef(null);
    const location = useLocation();
    const user = location.state.user
    useEffect(() => {
        socket.current = io('http://localhost:5000', {
            path: '/chat-io',
            query: {
                user: JSON.stringify(user)
            }
        })
        return () => {
            socket.current.disconnect();
        }
    }, [])
    useEffect(() => {
      socket.current.on('connect', async () => {
        const result = await axios('http://localhost:5000/chat/sockets', {
            method: 'POST',
            data: JSON.stringify({userId: user.id, socketId: socket.current.id}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
      })
      return () => {
        socket.current.removeAllListeners('connect')
      }
    }, [])
    useEffect(() => {
      socket.current.on('disconnect', async () => {
        const result = await axios('http://localhost:5000/chat/sockets', {
            method: 'DELETE',
            data: JSON.stringify({userId: user.id}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
      })
      return () => {
        socket.current.removeAllListeners('disconnect')
      }
    }, [])
    async function sendMessage(content) {
      
      const message = {
        sender: user.id,
        content,
        timestamp: new Date(),
        recipient: activeFriend.id
      }
      socket.current.emit('MESSAGE:SEND', message, async (status) => {
        if (status === 'delivered') {
          const result = await axios('http://localhost/chat/messages', {
            method: 'POST',
            body: JSON.stringify(message),
            headers: {
              'Content-Type': 'application/json'
            }
          })
        }
      })
    }
    async function getSocket(userId) {
      const result = await axios 
    }
    return (
        <UserContext.Provider value={user}>
            <main>
              <section>
                <Title level={2}>Чат</Title>
              </section>
              <section>
                <FriendsContext.Provider value={friends}>
                    <SetFriendsContext.Provider value={setFriends}>
                        <SetActiveFriendContext.Provider value={setActiveFriend}>
                            <MyFriends/>
                        </SetActiveFriendContext.Provider>
                    </SetFriendsContext.Provider>
                </FriendsContext.Provider>
              </section>
              <section>
                <ActiveFriendContext.Provider value={activeFriend}>
                  <ChatPanel/>
                </ActiveFriendContext.Provider>
              </section>
          </main>
        </UserContext.Provider>
    )
}
