import { useContext, useState } from 'react'
import { ErrorContext, QueryContext } from '../../context/CommonContext';
import AuthInput from './authInput';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import AuthButton from './authButton';
import { loginShema } from '../../validation/loginShema';
import { AuthConnect } from '../../utils/axiosCreate';
import {useNavigate} from 'react-router-dom';

export default function AuthForm({isAnimate}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {error, setError} = useContext(ErrorContext);
    const navigate = useNavigate();
    async function handleLogin(e) {
        e.preventDefault();
        try {
            const login = await loginShema.validate({email, password});
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
            if (!isAnimate) {
                setError(e.name === 'ValidationError' ? e.errors[0] : e.message)
            }
            
        }
        
        
    }
    return (
        <form onSubmit={handleLogin} className='flex flex-col justify-center items-center gap-6'>
            <QueryContext.Provider value={{ query: email, setQuery: setEmail }}>
                <AuthInput placeholder='Email' type='email' icon={faEnvelope} />
            </QueryContext.Provider>
            <QueryContext.Provider value={{ query: password, setQuery: setPassword }}>
                <AuthInput placeholder='Password' type='password' icon={faLock} />
            </QueryContext.Provider>
            <AuthButton>Log in</AuthButton>
        </form>
    )
}
