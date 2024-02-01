import { useContext, useEffect, useState } from 'react'
import SearchForm from '../search/searchForm'
import { SetFriendsContext, UserContext } from '../../Context/ChatContext'
import { QueryContext, SetQueryContext } from '../../Context/CommonContext';
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
            const response = await axios(`http://localhost:5000/friends?${queryParams.toString()}`);
            const friends = response.data.friends;
            console.log(1, friends)
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
        <QueryContext.Provider value={query}>
            <SetQueryContext.Provider value={setQuery}>
                <section>
                    <SearchForm placeholder='Найти...'></SearchForm>
                    <PenFriendsList/>
                </section>
            </SetQueryContext.Provider>
        </QueryContext.Provider>
        
    )
}
