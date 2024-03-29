import SearchInput from './searchInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

export default function SearchForm({placeholder, className, openModal, children}) {
  const [isFocus, setFocus] = useState(false);

  return (
    <>
      <form className={'px-2 py-3 input ' + (isFocus ? ' outline-sendMessage ' : '') + (className || '')}>
          <label className=' flex items-center gap-3 '>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <SearchInput {...{placeholder, className, openModal, setFocus}}></SearchInput>
          </label>
          {children}
      </form>

    </>
  )
}
