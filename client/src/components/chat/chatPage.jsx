import { useState, useRef, useEffect } from 'react'
import {useLocation} from 'react-router-dom'
import Title from '../common/Title';
import MyFriends from './myPenFriends';
import { FriendsContext, ActivePartnerContext, UserContext, SendMessageContext, MessagesContext, SetMessagesContext, OnlineIdsContext } from '../../context/ChatContext';
import io from 'socket.io-client'
import ChatPanel from './chatPanel';
import axios from 'axios';
import ChatHeader from './chatHeader';
import ChatPageContainer from './ChatPageContainer';
import { FriendsConnect, OnlineConnect } from '../../utils/axiosCreate';
import {useImmer} from 'use-immer'
import {enableMapSet} from 'immer'
import { QueryContext } from '../../context/CommonContext';

enableMapSet()

export default function ChatPage() {
    const [friends, setFriends] = useState([]);
    const [onlineIds, setOnlineIds] = useImmer(new Set()); 
    const [activePartner, setActivePartner] = useState(null);
    const [messages, setMessages] = useState([]);

    const [query, setQuery] = useState('');

    const socket = useRef(null);
    const location = useLocation();
    const user = location.state.user;
    
    async function getFriends() {
      /* const queryParams = new URLSearchParams({userId: user.id, q: query}) */
      const res = await FriendsConnect.get('/', {
        params: {
          userId: user.id,
          q: query
        }
      })
      return res.data.friends;
    }

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
        const res = await OnlineConnect.get('/');
        const {onlineIds} = res.data;
        setOnlineIds(new Set(onlineIds.filter(id => id != user.id)))
      })
      return () => {
        socket.current.removeAllListeners('connect')
      }
    }, [user])

    useEffect(() => {
        let ignore = false
        async function getFrnds() {
          const friendsData = await getFriends();
          if (!ignore) {
            setFriends(friendsData)
          }
        }
        getFrnds()
        return () => {
          ignore = true
        }
  }, [query])

    /* useEffect(() => {
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
    }, []) */
    useEffect(() => {
      socket.current.on('USER:ONLINE', userId => {
        if (user.id != userId) {
          setOnlineIds((ids) => {
            ids.add(userId)
          })
        }
      })
      return () => {
        socket.current.removeAllListeners('USER:ONLINE')
      }
    }, [user])
    
    useEffect(() => {
      socket.current.on('USER:OFFLINE', ({userId, last}) => {
        if (last) {
          setOnlineIds((ids) => {
            ids.delete(userId)
          })
        }
      })
      return () => {
        socket.current.removeAllListeners('USER:OFFLINE')
      }
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
          <OnlineIdsContext.Provider value={{onlineIds}}>
            <main className='flex flex-col h-screen'>
              <ChatHeader/>
              <ChatPageContainer>
                <section className='row-start-1 row-end-2 col-span-9 flex items-center'>
                  <Title level={2} className='text-2xl text-title font-medium'>Chat</Title>
                </section>
                <section className='row-start-2 row-span-9 col-start-1 col-span-3 bg-mainColor flex flex-col'>
                  <QueryContext.Provider value={{query, setQuery}}>
                    <FriendsContext.Provider value={{friends}}>
                      <ActivePartnerContext.Provider value={{activePartner, setActivePartner}}>
                        <MyFriends/>
                      </ActivePartnerContext.Provider>
                    </FriendsContext.Provider>
                  </QueryContext.Provider>
                </section>
                <section className='px-10 py-5 row-start-2 row-span-9 col-start-4 col-span-6 flex flex-col bg-mainColor'>
                  <ActivePartnerContext.Provider value={{activePartner}}>
                    <SendMessageContext.Provider value={sendMessage}>
                      <MessagesContext.Provider value={messages}>
                        <SetMessagesContext.Provider value={setMessages}>
                          <ChatPanel/>
                        </SetMessagesContext.Provider>
                      </MessagesContext.Provider>
                    </SendMessageContext.Provider>
                  </ActivePartnerContext.Provider>
                </section>
              </ChatPageContainer>
            </main>
          </OnlineIdsContext.Provider>
        </UserContext.Provider>
        
    )
}
