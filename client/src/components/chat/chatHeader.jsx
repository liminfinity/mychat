import { QueryContext } from "../../context/CommonContext";
import SearchForm from "../search/searchForm";
import ProfilePanel from "./ProfilePanel";
import { useState } from "react";

export default function ChatHeader() {
  const [query, setQuery] = useState('');

  return (
    <QueryContext.Provider value={{query, setQuery}}>
      <header className='py-3 px-12 flex items-center justify-between gap-40'>
        <SearchForm className='flex-grow' placeholder='Search'/>
        <ProfilePanel/>
      </header>
    </QueryContext.Provider>
  )
}
