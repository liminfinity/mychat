import { useState } from 'react'
import { AuthContext } from '../context/AuthContext';

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null);

    function signin(user, cb) {
        setUser(user);
        cb()
    }
    function signout(cb) {
        setUser(null);
        cb && cb()
    }
    function signup(user, cb) {
        setUser(user);
        cb()
    }

    return (
        <AuthContext.Provider value={{user, signin, signout, signup}}>
            {children}
        </AuthContext.Provider>
    )
}
