import { useContext } from 'react'
import { QueryContext } from '../../context/CommonContext'

export default function SearchInput({placeholder, setFocus}) {
  const {query, setQuery} = useContext(QueryContext);


  return (
    <>
      <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className='flex-grow outline-none' type="search" placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)}/>
    </>
  )
}
