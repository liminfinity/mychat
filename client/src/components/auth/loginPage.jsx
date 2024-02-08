import { useState } from 'react'
import AuthContainer from './authContainer'
import Title from '../common/Title'
import AuthForm from './loginForm'
import { ErrorsContext } from '../../context/CommonContext';
import AuthError from '../errors/AuthError';
import {useImmer} from 'use-immer'
export default function LoginPage() {
    const [errors, setErrors] = useImmer([]);
    return (
        <main className='min-h-screen flex items-center justify-center'>
            <AuthContainer>
                <Title level={2} className='text-2xl text-title font-medium'>Log In</Title>
                <ErrorsContext.Provider value={{errors, setErrors}}>
                    <AuthForm/>
                </ErrorsContext.Provider>
            </AuthContainer>
            <ErrorsContext.Provider value={{errors, setErrors}}>
                {errors.map((err, i) => <AuthError key={err + i} className=' animate-openError top-8'>{err}</AuthError>)}
            </ErrorsContext.Provider>
        </main>
    )
}
