import { useContext } from 'react'
import { ErrorsContext, QueryContext } from '../../context/CommonContext';
import AuthInput from './authInput';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import AuthButton from './authButton';
import { loginShema } from '../../validation/authShema';
import { AuthConnect } from '../../utils/axiosCreate';
import {useNavigate} from 'react-router-dom';
import { useImmer } from 'use-immer';

export default function LoginForm() {
    const [form, setForm] = useImmer({
        email: '',
        password: ''
    })
    const {setErrors} = useContext(ErrorsContext);
    const navigate = useNavigate();
    async function handleLogin(e) {
        e.preventDefault();
        try {
            const login = await loginShema.validate(form);
            const response = await AuthConnect.post('login', JSON.stringify({auth: login}));
            if (response.status === 200) {
                const user = response.data;
                navigate('/chat', {
                    replace: true,
                    state: {
                        user
                    }
                })

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
