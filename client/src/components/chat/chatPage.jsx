import { useState, useRef, useEffect } from 'react'
import Title from '../common/Title';
import MyFriends from './myPenFriends';
import { FriendsContext, ActivePartnerContext, SendMessageContext, MessagesContext, OnlineIdsContext, GetFriendsContext, MobileChatContext } from '../../context/ChatContext';
import io from 'socket.io-client'
import ChatPanel from './chatPanel';
import ChatHeader from './chatHeader';
import ChatPageContainer from './ChatPageContainer';
import { FriendsConnect, MessagesConnect, OnlineConnect } from '../../utils/axiosCreate';
import {useImmer} from 'use-immer'
import {enableMapSet} from 'immer'
import { QueryContext } from '../../context/CommonContext';
import { useAuth } from '../../hook/useAuth';
import config from '../../../config/default.json'
const SERVER_PORT = config['SERVER_PORT'];
const SERVER_HOST = config['SERVER_HOST'];
enableMapSet()

export default function ChatPage() {
    const [friends, setFriends] = useState([]);
    const [onlineIds, setOnlineIds] = useImmer(new Set()); 
    const [activePartner, setActivePartner] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isMobileChatOpen, setMobileChatOpen] = useState(false);
    const [WinWidth, setWinWidth] = useState(innerWidth);
    const [query, setQuery] = useState('');
    const isMobile = WinWidth < 550;
    const socket = useRef(null);
    const {user} = useAuth();
    function handleResize()  {
      setWinWidth(innerWidth);
    }
    useEffect(() => {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    async function getFriends() {
      const res = await FriendsConnect.get('/', {
        params: {
          userId: user.id,
          q: query
        }
      })
      return res.data.friends;
    }

    async function getMessages() {
      const res = await MessagesConnect.get('/', {
          params: {
              userId: user.id,
              partnerId: activePartner.id
          }
      })
      const {messages} = res.data;
      setMessages(messages);
      socket.current.emit('MESSAGE:WRITTEN', user.id)
    }
    useEffect(() => {
        socket.current = io(`http://${SERVER_HOST}:${SERVER_PORT}`, {
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
      socket.current.on('MESSAGE:GET', async message => {
        if ([message.recipient, message.sender].includes(activePartner?.id)) {
          await getMessages();
        }
        const friends = await getFriends();
        setFriends(friends)
      })
      return () => {
        socket.current.removeAllListeners('MESSAGE:GET')
      }
    }, [activePartner])

    useEffect(() => {
      if (activePartner) {
        getMessages()
      }
    }, [activePartner])

    useEffect(() => {
      socket.current.on('MESSAGE:WRITTEN', async () => {
        const friends = await getFriends()
        setFriends(friends)
      })
      return () => {
        socket.current.removeAllListeners('MESSAGE:WRITTEN')
      }
    }, [])

    async function sendMessage(content) {
      const message = {
        sender: user.id,
        recipient: activePartner.id,
        content,
        timestamp: new Date(),
      }
      socket.current.emit('MESSAGE:SEND', message, ({status}) => {
        if (status === 'delivered') {
          console.log('Сообщение доставлено!')
        }
      })
    }
    return (
      <MobileChatContext.Provider value={{isMobileChatOpen, setMobileChatOpen, isMobile}}>
        <OnlineIdsContext.Provider value={{onlineIds}}>
          <GetFriendsContext.Provider value={getFriends}>
            <ActivePartnerContext.Provider value={{activePartner, setActivePartner}}>
              <main className='flex flex-col h-screen'>
                <ChatHeader/>
                <ChatPageContainer>
                  <section className='row-start-1 row-end-2 col-span-9 flex items-center'>
                    <Title level={2} className='text-xl sm:text-2xl text-title font-medium'>Chat</Title>
                  </section>
                  <section className={'row-start-2 row-span-9 col-start-1 col-span-9 ' +
                  '550:col-span-2 800:col-span-3 bg-mainColor flex flex-col ' + (isMobileChatOpen && isMobile ? 'hidden' : '')}>
                    <QueryContext.Provider value={{query, setQuery}}>
                      <FriendsContext.Provider value={{friends}}>
                          <MyFriends/>
                      </FriendsContext.Provider>
                    </QueryContext.Provider>
                  </section>
                  <section className={' px-2 910:px-10 py-5 row-start-2 row-span-9 ' +
                  'col-start-1 col-span-9 550:col-start-3 550:col-span-7 800:col-start-4 800:col-span-6 ' +
                    '550:flex flex-col bg-mainColor ' + (isMobileChatOpen && isMobile ? 'flex' : 'hidden')}>
                      <FriendsContext.Provider value={{setFriends}}>
                        <SendMessageContext.Provider value={sendMessage}>
                          <MessagesContext.Provider value={{messages, setMessages}}>
                            <ChatPanel/>
                          </MessagesContext.Provider>
                        </SendMessageContext.Provider>
                      </FriendsContext.Provider>
                  </section>
                </ChatPageContainer>
              </main>
            </ActivePartnerContext.Provider>
          </GetFriendsContext.Provider>
        </OnlineIdsContext.Provider>
      </MobileChatContext.Provider>
    )
}
