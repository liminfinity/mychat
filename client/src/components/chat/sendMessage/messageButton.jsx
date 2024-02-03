
export default function MessageButton({children}) {
  return (
    <>
       <button type="submit" className='button px-5 py-2 flex items-center gap-2 bg-sendMessage text-mainColor hover:bg-sendMessageHover'>{children}</button> 
    </>
  )
}
