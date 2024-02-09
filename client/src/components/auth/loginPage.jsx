import AuthContainer from './authContainer'
import Title from '../common/Title'
import LoginForm from './loginForm'
import { ErrorsContext } from '../../context/CommonContext';
import AuthError from '../errors/AuthError';
import {useImmer} from 'use-immer'

import { Link } from 'react-router-dom';
export default function LoginPage() {
    const [errors, setErrors] = useImmer([]);
    return (
        <main className='min-h-screen flex items-center justify-center'>
            <AuthContainer>
                <Title level={2} className='text-2xl text-title font-medium'>Log In</Title>
                <ErrorsContext.Provider value={{errors, setErrors}}>
                    <LoginForm/>
                </ErrorsContext.Provider>
                <Link className='input block hover:text-sendMessage transition-all duration-300' to='/signup'>No account yet?</Link>
            </AuthContainer>
            <ErrorsContext.Provider value={{errors, setErrors}}>
                {errors.map((err, i) => <AuthError key={err + i} className=' animate-openError top-8'>{err}</AuthError>)}
            </ErrorsContext.Provider>
        </main>
    )
}
