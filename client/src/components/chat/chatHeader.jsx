import SearchForm from "../search/searchForm";
import ProfilePanel from "./ProfilePanel";


export default function ChatHeader({className}) {
  return (
    <header className={className + ' flex justify-center items-center'}>
      <SearchForm placeholder='Search'/>
      <ProfilePanel/>
    </header>
  )
}
