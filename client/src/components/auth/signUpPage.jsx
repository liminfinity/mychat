
import { useImmer } from 'use-immer'
import AuthContainer from './authContainer'
import Title from '../common/Title'
import { Link } from 'react-router-dom'
import SignUpForm from './signUpForm'
import AuthError from '../errors/AuthError'
import { ErrorsContext } from '../../context/CommonContext'
export default function SignUpPage() {
  const [errors, setErrors] = useImmer([]);

  return (
    <main className='min-h-screen flex items-center justify-center'>
        <AuthContainer>
            <Title level={2} className='text-2xl text-title font-medium'>Sign Up</Title>
            <ErrorsContext.Provider value={{errors, setErrors}}>
                <SignUpForm/>
            </ErrorsContext.Provider>
            <Link className='input block hover:text-sendMessage transition-all duration-300' to='/login'>Already have account?</Link>
        </AuthContainer>
        <ErrorsContext.Provider value={{errors, setErrors}}>
            {errors.map((err, i) => <AuthError key={err + i} className=' animate-openError top-8'>{err}</AuthError>)}
        </ErrorsContext.Provider>
    </main>
  )
}
