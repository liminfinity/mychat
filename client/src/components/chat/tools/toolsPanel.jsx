import React, { useEffect, useRef, useState } from 'react'

import EditLink from './editLink'
import ExitLink from './exitLink'
import LinkContainer from './LinkContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export default function ToolsPanel() {
  const [isOpen, setOpen] = useState(false);
  const modalRef = useRef(null);

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
              <EditLink>Edit profile</EditLink>
            </LinkContainer>
            <LinkContainer>
              <ExitLink>Exit</ExitLink>
            </LinkContainer>
        </ul>}
    </div>
  )
}
