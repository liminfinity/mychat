import { QueryContext } from "../../context/CommonContext";
import SearchForm from "../search/searchForm";
import ProfilePanel from "./ProfilePanel";
import { useContext, useEffect, useState } from "react";
import UsersContainer from "./usersContainer";
import { UsersConnect } from "../../utils/axiosCreate";
import { UserContext } from "../../context/ChatContext";

export default function ChatHeader() {
  const [query, setQuery] = useState('');
  const [isFocus, setFocus] = useState(false);
  const [users, setUsers] = useState([])
  const user = useContext(UserContext)
  useEffect(() => {
    async function getUsers() {
      const res = await UsersConnect('/', {
        params: {
          userId: user.id,
          q: query
        }
      })
      const {users} = res.data;
      setUsers(users)
    }
    if (isFocus) {
      getUsers()
    }
  }, [isFocus, query])

  return (
    <QueryContext.Provider value={{query, setQuery}}>
      <header className='py-3 px-12 flex items-center justify-between gap-40'>
        <SearchForm openModal={setFocus} className='relative flex-grow' placeholder='Search'>
          {isFocus && <UsersContainer users={users}/>}
        </SearchForm>
        <ProfilePanel/>
        
      </header>
    </QueryContext.Provider>
  )
}
