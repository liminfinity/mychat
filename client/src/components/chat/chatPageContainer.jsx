

export default function ChatPageContainer({children}) {
  return (
    <main className='grid grid-rows-9 grid-cols-9 justify-center items-stretch bg-secondColor gap-x-5 px-12 pb-10 flex-grow overflow-hidden'>
        {children}
    </main>
  )
}
