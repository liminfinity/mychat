import { QueryContext } from "../../context/CommonContext";
import SearchForm from "../search/searchForm";
import ProfilePanel from "./ProfilePanel";
import { useEffect, useState } from "react";
import UsersContainer from "./usersContainer";
import { UsersConnect } from "../../utils/axiosCreate";
import ToolsPanel from "./tools/toolsPanel";
import { useAuth } from "../../hook/useAuth";

export default function ChatHeader() {
  const [query, setQuery] = useState('');
  const [isFocus, setFocus] = useState(false);
  const [users, setUsers] = useState([])
  const {user} = useAuth()
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
      <header className='py-3 px-2 sm:px-3 md:px-5 lg:px-9 xl:px-12 flex items-center gap-2 sm:gap-5'>
        <SearchForm openModal={setFocus} className='relative flex-grow' placeholder='Search'>
          {isFocus && <UsersContainer users={users}/>}
        </SearchForm>
        <ProfilePanel/>
        <ToolsPanel/>
      </header>
    </QueryContext.Provider>
  )
}
