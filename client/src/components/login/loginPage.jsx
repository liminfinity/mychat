import axios from 'axios'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    async function loginUser(e) {
        e.preventDefault();
        const result = await axios('http://localhost:5000/login', {
            method: 'POST',
            data: JSON.stringify({user: {
                email
            }}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (result.status === 200) {
            navigate('/chat', {
                replace: true,
                state: {
                    user: result.data.user
                }
            })
        }
    }
    return (
        <>
            <section>
                <h2>Вход</h2>
            </section>
            <section>
                <form onSubmit={loginUser}> 
                    <label>
                        <input placeholder="Введите почту" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    </label>
                    <button>Войти</button>
                </form>
            </section> 
        </>
    )
}
