import { useContext } from 'react'
import SearchForm from '../search/searchForm'
import { FriendsContext, UserContext } from '../../context/ChatContext'
import PenFriendsList from './penFriendsList';
export default function MyFriends() {
    return (
        <>
            <SearchForm className='px-6 z-10 outline-offset-0' placeholder='Search...'></SearchForm>
            <PenFriendsList/>
        </>
    )
}
