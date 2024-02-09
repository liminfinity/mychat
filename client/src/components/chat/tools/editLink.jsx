import React from 'react'
import { Link } from 'react-router-dom'
export default function EditLink({children}) {
  return (
    <Link className='block pointer-events-none' to='/edit' replace={true}>{children}</Link>
  )
}
