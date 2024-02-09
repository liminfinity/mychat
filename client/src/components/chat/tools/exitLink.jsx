import React from 'react'
import {Link} from 'react-router-dom'

export default function ExitLink({children}) {
  return (
    <Link className='block' to='/login' replace={true}>{children}</Link>
  )
}
