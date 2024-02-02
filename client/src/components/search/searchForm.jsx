import SearchInput from './searchInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function SearchForm({placeholder}) {

  return (
    <>
      <form>
          <label>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
            <SearchInput placeholder={placeholder}></SearchInput>
          </label>
      </form>
    </>
  )
}
