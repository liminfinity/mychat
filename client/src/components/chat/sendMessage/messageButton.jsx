import { useContext } from "react"
import { QueryContext } from "../../../context/CommonContext"

export default function MessageButton({children}) {
  const {message} = useContext(QueryContext)
  const isValidMessage = message.trim();
  return (
    <>
       <button type="submit" disabled={!isValidMessage} className='button px-5 py-2 flex items-center gap-2 bg-sendMessage text-mainColor hover:bg-sendMessageHover disabled:bg-sendMessageDisabled'>{children}</button> 
    </>
  )
}
