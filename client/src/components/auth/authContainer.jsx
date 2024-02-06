import React from 'react'

export default function AuthContainer({children}) {
  return (
    <section className='py-6 px-10 flex flex-col gap-6 items-center justify-center rounded-md glass'>
      {children}
    </section>
  )
}
