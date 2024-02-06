import React from 'react'

export default function AuthError({children, className, handleAnimateEnd, handleAnimateStart}) {
  return (
    <div onAnimationStart={handleAnimateStart} onAnimationEnd={handleAnimateEnd} className={'absolute error' + (className || '')}>{children}</div>
  )
}
