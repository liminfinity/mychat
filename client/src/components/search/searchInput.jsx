import React, { useContext } from 'react'
import { QueryContext, SetQueryContext } from '../../Context/CommonContext'

export default function SearchInput({placeholder}) {
  const query = useContext(QueryContext);
  const setQuery = useContext(SetQueryContext);
  
  return (
    <>
      <input type="search" placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)} />
    </>
  )
}
