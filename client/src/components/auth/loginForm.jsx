import { useContext } from 'react'
import { ErrorsContext, QueryContext } from '../../context/CommonContext';
import AuthInput from './authInput';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import AuthButton from './authButton';
import { loginShema } from '../../validation/authShema';
import { AuthConnect } from '../../utils/axiosCreate';
import {useNavigate, useLocation} from 'react-router-dom';
import { useImmer } from 'use-immer';
import { useAuth } from '../../hook/useAuth';

export default function LoginForm() {
    const [form, setForm] = useImmer({
        email: '',
        password: ''
    })
    const {setErrors} = useContext(ErrorsContext);
    const navigate = useNavigate();
    const {signin} = useAuth();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/chat'
    async function handleLogin(e) {
        e.preventDefault();
        try {
            const login = await loginShema.validate(form);
            const response = await AuthConnect.post('login', JSON.stringify({auth: login}));
            if (response.status === 200) {
                const user = response.data;
                console.log(user)
                signin(user, navigate(fromPage, { replace: true }))
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
        <form onSubmit={handleLogin} className='flex flex-col justify-center items-center gap-6'>
            <QueryContext.Provider value={{ form: form, setForm: setForm }}>
                <AuthInput name='email' placeholder='Email' type='email' icon={faEnvelope} />
                <AuthInput name='password' placeholder='Password' type='password' icon={faLock} />
            </QueryContext.Provider>
            <AuthButton>Log in</AuthButton>
        </form>
    )
}
