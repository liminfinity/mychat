import React, { useContext } from 'react'
import { ErrorsContext } from '../../context/CommonContext'

export default function AuthError({children, className}) {

    const {setErrors} = useContext(ErrorsContext)

    function handleAnimationEnd() {
      setErrors((errs) => {
        errs.shift()
      })
    }

    return (
      <div onAnimationEnd={handleAnimationEnd} className={'absolute error min-w-72 px-5' + (className || '')}>{children}</div>
    )
}
