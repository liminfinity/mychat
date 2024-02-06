import { useContext, useEffect, useState } from 'react'
import SearchForm from '../search/searchForm'
import { SetFriendsContext, UserContext } from '../../context/ChatContext'
import { QueryContext } from '../../context/CommonContext';
import PenFriendsList from './penFriendsList';
import axios from 'axios'
export default function MyFriends() {
    const user = useContext(UserContext)
    const setFriends = useContext(SetFriendsContext);
    const [query, setQuery] = useState('');
    useEffect(() => {
        let ignore = false
        async function getFriends() {
            const queryParams = new URLSearchParams({userId: user.id, q: query})
            const response = await axios(`http://localhost:5000/chat/friends?${queryParams.toString()}`);
            const friends = response.data.friends;
            if (!ignore) {
                setFriends(friends)
            }
        }
        getFriends()
        return () => {
            ignore = true
        }
    }, [query])
    return (
        <QueryContext.Provider value={{query, setQuery}}>
            <SearchForm className='px-6 z-10 outline-offset-0' placeholder='Search...'></SearchForm>
            <PenFriendsList/>
        </QueryContext.Provider>
        
    )
}
