import { useContext } from 'react'
import { QueryContext, SetQueryContext } from '../../Context/CommonContext'

export default function SearchInput({placeholder, setFocus}) {
  const query = useContext(QueryContext);
  const setQuery = useContext(SetQueryContext);

  return (
    <>
      <input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className='flex-grow outline-none' type="search" placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)}/>
    </>
  )
}
