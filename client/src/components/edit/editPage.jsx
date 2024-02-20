import { useImmer } from 'use-immer'
import AuthContainer from '../auth/authContainer'
import Title from '../common/Title'
import AuthError from '../errors/AuthError'
import { ErrorsContext } from '../../context/CommonContext'
import EditForm from './editForm'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { MobileChatContext } from '../../context/ChatContext'
import { useAuth } from '../../hook/useAuth'

export default function EditPage() {
  const [errors, setErrors] = useImmer([]);
  const [WinWidth, setWinWidth] = useState('');

  function handleResize()  {
    setWinWidth(innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = WinWidth < 550;
  const {user} = useAuth()

  return (
    <MobileChatContext.Provider value={{isMobile}}> 
      <main className='min-h-screen flex items-center justify-center'>
        <AuthContainer>
            <Title level={2} className='text-2xl text-title font-medium'>Edit profile</Title>
            <ErrorsContext.Provider value={{errors, setErrors}}>
                <EditForm user={user}/>
            </ErrorsContext.Provider>
            <Link className='input block hover:text-sendMessage transition-all duration-300' to="/chat" state={{user}}>Сancel changes</Link>
        </AuthContainer>
        <ErrorsContext.Provider value={{errors, setErrors}}>
            {errors.map((err, i) => <AuthError key={err + i} className=' animate-openError top-8'>{err}</AuthError>)}
        </ErrorsContext.Provider>
      </main>
    </MobileChatContext.Provider>
    
  )
}