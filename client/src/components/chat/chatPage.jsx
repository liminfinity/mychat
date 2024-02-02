import { useState, useRef, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import Title from '../common/Title';
import MyFriends from './myPenFriends';
import { FriendsContext, SetFriendsContext, UserContext, SetActiveFriendContext, ActiveFriendContext, SendMessageContext, MessagesContext, SetMessagesContext } from '../../Context/ChatContext';
import io from 'socket.io-client'
import ChatPanel from './chatPanel';
import axios from 'axios';

export default function ChatPage() {
    const [friends, setFriends] = useState([]);
    const [activeFriend, setActiveFriend] = useState(null);
    const [messages, setMessages] = useState([])
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
        await axios('http://localhost:5000/chat/sockets', {
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
        await axios('http://localhost:5000/chat/sockets', {
            method: 'DELETE',
            data: JSON.stringify({userId: user.id}),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        socket.current.emit('USER:OFFLINE', user.id)
      })
      return () => {
        socket.current.removeAllListeners('disconnect')
      }
    }, [])
    useEffect(() => {
      socket.current.on('USER:ONLINE', userId => {

        const onlineFriend = friends.find(friend => friend.id === userId);
        if (onlineFriend) {
          setFriends((prevFriend) => {
            const indexFriend = prevFriend.findIndex(friend => friend.id === userId);
            return [
              ...prevFriend.slice(0, indexFriend),
              {
                ...onlineFriend,
                isOnline: true
              },
              ...prevFriend.slice(indexFriend + 1)
            ]
          })
        }
      })
    }, [])
    useEffect(() => {
      socket.current.on('USER:OFFLINE', userId => {
        
        const offlineFriend = friends.find(friend => friend.id === userId);
        if (offlineFriend) {
          setFriends((prevFriend) => {
            const indexFriend = prevFriend.findIndex(friend => friend.id === userId);
            return [
              ...prevFriend.slice(0, indexFriend),
              {
                ...offlineFriend,
                isOnline: false
              },
              ...prevFriend.slice(indexFriend + 1)
            ]
          })
        }
      })
    }, [])
    useEffect(() => {
      socket.current.on('MESSAGE:GET', message => {
        setMessages((prevMessages) => [...prevMessages, message]) 
      })
      return () => {
        socket.current.removeAllListeners('MESSAGE:GET')
      }
    }, [])
    async function sendMessage(content) {
      const message = {
        sender: user.id,
        recipient: activeFriend.id,
        content,
        timestamp: new Date(),
      }
      const result = await axios('http://localhost:5000/chat/messages', {
          method: 'POST',
          data: JSON.stringify({message}),
          headers: {
            'Content-Type': 'application/json'
          }
      })
      const messageId = result.data.messageId;
      console.log(messageId)
      message.id = messageId;
      socket.current.emit('MESSAGE:SEND', message, async (status) => {
        if (status === 'delivered') {
          console.log('Сообщение доставлено!')
        }
      })
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
                  <SendMessageContext.Provider value={sendMessage}>
                    <MessagesContext.Provider value={messages}>
                      <SetMessagesContext.Provider value={setMessages}>
                        <ChatPanel/>
                      </SetMessagesContext.Provider>
                    </MessagesContext.Provider>
                  </SendMessageContext.Provider>
                </ActiveFriendContext.Provider>
              </section>
          </main>
        </UserContext.Provider>
    )
}
