import {useState} from 'react'
import SearchInput from './searchInput'

export default function SearchForm({placeholder}) {

  return (
    <>
      <form>
          <label>
            <SearchInput placeholder={placeholder}></SearchInput>
          </label>
      </form>
    </>
  )
}
