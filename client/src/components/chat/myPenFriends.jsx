import SearchForm from '../search/searchForm'
import PenFriendsList from './penFriendsList';
export default function MyFriends() {
    return (
        <>
            <SearchForm className='800:px-6 z-10 outline-offset-0' placeholder='Search...'></SearchForm>
            <PenFriendsList/>
        </>
    )
}
