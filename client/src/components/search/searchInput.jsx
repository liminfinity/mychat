import { useContext } from 'react'
import { QueryContext } from '../../context/CommonContext'

export default function SearchInput({placeholder, setFocus, openModal}) {
  const {query, setQuery} = useContext(QueryContext);


  return (
    <>
      <input onFocus={() => {
        setFocus(true)
        openModal && openModal(true)
      }} onBlur={() => {
        setFocus(false)
        setTimeout(() => openModal && openModal(false), 200)
      }} className='flex-grow w-full outline-none ' type="search" placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)}/>
    </>
  )
}
