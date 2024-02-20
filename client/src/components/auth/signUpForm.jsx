import { useContext } from 'react'
import { ErrorsContext, QueryContext } from '../../context/CommonContext';
import AuthInput from './authInput';
import { faAddressCard, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import AuthButton from './authButton';
import {signUpShema } from '../../validation/authShema';
import { AuthConnect } from '../../utils/axiosCreate';
import {useNavigate, useLocation} from 'react-router-dom';
import { useImmer } from 'use-immer';
import { useAuth } from '../../hook/useAuth';

export default function SignUpForm() {
    const [form, setForm] = useImmer({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }) 
    const {setErrors} = useContext(ErrorsContext);
    const navigate = useNavigate();
    const {signup} = useAuth();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/chat'

    async function handleSignUp(e) {
        e.preventDefault();
        try {
            const newUser = await signUpShema.validate(form);
            const response = await AuthConnect.post('signup', JSON.stringify({newUser: {...newUser, confirmPassword: undefined}}));
            if (response.status === 200) {
                const user = response.data;
                signup(user, navigate(fromPage, { replace: true }))
            } 
        } catch(e) {
            let err = ''
            setErrors((errs) => {
                switch (e.name) {
                    case 'ValidationError': {
                        err = e.errors[0]
                        break;
                    }
                    case 'AxiosError': {
                        err = e.response?.data?.message ?? e.message;
                        break;
                    }
                    default: {
                        err = e.message
                        break;
                    }
                }
                errs.push(err)
            })
        }
        
        
    }
    return (
        <form onSubmit={handleSignUp} className='flex flex-col justify-center items-center gap-6'>
            <QueryContext.Provider value={{ form: form, setForm: setForm }}>
                <AuthInput name='lastName' placeholder='Last name' type='text' icon={faAddressCard} />
                <AuthInput name='firstName' placeholder='First name' type='text' icon={faAddressCard} />
                <AuthInput name='email' placeholder='Email' type='email' icon={faEnvelope} />
                <AuthInput name='password' placeholder='Password' type='password' icon={faLock} />
                <AuthInput name='confirmPassword' placeholder='Confirm password' type='password' icon={faLock} />
            </QueryContext.Provider>
            <AuthButton>Sign up</AuthButton>
        </form>
    )
}