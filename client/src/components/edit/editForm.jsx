import { useContext, useState } from 'react'
import { ErrorsContext, QueryContext } from '../../context/CommonContext';
import AuthInput from '../auth/authInput';
import { faAddressCard, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import AuthButton from '../auth/authButton';
import {signUpShema } from '../../validation/authShema';
import { UserConnect } from '../../utils/axiosCreate';
import {useNavigate} from 'react-router-dom';
import { useImmer } from 'use-immer';
import EditAvatarPanel from './editAvatarPanel';
import Loader from '../common/loader';

export default function EditForm({user}) {
    const [form, setForm] = useImmer({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
        tempAvatar: user.avatar,
        avatarBuffer: new Uint8Array(),
        confirmPassword: user.password
    })
    const [isLoading, setLoading] = useState(false); 
    const {setErrors} = useContext(ErrorsContext);
    const navigate = useNavigate();
    async function handleSignUp(e) {
        e.preventDefault();
        try {
            const editedUser = await signUpShema.validate(form);
            const JSONeditedUser = JSON.stringify({editedUser: {id: user.id, ...editedUser, avatarBuffer: Object.values(editedUser.avatarBuffer), tempAvatar: undefined, confirmPassword: undefined}});
            const response = await UserConnect.put('/', JSONeditedUser);
            if (response.status === 200) {
                const {user} = response.data;
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
        <>
            {isLoading && <Loader/>}
            <form onSubmit={handleSignUp} className='flex items-center justify-center flex-col gap-6'>  
                <QueryContext.Provider value={{ form: form, setForm: setForm }}>
                    <EditAvatarPanel/>
                    <AuthInput name='lastName' placeholder='Last name' type='text' icon={faAddressCard} />
                    <AuthInput name='firstName' placeholder='First name' type='text' icon={faAddressCard} />
                    <AuthInput name='email' placeholder='Email' type='email' icon={faEnvelope} />
                    <AuthInput name='password' placeholder='Password' type='password' icon={faLock} />
                    <AuthInput name='confirmPassword' placeholder='Confirm password' type='password' icon={faLock} />
                </QueryContext.Provider>
                <AuthButton>Edit</AuthButton>
            </form>
        </>
        
    )
}
