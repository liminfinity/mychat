import { useState } from 'react'
import AuthContainer from './authContainer'
import Title from '../common/Title'
import AuthForm from './loginForm'
import { ErrorContext } from '../../context/CommonContext';
import AuthError from '../errors/AuthError';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [isAnimate, setAnimate] = useState(false)

    return (
        <main className='min-h-screen flex items-center justify-center'>
            <AuthContainer>
                <Title level={2} className='text-2xl text-title font-medium'>Log In</Title>
                <ErrorContext.Provider value={{error, setError}}>
                    <AuthForm isAnimate={isAnimate}/>
                </ErrorContext.Provider>
            </AuthContainer>
            {error && <AuthError key={error} handleAnimateStart={(e) => setAnimate(true)} handleAnimateEnd={(e) => setAnimate(false)} className=' animate-openError left-0 top-3/4'>{error}</AuthError>}
        </main>
    )
}
