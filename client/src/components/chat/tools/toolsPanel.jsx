import React, { useContext, useEffect, useRef, useState } from 'react'

import LinkContainer from './LinkContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/ChatContext'

export default function ToolsPanel() {
  const [isOpen, setOpen] = useState(false);
  const modalRef = useRef(null);
  const user = useContext(UserContext)

  function handleOutsideClick(e) {
    if (!modalRef.current.contains(e.target)) {
      setOpen(false)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, []) 

  return (
    <div className='relative' ref={modalRef}>
        <FontAwesomeIcon onClick={() => setOpen(!isOpen)} icon={faAngleDown} className={'caret' + (isOpen ? ' rotate-180' : '') }/>
        {isOpen && <ul className='absolute w-48 mt-8 right-0 glass flex flex-col py-2 px-3 rounded-xl animate-openModal'>
            <LinkContainer>
              <Link className='block' to='/edit' state={{user}} >Edit profile</Link>
            </LinkContainer>
            <LinkContainer>
              <Link className='block' to='/login' replace={true}>Exit</Link>
            </LinkContainer>
        </ul>}
    </div>
  )
}
