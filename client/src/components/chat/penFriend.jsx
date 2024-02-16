import { useContext } from 'react'
import { ActivePartnerContext, MobileChatContext, OnlineIdsContext, UserContext } from '../../context/ChatContext'
import Avatar from './Avatar';
import Title from '../common/Title';
import { getDate, getUsername } from '../../utils/formatMessage';


export default function PenFriend({friend}) {
    const {setMobileChatOpen} = useContext(MobileChatContext)
    const user = useContext(UserContext);
    const {onlineIds} = useContext(OnlineIdsContext)
    const {activePartner, setActivePartner} = useContext(ActivePartnerContext);
    const lastMessage = friend.lastMessage;
    const timeMessage = getDate(new Date(lastMessage.timestamp));
    const isOnline = onlineIds.has(friend.id);
    const username = getUsername(friend.firstName, friend.lastName);
    const notReadCnt = friend.notRead
    const myMessage = lastMessage.sender === user.id
    let content = ''
    if (lastMessage.content?.length > 30) {
      let spaceIndex = 0;
      while(true) {
        if (lastMessage.content[29 + spaceIndex] != ' ') {
          content = `${lastMessage.content.slice(0, 30 + spaceIndex)}...`
          break;
        }
        else {
          spaceIndex++
        }
      }
    }
    else {
      content = lastMessage.content;
    }
    function handleClick() {
      setMobileChatOpen(true)
      setActivePartner(friend)
    }
    
    return (
      <li onClick={handleClick} className={' bg-mainColor px-3 py-2 800:pl-6 800:py-4 800:pr-4 grid grid-rows-2 grid-cols-9 550:grid-cols-2 800:grid-cols-9 items-center justify-center cursor-pointer border-t-2 transition-all' + (activePartner?.id === friend.id ? ' shadow-activeFriend' : '')}>
          <div className={'flex 800:block justify-center row-start-1 row-span-3 col-start-1 col-span-2 items-center relative after:absolute after:top-0 after:left-10 after:hidden 800:after:block after:w-5 after:h-5 after:rounded-full after:border-white after:border-4 after:bg-offlineStatus' + (isOnline ? ' after:bg-onlineStatus' : '')}>
            <Avatar src={friend.avatar} className={'border-4 800:border-none ' + (isOnline ? 'border-onlineStatus' : 'border-offlineStatus')}/>
          </div>
          <Title level={3} className='550:hidden 800:inline row-start-1 row-span-1 550:row-span-2 870:row-span-1 col-start-3 550:col-start-4 870:col-start-3 col-span-5 550:col-span-6 870:col-span-5 550:pl-2 text-title font-medium text-base 870:text-sm lg:text-base'>{username}</Title>
          <span className='550:hidden 870:inline row-start-1 row-span-1 col-start-8 col-span-2 justify-self-end text-sm lg:text-base'>{timeMessage}</span>
          <span className={' 550:hidden 870:inline row-start-2 row-span-1 col-start-3 col-span-7 550:pl-2 text-sm lg:text-base ' + ((notReadCnt && !myMessage) ? ' text-title font-semibold col-span-5': '')}>{(user.id === lastMessage.sender ? 'You: ' : '') + content}</span>
          {notReadCnt > 0 && !myMessage && <span className={'flex 550:hidden w-6 h-6 row-start-2 row-span-1 col-start-8 col-span-2 justify-self-end rounded-full bg-title text-mainColor 870:flex justify-center items-center'}>{notReadCnt}</span>}

      </li>
    )
  }
